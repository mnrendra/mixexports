import type { Expor } from '../types'

import compile from './compile'
import validateDefaultExport from './validateDefaultExport'

const main = (
  code: string,
  expor: Expor
): {
  hasDefault: boolean
} => {
  const mod = compile(code)

  validateDefaultExport(mod.default)

  const hasDefault = expor.default !== undefined && mod.default !== undefined

  return { hasDefault }
}

export default main
