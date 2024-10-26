import type { AssignmentExpression } from 'acorn'

type AssignmentExpressionFn = (
  node: AssignmentExpression,
  state: unknown
) => void

export default AssignmentExpressionFn
