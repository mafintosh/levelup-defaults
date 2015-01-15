var memdb = require('memdb')
var defaults = require('levelup-defaults')
var db = memdb()

db = defaults(db, {valueEncoding:'binary'})

db.put('hello', 'world', function() {
  db.get('hello', function(err, buf) {
    console.log('"world" as a buffer:', buf)
  })
})
