const parseShebang = (
  source: string
): { code: string, shebang?: string } => {
  if (!source.startsWith('#!')) return { code: source }

  const firstNewLine = source.indexOf('\n')

  const shebang = source.slice(0, firstNewLine).trim()
  const code = source.slice(firstNewLine + 1)

  if (
    shebang.includes('\n') ||
    shebang.includes('\r') ||
    shebang.includes('\r\n')
  ) {
    throw new Error('Your code contains "\\r\\n" or "\\r". Please change it to "\\n"!')
  }

  return { shebang, code }
}

export default parseShebang
