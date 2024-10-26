import type { CallExpression } from 'acorn'

type CallExpressionFn = (
  node: CallExpression,
  state: unknown
) => void

export default CallExpressionFn
