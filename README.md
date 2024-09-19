# @mnrendra/mixexports
A function to mix **CommonJS** exports, transforming:
```javascript
exports.named1 = 'named1';
exports.named2 = 'named2';
exports.default = () => 'main';
```
to:
```javascript
exports.named1 = 'named1';
exports.named2 = 'named2';
exports.default = () => 'main';
module.exports = exports.default;
Object.defineProperties(module.exports, {
  __esModule: { value: true },
  named1: { value: exports.named1 },
  named2: { value: exports.named2 },
  default: { value: exports.default }
});
```

This allows the consumer to `import` or `require` the module in the following ways:
```javascript
import main, { named1 } from 'module'

console.log(main()) // will print: 'main'
console.log(named1) // will print: 'named1'
console.log(main.named2) // will print: 'named2'
```
or:
```javascript
const main = require('module')
const { named1 } = require('module')

console.log(main()) // will print: 'main'
console.log(named1) // will print: 'named1'
console.log(main.named2) // will print: 'named2'
```
*Note: This function uses `Object.defineProperties` to make all the named exports non-enumerable. Therefore, when the consumer logs the default value with `console.log`, all the named exports will be hidden but can still be accessed via destructuring with `import` or `require`.*

## Install
```bash
npm i @mnrendra/mixexports
```

## Usage

Using `ES Modules`:
```javascript
import { readFileSync, writeFileSync } from 'node:fs'
import mixexports from '@mnrendra/mixexports'

const source = readFileSync('./source.js', { encoding: 'utf8' })

const result = mixexports(source) // mix to pretty format
const minify = mixexports(source, { minify: true }) // mix to minify format

writeFileSync('./result.js', result)
writeFileSync('./minify.js', minify)
```

Using `CommonJS`:
```javascript
const { readFileSync, writeFileSync } = require('node:fs')
const mixexports = require('@mnrendra/mixexports')

const source = readFileSync('./source.js', { encoding: 'utf8' })

const result = mixexports(source) // mix to pretty format
const minify = mixexports(source, { minify: true }) // mix to minify format

writeFileSync('./result.js', result)
writeFileSync('./minify.js', minify)
```

## Options
- **`minify`** (*type: `boolean`* | *default: `false`*)<br/>
To produce the minified or pretty format.

## Types
```typescript
import type {
  Options // An interface to validate options.
} from '@mnrendra/mixexports'
```

## License
[MIT](https://github.com/mnrendra/mixexports/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
