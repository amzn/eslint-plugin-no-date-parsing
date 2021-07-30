import { createRuleTester } from "eslint-etc";
import { resolve } from "path";

import rule = require('../src/rules/no-date-parsing');

createRuleTester({
  filename: resolve("./tests/file.ts")
})({
  types: true
}).run('no-date-parsing', rule, {
  valid: [
    'new Date(2020, 3, 20)',
    'var t = 123456; new Date(t)',
  ],

  invalid: [
    {
      code: 'new Date("2020-03-20")',
      errors: [{messageId: 'noNewDate'}],
    },
    {
      code: 'Date.parse("2020-03-20")',
      errors: [{messageId: 'noDateParse'}],
    },
    {
      code: 'var x = "2020-03-20"; new Date(x);',
      errors: [{messageId: 'noNewDate'}],
    },
    {
      code: 'var x = "2020-03-20"; Date.parse(x);',
      errors: [{messageId: 'noDateParse'}],
    },
    {
      code: 'function f(x) { new Date(x) }',
      errors: [{messageId: 'mustBeTyped'}],
    },
    {
      code: 'function f(x) { Date.parse(x) }',
      errors: [{messageId: 'noDateParse'}],
    },
  ],
});

console.log('Tests completed successfully');