const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')

const app = express()

const router = require('./router/router.js')

app.use(bodyParser.urlencoded({ extended: false, limit: 1024*600 +'kb'}))
app.use(bodyParser.json({"limit": 1024*600 + 'kb'}))


// app.use(express.static('upVideo'))
app.use(express.static(path.join(__dirname, 'upVideo')))

app.use(router)




app.listen(7071, function(){
    console.log('server is running at 7071...')
})