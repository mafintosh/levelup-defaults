# levelup-defaults

Change the defaults settings on a levelup instance
by returning a new levelup instance that uses the same leveldown but different options.

```
npm install levelup-defaults
```

[![build status](http://img.shields.io/travis/mafintosh/levelup-defaults.svg?style=flat)](http://travis-ci.org/mafintosh/levelup-defaults)

## Usage

``` js
var defaults = require('levelup-defaults')
var level = require('level')
var db = level('db')

// create a new levelup that uses binary encoding as default
var binaryDb = defaults(db, {valueEncoding:'binary'})

// create a new levelup that uses bytewise and json
var anotherDb = defaults(db, {keyEncoding:require('bytewise'), valueEncoding:'json'})
```

The original `db` is not mutated so any encoding settings on that are left unchanged.

## License

MIT
