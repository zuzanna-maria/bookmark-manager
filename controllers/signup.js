const express = require('express')
const router = express.Router()

router.get('/new',function (req, res) {
    res.render('signup/new')
})

module.exports = router;
