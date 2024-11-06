import type { Expor, States } from '../types'

import { parse } from 'acorn'
import { simple } from 'acorn-walk'
import { generate } from 'escodegen'

import parseShebang from './parseShebang'
import assignmentExpression from './assignmentExpression'
import callExpression from './callExpression'

const main = (
  source: string
): { shebang?: string, code: string, expor: Expor } => {
  const states: States = {
    hasModuleExports: false,
    hasExportsDefault: false,
    expor: {}
  }

  const { shebang, code } = parseShebang(source)

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
    shebang,
    code: generate(ast),
    expor: states.expor
  }
}

export default main
