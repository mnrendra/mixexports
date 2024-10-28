import { readFileSync } from 'node:fs'

import index from '..'

const read = (file: string): string => {
  return readFileSync(file, { encoding: 'utf8' })
}

describe('Test all features:', () => {
  it('Should return `./tests/dummies/1.expected.js` when given `./tests/dummies/1.resource.js`!', async () => {
    const resource = read('./tests/dummies/1.resource.js')
    const received = await index(resource)
    const expected = read('./tests/dummies/1.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/2.expected.js` when given `./tests/dummies/2.resource.js`!', async () => {
    const resource = read('./tests/dummies/2.resource.js')
    const received = await index(resource)
    const expected = read('./tests/dummies/2.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/3.expected.js` when given `./tests/dummies/3.resource.js`!', async () => {
    const resource = read('./tests/dummies/3.resource.js')
    const received = await index(resource)
    const expected = read('./tests/dummies/3.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/4.expected.js` when given `./tests/dummies/4.resource.js`!', async () => {
    const resource = read('./tests/dummies/4.resource.js')
    const received = await index(resource, { defineEsModule: true })
    const expected = read('./tests/dummies/4.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/5.expected.js` when given `./tests/dummies/5.resource.js`!', async () => {
    const resource = read('./tests/dummies/5.resource.js')
    const received = await index(resource, { defineEsModule: false })
    const expected = read('./tests/dummies/5.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/6.expected.js` when given `./tests/dummies/6.resource.js`!', async () => {
    const resource = read('./tests/dummies/6.resource.js')
    const received = await index(resource, { defineEsModule: true })
    const expected = read('./tests/dummies/6.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/7.expected.js` when given `./tests/dummies/7.resource.js`!', async () => {
    const resource = read('./tests/dummies/7.resource.js')
    const received = await index(resource, { defineEsModule: false })
    const expected = read('./tests/dummies/7.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/8.expected.js` when given `./tests/dummies/8.resource.js`!', async () => {
    const resource = read('./tests/dummies/8.resource.js')
    const received = await index(resource, { defineEsModule: false })
    const expected = read('./tests/dummies/8.expected.js')
    expect(received).toBe(expected)
  })

  it('Should reject within error when given `./tests/dummies/9.resource.js`!', async () => {
    const resource = read('./tests/dummies/9.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `exports` object is defined using `defineProperties`, so it cannot be imported using destructuring as `import { ... }`!'))
  })

  it('Should reject within error when given `./tests/dummies/10.resource.js`!', async () => {
    const resource = read('./tests/dummies/10.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Unable to extract the named export! Start: 194, End: 197'))
  })

  it('Should reject within error when given `./tests/dummies/11.expected.js`!', async () => {
    const resource = read('./tests/dummies/11.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Invalid named export property descriptor! Start: 182, End: 191'))
  })

  it('Should reject within error when given `./tests/dummies/12.expected.js`!', async () => {
    const resource = read('./tests/dummies/12.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a getter and additional attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./tests/dummies/13.expected.js`!', async () => {
    const resource = read('./tests/dummies/13.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a getter and additional attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./tests/dummies/14.expected.js`!', async () => {
    const resource = read('./tests/dummies/14.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value and setter attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./tests/dummies/15.expected.js`!', async () => {
    const resource = read('./tests/dummies/15.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value and configurable attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./tests/dummies/16.expected.js`!', async () => {
    const resource = read('./tests/dummies/16.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has no value or getter attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./tests/dummies/17.expected.js`!', async () => {
    const resource = read('./tests/dummies/17.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./tests/dummies/18.expected.js`!', async () => {
    const resource = read('./tests/dummies/18.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./tests/dummies/19.expected.js`!', async () => {
    const resource = read('./tests/dummies/19.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should reject within error when given `./tests/dummies/20.expected.js`!', async () => {
    const resource = read('./tests/dummies/20.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('The `amount` export has a value or getter with `enumerable` set to `false` in its attributes, so it cannot be imported using destructuring as `import { amount }`!'))
  })

  it('Should return `./tests/dummies/21.expected.js` when given `./tests/dummies/21.resource.js`!', async () => {
    const resource = read('./tests/dummies/21.resource.js')
    const received = await index(resource)
    const expected = read('./tests/dummies/21.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/22.expected.js` when given `./tests/dummies/22.resource.js`!', async () => {
    const resource = read('./tests/dummies/22.resource.js')
    const received = await index(resource)
    const expected = read('./tests/dummies/22.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/23.expected.js` when given `./tests/dummies/23.resource.js`!', async () => {
    const resource = read('./tests/dummies/23.resource.js')
    const received = await index(resource)
    const expected = read('./tests/dummies/23.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/24.expected.js` when given `./tests/dummies/24.resource.js`!', async () => {
    const resource = read('./tests/dummies/24.resource.js')
    const received = await index(resource)
    const expected = read('./tests/dummies/24.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/25.expected.js` when given `./tests/dummies/25.resource.js`!', async () => {
    const resource = read('./tests/dummies/25.resource.js')
    const received = await index(resource)
    const expected = read('./tests/dummies/25.expected.js')
    expect(received).toBe(expected)
  })

  it('Should reject within error when given `./tests/dummies/26.expected.js`!', async () => {
    const resource = read('./tests/dummies/26.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Your code contains both `module.exports` and `exports.default`, which is not recommended. Please use one!'))
  })

  it('Should reject within error when given `./tests/dummies/27.expected.js`!', async () => {
    const resource = read('./tests/dummies/27.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "bigint" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./tests/dummies/28.expected.js`!', async () => {
    const resource = read('./tests/dummies/28.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "boolean" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./tests/dummies/29.expected.js`!', async () => {
    const resource = read('./tests/dummies/29.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "number" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./tests/dummies/30.expected.js`!', async () => {
    const resource = read('./tests/dummies/30.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "string" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./tests/dummies/31.expected.js`!', async () => {
    const resource = read('./tests/dummies/31.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "symbol" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  it('Should reject within error when given `./tests/dummies/32.expected.js`!', async () => {
    const resource = read('./tests/dummies/32.resource.js')
    const received = index(resource)
    await expect(received).rejects.toThrow(Error('Failed to mix exports: "null" cannot be used as a default value. Only "object" and "function" are allowed.'))
  })

  //

  it('Should return `./tests/dummies/1.expected.min.js` when given `./tests/dummies/1.resource.js`!', async () => {
    const resource = read('./tests/dummies/1.resource.js')
    const received = await index(resource, { minify: true })
    const expected = read('./tests/dummies/1.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/2.expected.min.js` when given `./tests/dummies/2.resource.js`!', async () => {
    const resource = read('./tests/dummies/2.resource.js')
    const received = await index(resource, { minify: true })
    const expected = read('./tests/dummies/2.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/3.expected.min.js` when given `./tests/dummies/3.resource.js`!', async () => {
    const resource = read('./tests/dummies/3.resource.js')
    const received = await index(resource, { minify: true })
    const expected = read('./tests/dummies/3.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/4.expected.min.js` when given `./tests/dummies/4.resource.js`!', async () => {
    const resource = read('./tests/dummies/4.resource.js')
    const received = await index(resource, { defineEsModule: true, minify: true })
    const expected = read('./tests/dummies/4.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/5.expected.min.js` when given `./tests/dummies/5.resource.js`!', async () => {
    const resource = read('./tests/dummies/5.resource.js')
    const received = await index(resource, { defineEsModule: false, minify: true })
    const expected = read('./tests/dummies/5.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/6.expected.min.js` when given `./tests/dummies/6.resource.js`!', async () => {
    const resource = read('./tests/dummies/6.resource.js')
    const received = await index(resource, { defineEsModule: true, minify: true })
    const expected = read('./tests/dummies/6.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/7.expected.min.js` when given `./tests/dummies/7.resource.js`!', async () => {
    const resource = read('./tests/dummies/7.resource.js')
    const received = await index(resource, { defineEsModule: false, minify: true })
    const expected = read('./tests/dummies/7.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/8.expected.min.js` when given `./tests/dummies/8.resource.js`!', async () => {
    const resource = read('./tests/dummies/8.resource.js')
    const received = await index(resource, { defineEsModule: false, minify: true })
    const expected = read('./tests/dummies/8.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/21.expected.min.js` when given `./tests/dummies/21.resource.js`!', async () => {
    const resource = read('./tests/dummies/21.resource.js')
    const received = await index(resource, { minify: true })
    const expected = read('./tests/dummies/21.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/22.expected.min.js` when given `./tests/dummies/22.resource.js`!', async () => {
    const resource = read('./tests/dummies/22.resource.js')
    const received = await index(resource, { minify: true })
    const expected = read('./tests/dummies/22.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/23.expected.min.js` when given `./tests/dummies/23.resource.js`!', async () => {
    const resource = read('./tests/dummies/23.resource.js')
    const received = await index(resource, { minify: true })
    const expected = read('./tests/dummies/23.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/24.expected.min.js` when given `./tests/dummies/24.resource.js`!', async () => {
    const resource = read('./tests/dummies/24.resource.js')
    const received = await index(resource, { minify: true })
    const expected = read('./tests/dummies/24.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/25.expected.min.js` when given `./tests/dummies/25.resource.js`!', async () => {
    const resource = read('./tests/dummies/25.resource.js')
    const received = await index(resource, { minify: true })
    const expected = read('./tests/dummies/25.expected.min.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/33.expected.js` when given `./tests/dummies/33.resource.js`!', async () => {
    const resource = read('./tests/dummies/33.resource.js')
    const received = await index(resource)
    const expected = read('./tests/dummies/33.expected.js')
    expect(received).toBe(expected)
  })

  it('Should return `./tests/dummies/33.expected.min.js` when given `./tests/dummies/33.resource.js`!', async () => {
    const resource = read('./tests/dummies/33.resource.js')
    const received = await index(resource, { minify: true })
    const expected = read('./tests/dummies/33.expected.min.js')
    expect(received).toBe(expected)
  })
})
