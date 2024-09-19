import main from './main'

describe('Test `main` feature:', () => {
  it('Should return "Hello, World!"!', () => {
    const received = main()
    const expected = 'Hello, World!'
    expect(received).toBe(expected)
  })
})
