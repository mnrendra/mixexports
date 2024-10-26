import type { Expression, SpreadElement } from 'acorn'

import type { CallExpressionFn, Descriptor, States } from '../types'

import { generate } from 'escodegen'

import redifineDescriptor from './redifineDescriptor'

const FORMAT = { format: { newline: '' } }

const defineExports = (
  states: States,
  exportName: string,
  node: Expression | SpreadElement
): void => {
  if (node.type !== 'ObjectExpression') {
    throw new Error(`Invalid named export property descriptor! Start: ${node.start}, End: ${node.end}`)
  }

  const attributes: Record<string, Expression> = {}

  node.properties.forEach((property) => {
    if (property.type === 'Property' && property.key.type === 'Identifier') {
      attributes[property.key.name] = property.value
    }
  })

  const attributesKeys = Object.keys(attributes)

  const errMsg = (msg: string): Error => new Error(`The \`${exportName}\` export has ${msg} attributes, so it cannot be imported using destructuring as \`import { ${exportName} }\`!`)

  if (attributesKeys.includes('get') && attributesKeys.length > 2) {
    throw errMsg('a getter and additional')
  } else if (attributesKeys.includes('get') && attributesKeys.length > 1 && !attributesKeys.includes('enumerable')) {
    throw errMsg('a getter and additional')
  } else if (attributesKeys.includes('value') && attributesKeys.includes('set')) {
    throw errMsg('a value and setter')
  } else if (attributesKeys.includes('value') && attributesKeys.includes('configurable')) {
    throw errMsg('a value and configurable')
  } else if (!attributesKeys.includes('value') && !attributesKeys.includes('get')) {
    throw errMsg('no value or getter')
  }

  attributesKeys.forEach((key) => {
    if (key === 'get') {
      redifineDescriptor(states.expor, exportName, {
        get: generate(attributes.get, FORMAT)
      })
    } else if (key === 'value') {
      redifineDescriptor(states.expor, exportName, {
        value: `exports.${exportName}`
      })
    } else if (key === 'enumerable') {
      const { enumerable } = attributes

      if ((
        enumerable.type === 'UnaryExpression' &&
        enumerable.operator === '!' &&
        enumerable.argument.type === 'Literal' &&
        typeof enumerable.argument.value === 'number' &&
        typeof enumerable.argument.raw === 'string' &&
        `${enumerable.argument.value}` === enumerable.argument.raw &&
        enumerable.argument.value === 0
      ) || (
        enumerable.type === 'Literal' &&
        typeof enumerable.value === 'boolean' &&
        typeof enumerable.raw === 'string' &&
        `${enumerable.value}` === enumerable.raw &&
        enumerable.raw === 'true'
      )) {
        node.properties = node.properties.filter((property) => !(
          property.type === 'Property' &&
          property.key.type === 'Identifier' &&
          property.key.name === 'enumerable'
        ))
      } else {
        throw errMsg('a value or getter with `enumerable` set to `false` in its')
      }
    } else if (key === 'writable') {
      redifineDescriptor(states.expor, exportName, {
        writable: generate(attributes.writable, FORMAT)
      })
    } else {
      redifineDescriptor(states.expor, exportName,
        JSON.parse(`{ "${key}": ${generate(attributes[key], FORMAT)} }`) as Descriptor
      )
    }
  })
}

const defineProperty = (
  states: States,
  args: Array<Expression | SpreadElement>
): void => {
  const [object, property, attributes] = args

  if (object.type === 'Identifier' && object.name === 'exports') {
    if (!(
      property.type === 'Literal' &&
      typeof property.value === 'string' &&
      typeof property.raw === 'string' &&
      (
        `"${property.value}"` === property.raw ||
        `'${property.value}'` === property.raw
      )
    )) {
      throw new Error(`Unable to extract the named export! Start: ${property.start}, End: ${property.end}`)
    }

    defineExports(states, property.value, attributes)
  }
}

const defineProperties = (
  states: States,
  args: Array<Expression | SpreadElement>
): void => {
  const [object] = args
  // const [object, property] = args

  if (object.type === 'Identifier' && object.name === 'exports') {
    throw new Error('The `exports` object is defined using `defineProperties`, so it cannot be imported using destructuring as `import { ... }`!')

    // if (property.type !== 'ObjectExpression') {
    //   throw new Error('Invalid named export properties!')
    // }

    // property.properties.forEach((property) => {
    //   if (property.type === 'Property') {
    //     const { value, key } = property

    //     if (key.type === 'Identifier') {
    //       defineExports(states, key.name, value)
    //     } else if (key.type === 'Literal') {
    //       if (!(
    //         typeof key.value === 'string' &&
    //         typeof key.raw === 'string' &&
    //         (
    //            `"${key.value}"` === key.raw ||
    //            `'${key.value}'` === key.raw
    //         )
    //       )) {
    //         throw new Error('Unable to extract the named export!')
    //       }

    //       defineExports(states, key.value, value)
    //     }
    //   }
    // })
  }
}

const callExpression = (
  states: States
): CallExpressionFn => ({
  callee,
  arguments: args
}) => {
  if (
    callee.type === 'MemberExpression' &&
    callee.object.type === 'Identifier' &&
    callee.object.name === 'Object' &&
    callee.property.type === 'Identifier'
  ) {
    switch (callee.property.name) {
      case 'defineProperty':
        defineProperty(states, args)
        break
      case 'defineProperties':
        defineProperties(states, args)
        break
    }
  }
}

export default callExpression
