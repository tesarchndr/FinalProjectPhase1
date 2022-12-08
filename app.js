const express = require('express')
const app = express()
const port = 3100
 const router = require('./router/index')
const Controller = require('./controllers/controller')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('./css'))
app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})