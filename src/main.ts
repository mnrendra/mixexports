import type { Options } from './types'

import { transform } from 'esbuild'

import parse from './parse'
import validate from './validate'
import mix from './mix'

/**
 * A function to mix **CommonJS** exports.
 *
 * @param {string} source The source code as a string.
 * @param {Options} options The options object.
 *
 * @returns Modified code as a string.
 *
 * @see https://github.com/mnrendra/mixexports#readme
 */
const main = async (source: string, {
  defineEsModule,
  minify = false
}: Options = {}): Promise<string> => {
  const { code, expor } = parse(source)

  const { hasDefault } = validate(code, expor)

  const mixed = mix(code, { hasDefault, defineEsModule, expor })

  const { code: transformed } = await transform(mixed, { format: 'cjs', minify })

  return transformed
}

export default main
