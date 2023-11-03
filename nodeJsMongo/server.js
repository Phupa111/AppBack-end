const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '418825',
    connectionLimit: 5
});
app.get('/sushi', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT `price`, `id`, `type_id`, `image`, `name` FROM `sushi`.`sushi`;');
        
        // Convert BigInt values to regular numbers
        const formattedRows = rows.map(row => {
            return {
                id: Number(row.id),
                type_id: Number(row.type_id),
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
});;

http.createServer(app).listen(1137, () => {
    console.log('Express Server started on port 1137');
});
