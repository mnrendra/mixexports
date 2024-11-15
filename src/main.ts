import type { Options } from './types'

import { transform } from 'esbuild'

import parse from './parse'
import validate from './validate'
import mix from './mix'

/**
 * A function to mix **CommonJS** exports.
 *
 * @param {string} source - The source code in a string.
 * @param {Options} options - The options object.
 *
 * @returns {string} Modified code in a string.
 *
 * @see https://github.com/mnrendra/mixexports#readme
 */
const main = async (source: string, {
  defineEsModule,
  minify = false
}: Options = {}): Promise<string> => {
  const { shebang, code, expor } = parse(source)

  const hasShebang = typeof shebang === 'string'
  const hasExports = Object.keys(expor).length > 0

  let mixed = ''

  if (hasShebang && hasExports) {
    throw new Error(`Your code contains a shebang "${shebang}" and exports, so it cannot be processed!`)
  } else if (!hasShebang && hasExports) {
    const { hasDefault } = validate(code, expor)
    mixed = mix(code, { hasDefault, defineEsModule, expor })
  } else if (hasShebang && !hasExports) {
    mixed = code
  }

  const { code: transformed } = await transform(mixed, { format: 'cjs', minify })

  return hasShebang ? `${shebang}\n${transformed}` : transformed
}

export default main
