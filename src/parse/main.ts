import type { Expor, States } from '../types'

import { parse } from 'acorn'
import { simple } from 'acorn-walk'
import { generate } from 'escodegen'

import assignmentExpression from './assignmentExpression'
import callExpression from './callExpression'

const main = (
  code: string
): { code: string, expor: Expor } => {
  const states: States = {
    hasModuleExports: false,
    hasExportsDefault: false,
    expor: {}
  }

  const ast = parse(code, { sourceType: 'module', ecmaVersion: 'latest' })

  simple(ast, {
    // AssignmentExpression
    AssignmentExpression: assignmentExpression(states),
    // CallExpression
    CallExpression: callExpression(states)
  })

  if (states.hasModuleExports && states.hasExportsDefault) {
    throw new Error('Your code contains both `module.exports` and `exports.default`, which is not recommended. Please use one!')
  }

  return {
    code: generate(ast),
    expor: states.expor
  }
}

export default main
