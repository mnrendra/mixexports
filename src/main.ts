import { parse } from 'acorn'
import { simple } from 'acorn-walk'
import requireFromString from 'require-from-string'

const isCJS = (
  code: string
): boolean => {
  const ast = parse(code, { sourceType: 'module', ecmaVersion: 'latest' })

  let hasExports = false

  simple(ast, {
    MemberExpression ({ object }) {
      if (
        object.type === 'Identifier' &&
        (object.name === 'module' || object.name === 'exports')
      ) hasExports = true
    }
  })

  return hasExports
}

const errorMessage = (
  type: string
): Error => {
  const title = 'Failed to mix exports:'
  const desc = `"${type}" cannot be used as a default value.`
  const subDesc = 'Only "object" and "function" are allowed.'

  return new Error(title + ' ' + desc + ' ' + subDesc)
}

const validateDefaultValue = (
  value: any
): any => {
  if (value === null) throw errorMessage('null')

  switch (typeof value) {
    case 'bigint': throw errorMessage('bigint')
    case 'boolean': throw errorMessage('boolean')
    case 'number': throw errorMessage('number')
    case 'string': throw errorMessage('string')
    case 'symbol': throw errorMessage('symbol')
    // case 'undefined': throw error('undefined') // `undefined` is allowed.
  }

  return value
}

const obtainModuleExports = (
  code: string
): Record<string, any> | null => {
  const moduleExports = requireFromString(code)

  if (
    typeof moduleExports !== 'object' ||
    moduleExports === null ||
    moduleExports.default === undefined
  ) return null

  validateDefaultValue(moduleExports.default)

  return moduleExports
}

const obtainNamedExports = (
  moduleExports: Record<string, any>
): string[] => {
  return Object
    .keys(moduleExports)
    .filter((key) => key !== 'default')
}

const defineProperties = (
  properties: string[],
  defineProperty: (property: string) => string
): string => {
  return properties
    .map((property) => defineProperty(property))
    .join('')
}

const minifyFormat = (
  code: string,
  namedExports: string[]
): string => {
  return code +
  'module.exports=exports.default;' +
  'Object.defineProperties(module.exports,{' +
  '__esModule:{value:!0},' +
  defineProperties(namedExports, (property) => `${property}:{value:exports.${property}},`) +
  'default:{value:exports.default}});'
}

const unminifyFormat = (
  code: string,
  namedExports: string[]
): string => {
  return code +
  '\nmodule.exports = exports.default;' +
  '\nObject.defineProperties(module.exports, {\n' +
  '  __esModule: { value: true },\n' +
  defineProperties(namedExports, (property) => `  ${property}: { value: exports.${property} },\n`) +
  '  default: { value: exports.default }\n});'
}

export interface Options {
  /**
   * Minify format.
   *
   * @default false
   */
  minify?: boolean
}

/**
 * Mix **CommonJS** `exports`.
 *
 * @param {string} code **CommonJS** code
 * @param {Options} options options, see https://github.com/mnrendra/mixexports#readme
 *
 * @returns {string} Mixed `exports` **CommonJS**.
 *
 * @see https://github.com/mnrendra/mixexports#readme
 */
const main = (
  code: string,
  {
    minify = false
  }: Options = {}
): string => {
  if (!isCJS(code)) return code

  const moduleExports = obtainModuleExports(code)

  if (moduleExports === null) return code

  const namedExports = obtainNamedExports(moduleExports)

  return minify
    ? minifyFormat(code, namedExports)
    : unminifyFormat(code, namedExports)
}

export default main
