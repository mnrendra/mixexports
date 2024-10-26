import { readFileSync } from 'node:fs'

import index from '..'

const read = (file: string): string => {
  return readFileSync(file, { encoding: 'utf8' })
}

describe('Test all features:', () => {
  it('Should return `./dummies/1.expected.js` when given `./dummies/1.resource.js`!', async () => {
    const resource = read('./dummies/1.resource.js')
    const received = await index(resource)
    const expected = read('./dummies/1.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/2.expected.js` when given `./dummies/2.resource.js`!', async () => {
    const resource = read('./dummies/2.resource.js')
    const received = await index(resource)
    const expected = read('./dummies/2.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/3.expected.js` when given `./dummies/3.resource.js`!', async () => {
    const resource = read('./dummies/3.resource.js')
    const received = await index(resource)
    const expected = read('./dummies/3.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/4.expected.js` when given `./dummies/4.resource.js`!', async () => {
    const resource = read('./dummies/4.resource.js')
    const received = await index(resource, { defineEsModule: true })
    const expected = read('./dummies/4.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/5.expected.js` when given `./dummies/5.resource.js`!', async () => {
    const resource = read('./dummies/5.resource.js')
    const received = await index(resource, { defineEsModule: false })
    const expected = read('./dummies/5.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/6.expected.js` when given `./dummies/6.resource.js`!', async () => {
    const resource = read('./dummies/6.resource.js')
    const received = await index(resource, { defineEsModule: true })
    const expected = read('./dummies/6.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/7.expected.js` when given `./dummies/7.resource.js`!', async () => {
    const resource = read('./dummies/7.resource.js')
    const received = await index(resource, { defineEsModule: false })
    const expected = read('./dummies/7.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/8.expected.js` when given `./dummies/8.resource.js`!', async () => {
    const resource = read('./dummies/8.resource.js')
    const received = await index(resource, { defineEsModule: false })
    const expected = read('./dummies/8.expected.js')
    expect(received).toBe(expected)
  })

  it('Should reject within error when given `./dummies/9.resource.js`!', async () => {
    const resource = read('./dummies/9.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `exports` object is defined using `defineProperties`, so it cannot be imported using destructuring as `import { ... }`!'))
  })

  it('Should reject within error when given `./dummies/10.resource.js`!', async () => {
    const resource = read('./dummies/10.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Unable to extract the named export! Start: 194, End: 197'))
  })

  it('Should reject within error when given `./dummies/11.expected.js`!', async () => {
    const resource = read('./dummies/11.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Invalid named export property descriptor! Start: 182, End: 191'))
  })

  it('Should reject within error when given `./dummies/12.expected.js`!', async () => {
    const resource = read('./dummies/12.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a getter and additional attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./dummies/13.expected.js`!', async () => {
    const resource = read('./dummies/13.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a getter and additional attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./dummies/14.expected.js`!', async () => {
    const resource = read('./dummies/14.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value and setter attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./dummies/15.expected.js`!', async () => {
    const resource = read('./dummies/15.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value and configurable attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./dummies/16.expected.js`!', async () => {
    const resource = read('./dummies/16.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has no value or getter attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./dummies/17.expected.js`!', async () => {
    const resource = read('./dummies/17.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./dummies/18.expected.js`!', async () => {
    const resource = read('./dummies/18.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./dummies/19.expected.js`!', async () => {
    const resource = read('./dummies/19.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./dummies/20.expected.js`!', async () => {
    const resource = read('./dummies/20.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should return `./dummies/21.expected.js` when given `./dummies/21.resource.js`!', async () => {
    const resource = read('./dummies/21.resource.js')
    const received = await index(resource)
    const expected = read('./dummies/21.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/22.expected.js` when given `./dummies/22.resource.js`!', async () => {
    const resource = read('./dummies/22.resource.js')
    const received = await index(resource)
    const expected = read('./dummies/22.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/23.expected.js` when given `./dummies/23.resource.js`!', async () => {
    const resource = read('./dummies/23.resource.js')
    const received = await index(resource)
    const expected = read('./dummies/23.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/24.expected.js` when given `./dummies/24.resource.js`!', async () => {
    const resource = read('./dummies/24.resource.js')
    const received = await index(resource)
    const expected = read('./dummies/24.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./dummies/25.expected.js` when given `./dummies/25.resource.js`!', async () => {
    const resource = read('./dummies/25.resource.js')
    const received = await index(resource)
    const expected = read('./dummies/25.expected.js')
    expect(received).toBe(expected)
  })

  it('Should reject within error when given `./dummies/26.expected.js`!', async () => {
    const resource = read('./dummies/26.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Your code contains both `module.exports` and `exports.default`, which is not recommended. Please use one!'))
  })

  it('Should reject within error when given `./dummies/27.expected.js`!', async () => {
    const resource = read('./dummies/27.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "bigint" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./dummies/28.expected.js`!', async () => {
    const resource = read('./dummies/28.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "boolean" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./dummies/29.expected.js`!', async () => {
    const resource = read('./dummies/29.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "number" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./dummies/30.expected.js`!', async () => {
    const resource = read('./dummies/30.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "string" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./dummies/31.expected.js`!', async () => {
    const resource = read('./dummies/31.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "symbol" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./dummies/32.expected.js`!', async () => {
    const resource = read('./dummies/32.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "null" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })
})
