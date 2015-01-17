var levelup = require('levelup')

module.exports = function(db, defaults) {
  if (!defaults) defaults = {}

  defaults.db = function(l) {
    var down = db.db
    db.on('open', function() {
      up.db = db.db
    })
    return down
  }

  var up = levelup(db.location || 'no-location', defaults)

  return up
}