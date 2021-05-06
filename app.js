const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: false, cookie: {secure: false}}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

const indexController = require('./controllers/index.js')
const signupController = require('./controllers/signup.js')
const bookmarksController = require('./controllers/bookmarks.js')
const commentsController = require('./controllers/comments.js')
const tagsController = require('./controllers/tags.js')

function validateSessionId (req, res, next) {
    if (req.session.userId) {
    next()
  } else {
    res.redirect('/')
  }
}

app.use('/', indexController)
app.use('/signup', signupController)
app.use(validateSessionId)
app.use('/bookmarks', bookmarksController)
app.use('/bookmarks/:bookmarkId/comments', commentsController)
app.use('/tags', tagsController)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
