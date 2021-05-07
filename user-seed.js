const db = require('./models')
var bcrypt = require('bcryptjs')

var Password = bcrypt.hashSync('password', 10);

const seedUser = async () => {
  console.log('seeding user')
    await db.User.create({
    email: 'random@gmail.com',
    passwordHash: Password,
    createdAt: new Date('2021', '4', '3', '10', '30'),
    updatedAt: new Date('2021', '4', '3', '10', '30'),
  })

}

module.exports = seedUser;