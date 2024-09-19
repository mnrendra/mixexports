import index from '.'

describe('Test main feature:', () => {
  it('Should return "Hello, World!"!', () => {
    const received = index()
    const expected = 'Hello, World!'
    expect(received).toBe(expected)
  })
})
