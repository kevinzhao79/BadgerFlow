/* proxy-server.js */

import express from 'express'
import axios from 'axios'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool({
user: process.env.DB_USER || 'kevinzhao79',
host: process.env.DB_HOST || 'localhost',
database: process.env.DB_NAME || 'BadgerFlow',
password: process.env.DB_PASSWORD || 'Synchronize79.',
port: process.env.DB_PORT || 5432,
})

const app = express()
const port = 3000

app.use(express.json())

/* Bypass CORS policies for pre-flight and POST request for EMS Cloud data */
app.use((_, res, next) => {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    next()

})

app.options('/events', (_, res) => {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    res.sendStatus(204)

})

/**
 * Tests if the app is linked to postgres
 */
async function printAccounts() {

    const resp = await pool.query('SELECT * FROM Accounts')
    // console.log('Response:', resp)
    console.log(resp.rows)

}

/**
* Attempts to register user into the database with the given username and password
* @param {string} username the username to be registered
* @param {string} password the password associated with the username, encrypted using bcrypt
* @returns {Object} a JSON-serialized response detailing if the register action was successful or not
*/
app.post('/register', async (req, res) => {

    const { username, password } = req.body
    const query = `INSERT INTO Accounts (username, password, pins) VALUES ('${username}', '${password}', '{}');`

    try {
        const resp = await pool.query(query)
        await printAccounts()
        res.status(200).send({msg : 'You have successfully registered and logged in!'})
        localStorage.setItem('loggedIn', true)
        localStorage.setItem('account', username)
    }

    catch (error) {
        console.log(error)
        if (error.detail.includes('already exists')) {
            res.status(409).send({msg : 'This username is taken already! Maybe you registered already?'})
        }
        else {
            res.status(400).send({msg : error})
        }
    }
})

/**
* Attempts to fetch the user's credentials using the username and password given
* @param {string} username the user's username
* @param {string} password the password associated with the username
* @returns {Object} a JSON-serialized response detailing if the login action was successful or not
*/
app.post('/login', async (req, res) => {

    const { username, password } = req.body
    const query = `SELECT * FROM Accounts WHERE username = '${username}' AND password = '${password}';`

    try {
        const resp = await pool.query(query)
        const rows = resp.rows

        if (rows.length === 0) {
            res.status(403).send({msg : 'Your username or password is incorrect.'})
        }

        res.status(200).send({msg : 'You have logged in!'})
    }
    catch (error) {
        console.log(error)
        res.status(400).send({msg : error})
    }



})

/* EMS Cloud Data request */
app.post('/events', async (req, res) => {
    try {

        const response = await axios.post(
        'https://uwmadison.emscloudservice.com/web/AnonymousServersApi.aspx/BrowseEvents',
        req.body, 
        req.headers
        )

        res.status(200).json(response.data)

    } 
    catch (error) {

        console.error('Error fetching data:', error.message);

        res.status(error.response?.status || 500).json({
        message: 'Error fetching data',
        details: error.message,
        })

    }
})

// await printAccounts()
/* Start proxy server */
app.listen(port, () => console.log(`Proxy server started on http://localhost:${port}`))