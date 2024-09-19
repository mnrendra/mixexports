import originalModule from 'require-from-string'

const requireFromString = originalModule as jest.Mocked<any>

export default requireFromString
