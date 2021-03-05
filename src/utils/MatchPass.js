const bcrypt = require('bcrypt')

module.exports = {
  matchPass: async(password, hash) => {
    return bcrypt.compare(password, hash)
  }
}
