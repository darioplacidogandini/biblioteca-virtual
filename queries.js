const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'library',
    password: 'password',
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

module.exports = {
    getBooks,
}