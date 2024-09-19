import { readFileSync } from 'node:fs'

import mockedRequireFromString from '@tests/mocks/requireFromString'
import unmockedRequireFromString from '@tests/unmocks/requireFromString'

import main from './main'

jest.mock('require-from-string', () => jest.fn())

describe('Test `main` feature:', () => {
  it('Should skip when given non-CommonJS code!', () => {
    const dummy = readFileSync('./tests/dummies/source.esm.mjs', { encoding: 'utf8' })

    const received = main(dummy)
    const expected = dummy

    expect(received).toBe(expected)
  })

  describe('By mocking `require-from-string` to return an `undefined` value:', () => {
    beforeAll(() => {
      unmockedRequireFromString(mockedRequireFromString)
      mockedRequireFromString.mockReturnValue(undefined)
    })

    afterAll(() => {
      unmockedRequireFromString(mockedRequireFromString)
    })

    it('Should skip when `module.exports` in the given code is `undefined`!', () => {
      const received = main('')
      const expected = main('')

      expect(received).toBe(expected)
    })
  })

  describe('By mocking `require-from-string` to return a `null` value:', () => {
    beforeAll(() => {
      unmockedRequireFromString(mockedRequireFromString)
      mockedRequireFromString.mockReturnValue(null)
    })

    afterAll(() => {
      unmockedRequireFromString(mockedRequireFromString)
    })

    it('Should skip when `module.exports` in the given code is `null`!', () => {
      const received = main('')
      const expected = main('')

      expect(received).toBe(expected)
    })
  })

  it('Should skip when given CommonJS code with no default value!', () => {
    const dummy = readFileSync('./tests/dummies/source.cjs.no-default.js', { encoding: 'utf8' })

    const received = main(dummy)
    const expected = dummy

    expect(received).toBe(expected)
  })

  it('Should throw an error when the default value in the given CommonJS code is `null`!', () => {
    const dummy = readFileSync('./tests/dummies/source.cjs.default.null.js', { encoding: 'utf8' })

    const received = (): void => {
      main(dummy)
    }

    const expected = Error('Failed to mix exports: "null" cannot be used as a default value. Only "object" and "function" are allowed.')

    expect(received).toThrow(expected)
  })

  it('Should throw an error when the default value in the given CommonJS code is `bigint`!', () => {
    const dummy = readFileSync('./tests/dummies/source.cjs.default.bigint.js', { encoding: 'utf8' })

    const received = (): void => {
      main(dummy)
    }

    const expected = Error('Failed to mix exports: "bigint" cannot be used as a default value. Only "object" and "function" are allowed.')

    expect(received).toThrow(expected)
  })

  it('Should throw an error when the default value in the given CommonJS code is `boolean`!', () => {
    const dummy = readFileSync('./tests/dummies/source.cjs.default.boolean.js', { encoding: 'utf8' })

    const received = (): void => {
      main(dummy)
    }

    const expected = Error('Failed to mix exports: "boolean" cannot be used as a default value. Only "object" and "function" are allowed.')

    expect(received).toThrow(expected)
  })

  it('Should throw an error when the default value in the given CommonJS code is `number`!', () => {
    const dummy = readFileSync('./tests/dummies/source.cjs.default.number.js', { encoding: 'utf8' })

    const received = (): void => {
      main(dummy)
    }

    const expected = Error('Failed to mix exports: "number" cannot be used as a default value. Only "object" and "function" are allowed.')

    expect(received).toThrow(expected)
  })

  it('Should throw an error when the default value in the given CommonJS code is `string`!', () => {
    const dummy = readFileSync('./tests/dummies/source.cjs.default.string.js', { encoding: 'utf8' })

    const received = (): void => {
      main(dummy)
    }

    const expected = Error('Failed to mix exports: "string" cannot be used as a default value. Only "object" and "function" are allowed.')

    expect(received).toThrow(expected)
  })

  it('Should throw an error when the default value in the given CommonJS code is `symbol`!', () => {
    const dummy = readFileSync('./tests/dummies/source.cjs.default.symbol.js', { encoding: 'utf8' })

    const received = (): void => {
      main(dummy)
    }

    const expected = Error('Failed to mix exports: "symbol" cannot be used as a default value. Only "object" and "function" are allowed.')

    expect(received).toThrow(expected)
  })

  it('Should return mixed exports code in unminified format when given mixed CommonJS exports code with no options!', () => {
    const received = main(readFileSync('./tests/dummies/source.js', { encoding: 'utf8' }))
    const expected = readFileSync('./tests/dummies/result.unminified.js', { encoding: 'utf8' })

    expect(received).toBe(expected)
  })

  it('Should return mixed exports code in minified format when given mixed CommonJS exports code with `options.minify = true`!', () => {
    const received = main(readFileSync('./tests/dummies/source.js', { encoding: 'utf8' }), { minify: true })
    const expected = readFileSync('./tests/dummies/result.minified.js', { encoding: 'utf8' })

    expect(received).toBe(expected)
  })
})
