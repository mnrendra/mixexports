const generateModuleExports = (
  hasDefault: boolean
): string => hasDefault
  ? 'module.exports=exports.default;'
  : 'module.exports={};exports.default=module.exports;'

export default generateModuleExports
