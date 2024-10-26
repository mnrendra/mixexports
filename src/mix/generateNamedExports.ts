import type { Expor } from '../types'

const generateNamedExports = (
  expor: Expor,
  hasDefault: boolean
): string => Object.keys(expor)
  .filter((name) => name !== '__esModule' && name !== 'default')
  .map((name) => `${name}:${JSON.stringify(hasDefault ? expor[name] : { ...expor[name], enumerable: true }).replace(/"/g, '')},`)
  .join('')

export default generateNamedExports
