const express = require('express')
const app = express()
const port = 3100

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('./css/'))

app.get('/', (req, res) => { res.render('home')})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})