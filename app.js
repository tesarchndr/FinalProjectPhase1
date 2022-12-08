const express = require('express')
const app = express()
const port = 3100
 const router = require('./router/index')
const session = require('express-session')
const Controller = require('./controllers/controller_login')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('./css'))
app.use(express.static('./css/'))
app.use(session({
  secret: 'delta',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite:true
  }
}))
app.use('/', router)
app.get('/register', Controller.get_register)
app.post('/register', Controller.post_register)

app.get('/login', Controller.get_login)
app.post('/login', Controller.post_login)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})