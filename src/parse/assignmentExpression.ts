import type { AssignmentExpressionFn, States } from '../types'

import redifineDescriptor from './redifineDescriptor'

const assignmentExpression = (
  states: States
): AssignmentExpressionFn => ({
  left
}) => {
  if (
    left.type === 'MemberExpression' &&
    left.object.type === 'Identifier' &&
    left.property.type === 'Identifier'
  ) {
    const { object, property } = left

    if (object.name === 'module' && property.name === 'exports') {
      states.hasModuleExports = true

      object.name = 'exports'
      property.name = 'default'

      redifineDescriptor(states.expor, 'default', {
        value: 'exports.default'
      })
    } else if (object.name === 'exports') {
      const { name } = property

      states.hasExportsDefault = name === 'default'

      redifineDescriptor(states.expor, name, {
        value: `exports.${name}`
      })
    }
  }
}

export default assignmentExpression
