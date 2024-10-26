import type { Descriptor, Expor } from '../types'

const redifineDescriptor = (
  expor: Expor,
  name: string,
  descriptor: Descriptor
): void => {
  expor[name] = {
    ...expor[name],
    ...descriptor
  }
}

export default redifineDescriptor
