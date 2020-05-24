const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const router = require('./router/router.js')

app.use(bodyParser.urlencoded({ extended: false, limit: '20000kb'}))
app.use(bodyParser.json({"limit": "20000kb"}))

app.use(express.static('che'))


app.use(express.static('upVideo'))

app.use(router)




app.listen(6060, function(){
    console.log('server is running at 6060...')
})