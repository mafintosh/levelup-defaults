var levelup = require('levelup')

module.exports = function(db, defaults) {
  if (!defaults) defaults = {}

  defaults.db = function() {
    return db.db
  }

  return levelup(db.location || 'no-location', defaults)
}