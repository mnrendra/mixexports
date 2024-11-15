# @mnrendra/mixexports
A function to mix **CommonJS** exports.

## Use cases

### 1. Mix named exports with default export.
transforming:
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
  __esModule: { value: exports.__esModule },
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

### 2. Export all named exports using `module.exports`.
transforming:
```javascript
exports.named1 = 'named1';
exports.named2 = 'named2';
```
to:
```javascript
exports.named1 = 'named1';
exports.named2 = 'named2';
module.exports = {};
exports.default = module.exports;
Object.defineProperties(module.exports, {
  __esModule: { value: exports.__esModule },
  named1: { value: exports.named1, enumerable: true },
  named2: { value: exports.named2, enumerable: true },
  default: { value: exports.default }
});
```

This allows the consumer to `import` or `require` the module in the following ways:
```javascript
import main, { named1 } from 'module'

console.log(named1) // will print: 'named1'
console.log(main.named2) // will print: 'named2'
```
or:
```javascript
const main = require('module')
const { named1 } = require('module')

console.log(named1) // will print: 'named1'
console.log(main.named2) // will print: 'named2'
```

### 3. Keep external live bindings.
transforming:
```javascript
let amount = 0;
const increaseAmount = () => {
  amount = amount + 1;
};

Object.defineProperty(exports, "amount", { get () { return amount; }, enumerable: true });
exports.increaseAmount = increaseAmount;
```
to:
```javascript
let amount = 0;
const increaseAmount = () => {
  amount = amount + 1;
};
Object.defineProperty(exports, "amount", { get () { return amount; } });
exports.increaseAmount = increaseAmount;
module.exports = {};
exports.default = module.exports;
Object.defineProperties(exports, {
  __esModule: { value: exports.__esModule },
  amount: { get () { return amount; }, enumerable: true },
  increaseAmount: { value: exports.increaseAmount, enumerable: true },
  default: { value: exports.default }
});
```

This allows the consumer to `import` or `require` the module in the following ways:
```javascript
import main, { increaseAmount } from 'module'

console.log(main.amount) // will print: 0
increaseAmount()
console.log(main.amount) // will print: 1
```
or:
```javascript
const main = require('module')
const { increaseAmount } = require('module')

console.log(main.amount) // will print: 0
increaseAmount()
console.log(main.amount) // will print: 1
```

*Note: This function uses `Object.defineProperties` to make all the named exports non-enumerable. Therefore, when the consumer logs the default value with `console.log`, all the named exports will be hidden (unless the module has no default export) but can still be accessed via destructuring with `import` or `require`.*

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
- **`minify`**<br/>
*type: `boolean`*<br/>
*default: `false`*<br/>
To produce the minified or pretty format.

- **`defineEsModule`**<br/>
*type: `boolean|undefined`*<br/>
*default: `undefined`*<br/>
To specify whether to define `exports.__esModule`.

## Types
```typescript
import type {
  Options // The options interface.
} from '@mnrendra/mixexports'
```

## License
[MIT](https://github.com/mnrendra/mixexports/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
