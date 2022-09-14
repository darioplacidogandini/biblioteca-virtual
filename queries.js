const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'library',
    password: 'admin',
    port: 5432,
})

const getBooks = (request,response) => {
    pool.query('SELECT * FROM books ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getBookById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addBook = (request, response) => {
    const {title, author} = request.body

    pool.query('INSERT INTO users (title, author) VALUES ($1, $2) rRETURNING *', 
    [title, author], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Book added with ID: ${results.rows[0].id}`)
    }) 
}

const updateBook = (request, response) => {
    const id = parseInt(request.params.id)
    const {title, author} = request.body

    pool.query('UPDATE books SET title = $1, author = $2 WHERE id = $3',
    [title, author, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Book modified with ID: ${id}`)
    })
}

module.exports = {
    getBooks,
    getBookById,
    addBook,
    updateBook,
}