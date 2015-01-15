var defaults = require('./')
var tape = require('tape')
var memdb = require('memdb')

tape('valueEncoding', function(t) {
  var db = memdb()

  db.put('hello', JSON.stringify({hello:'world'}), function() {
    db.get('hello', function(err, val) {
      t.same(val, '{"hello":"world"}', 'not json')
      var jdb = defaults(db, {valueEncoding:'json'})
      jdb.get('hello', function(err, val) {
        t.same(val, {hello:'world'}, 'is json')
        db.get('hello', function(err, val) {
          t.same(val, '{"hello":"world"}', 'db not changed')
          t.end()
        })
      })
    })
  })
})

tape('keyEncoding', function(t) {
  var db = memdb()

  db.put('"hello"', 'world', function() {
    db.get('"hello"', function(err, val) {
      t.same(val, 'world')
      var jdb = defaults(db, {keyEncoding:'json'})
      jdb.get('hello', function(err, val) {
        t.same(val, 'world')
        db.get('"hello"', function(err, val) {
          t.same(val, 'world', 'db not changed')
          t.end()
        })
      })
    })
  })
})