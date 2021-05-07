const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs')

const { User } = require('../models')

router.get('/new',function (req, res) {
    res.render('signin/new', { errors: [] })
})

router.post('/new', async function (req, res) {
    let userVerification = await User.findOne({where:{email:req.body.email}})
    console.log(userVerification)
    if (!userVerification) {
      console.log('Email not recognised, please sign up')
      res.render('signin/new', { errors: 'Email not recognised, please sign up' })
    } else if (bcrypt.compareSync(req.body.password, userVerification.passwordHash)) {
      console.log('signin successful')
      req.session.userId = userVerification.id
      res.redirect('/bookmarks')
    } else {
      console.log('Invalid password')
      res.render('signin/new', { errors: 'Invalid password' })
    }
})

router.delete('/new', async function (req, res) {
  await req.session.destroy()
  res.redirect('/')
})

module.exports = router;
