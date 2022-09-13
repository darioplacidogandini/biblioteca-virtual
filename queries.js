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
    pool.query('SELECT * FROM books ORDER BY id ASC ', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addBook = (request, response) => {
    const {name, email} = request.body

    pool.query('INSER INTO users (title, author) VALUES ($1, $2)'), 
    [name, email], (error, results) => {
        if (error) {
            throw error
        }
    }) 
}

module.exports = {
    getBooks,
}