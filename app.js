const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const methodOverride = require('method-override')
var expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded({ extended: true }))
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: false, cookie: {secure: false, maxAge: 600000}}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(expressLayouts);

function validateSessionId (req, res, next) {
  if (req.session.userId) {
  next()
} else {
  res.redirect('/')
}
}

app.use((req,res,next) => {
  res.locals.userId = req.session.userId
  next()
})

const indexController = require('./controllers/index.js')
const signupController = require('./controllers/signup.js')
const bookmarksController = require('./controllers/bookmarks.js')
const commentsController = require('./controllers/comments.js')
const tagsController = require('./controllers/tags.js')
const signinController = require('./controllers/signin.js')

app.use('/', indexController)
app.use('/signup', signupController)
app.use('/signin', signinController)
app.use('/bookmarks',validateSessionId, bookmarksController)
app.use('/bookmarks/:bookmarkId/comments',validateSessionId, commentsController)
app.use('/tags',validateSessionId, tagsController)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
