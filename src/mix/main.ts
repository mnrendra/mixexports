import type { Expor } from '../types'

import generateModuleExports from './generateModuleExports'
import generateEsModule from './generateEsModule'
import generateNamedExports from './generateNamedExports'

const main = (code: string, {
  hasDefault,
  defineEsModule,
  expor
}: {
  hasDefault: boolean
  defineEsModule?: boolean
  expor: Expor
}): string => {
  return '' +
  code +
  generateModuleExports(hasDefault) +
  'Object.defineProperties(module.exports,{' +
  generateEsModule(defineEsModule) +
  generateNamedExports(expor, hasDefault) +
  'default:{value:exports.default}});'
}

export default main
