const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const mariadb = require('mariadb');
const { type } = require('os');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '418825',
    database: 'sushi', // Replace 'your_database_name' with your actual database name
    connectionLimit: 5
});
app.get('/sushi', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT sushi.price, sushi.id AS sushi_id, type.type, sushi.image, sushi.name FROM sushi.sushi INNER JOIN type ON sushi.type_id = type.id;');
        
        // Convert BigInt values to regular numbers
        const formattedRows = rows.map(row => {
            return {
                id: Number(row.sushi_id), // Use sushi_id alias
                type: row.type,
                image: row.image,
                name: row.name,
                price: row.price
            };
        });

        // Send the response as JSON
        res.status(200).json(formattedRows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) {
            conn.release(); // Release the database connection back to the pool
        }
    }
});



http.createServer(app).listen(1137, () => {
    console.log('Express Server started on port 1137');
});
