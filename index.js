const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({info: 'Biblioteca virtual'})
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})

app.get('/books', db.getBooks)
app.get('/books/:id', db.getBookById)
app.post('/books',db.addBook)