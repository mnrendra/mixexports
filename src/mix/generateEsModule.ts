const generateEsModule = (
  esModule?: boolean
): string => {
  const value = esModule !== undefined ? `${esModule}` : 'exports.__esModule'
  return `__esModule:{value:${value}},`
}

export default generateEsModule
