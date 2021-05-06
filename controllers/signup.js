const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs')

const { User } = require('../models')

router.get('/new',function (req, res) {
    res.render('signup/new', { errors: [] })
})

router.post('/confirmation', async function (req, res) {
    var Password = bcrypt.hashSync(req.body.password, 10);

    await User.create({
        email: req.body.email,
        passwordHash: Password
      }).then(user => {
        req.session.userId = user.id
        res.render('signup/confirmation')
      }).catch(errors => {
        res.render('signup/new', { errors: errors.errors[0].message })
      })
})

module.exports = router;
