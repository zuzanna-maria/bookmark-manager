const db = require('./models')

const truncateUsers = () => {
  console.log('truncating Users')
  db.Users.destroy({ truncate : true, cascade: true })
}

module.exports = truncateUsers;