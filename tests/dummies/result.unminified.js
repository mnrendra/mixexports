exports.a = 'a'
exports.default = () => 'default'

module.exports = exports.default;
Object.defineProperties(module.exports, {
  __esModule: { value: true },
  a: { value: exports.a },
  default: { value: exports.default }
});