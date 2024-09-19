import type originalModule from 'require-from-string'

import type mockedModule from '@tests/mocks/requireFromString'

type OriginalModule = typeof originalModule
type MockedModule = typeof mockedModule

const unmock = (
  mockedModule: MockedModule
): void => {
  const actualModule: OriginalModule = jest.requireActual('require-from-string')
  mockedModule.mockImplementation(actualModule)
}

export default unmock
