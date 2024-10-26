const errorMessage = (
  type: string
): Error => {
  const title = 'Failed to mix exports:'
  const desc = `"${type}" cannot be used as a default value.`
  const subDesc = 'Only "object" and "function" are allowed.'

  return new Error(title + ' ' + desc + ' ' + subDesc)
}

const validateDefaultExport = (
  value: any
): any => {
  if (value === null) throw errorMessage('null')

  switch (typeof value) {
    case 'bigint': throw errorMessage('bigint')
    case 'boolean': throw errorMessage('boolean')
    case 'number': throw errorMessage('number')
    case 'string': throw errorMessage('string')
    case 'symbol': throw errorMessage('symbol')
  }

  return value
}

export default validateDefaultExport
