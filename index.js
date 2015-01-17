var levelup = require('levelup')

var noop = function() {}

var Proxy = function(db) {
  this.db = db
  this.leveldown = null
}

Proxy.prototype.open = function(opts, cb) {
  if (typeof opts === 'function') return this.open(null, opts)
  if (!cb) cb = noop
  var self = this
  this.db.open(function(err) {
    if (err) return cb(err)
    self.leveldown = self.db.db
    cb()
  })
}

'put get del batch approximateSize iterator close'.split(' ').forEach(function(m) {
  Proxy.prototype[m] = function() {
    return this.leveldown[m].apply(this.leveldown, arguments)
  }
})

module.exports = function(db, defaults) {
  if (!defaults) defaults = {}

  defaults.db = function(l) {
    return new Proxy(db)
  }

  var up = levelup(db.location || 'no-location', defaults)

  up.on('ready', function() { // remove the proxy
    if (up.db instanceof Proxy) up.db = up.db.leveldown
  })

  return up
}