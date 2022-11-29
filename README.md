# eslint-plugin-no-date-parsing

Disallow string parsing with new Date and Date.parse.

## Why?

String parsing with `new Date` and `Date.parse` will result in timezone errors if the string does not specify a time zone.
`new Date` and `Date.parse` are not portable as the implementation is not in the ECMA specification and is left to the browser vendor to determine.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date), says

> Note: Parsing of date strings with the Date constructor (and Date.parse(), which works the same way) is strongly discouraged due to browser differences and inconsistencies.
> 
> - Support for RFC 2822 format strings is by convention only.
> - Support for ISO 8601 formats differs in that date-only strings (e.g. "1970-01-01") are treated as UTC, not local.

Brief illustrations of the issue:

```
dateFns.format(new Date('2020-03-27'), 'yyyy-MM-dd')
"2020-03-26"

moment(new Date('2020-03-27')).format('YYYY-MM-DD')
"2020-03-26"
```

## Installation

```
npm install --save-dev eslint-plugin-no-date-parsing
```

**`eslint-plugin-no-date-parsing` version 0:** Supports `eslint` v7 and `@typescript-eslint` v4.

**`eslint-plugin-no-date-parsing` version 1:** Supports `eslint` v8 and `@typescript-eslint` v5.

## Usage

Add `no-date-parsing` to the plugins section of your .eslintrc configuration file. You can omit the eslint-plugin- prefix:

```
{
  "plugins": [
    "no-date-parsing"
  ]
}
```

`no-date-parsing` contains only one rule. Add it under the rules section.

```
{
  "rules": {
    "no-date-parsing/no-date-parsing": "error"
  }
}
```
