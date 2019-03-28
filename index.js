require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express()
const products_controller = require('./products_controller')

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    console.log('db set')
    console.log(db.listTables)
})
.catch(err => console.log(err))

app.get('/api/products', products_controller.getAll)
app.get('/api/products/:id', products_controller.getOne)
app.put('/api/products/:id', products_controller.update)
app.post('/api/products', products_controller.create)
app.delete('/api/products/:id', products_controller.delete)


app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`))