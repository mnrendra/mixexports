import Module from 'node:module'

interface InternalModule extends Module {
  _compile: (code: string, filename: string) => void
}

const compile = (code: string): any => {
  const newModule = new Module('') as InternalModule
  newModule._compile(code, '')
  return newModule.exports
}

export default compile
