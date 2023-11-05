const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const mariadb = require('mariadb');
const { type } = require('os');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
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

app.post('/user/login', async (req, res) => {
    const { username, password} = req.body;
    let conn;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query('select id,name,username,password from user where username = ? and password = ?', [username, password])

        const formattedRows = rows.map(row =>{
            return{
                id : Number(row.id),
                name : row.name
            }
        });
        res.status(200).json(formattedRows);
    }catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) {
            conn.release(); // Release the database connection back to the pool
        }
    }
});


app.post('/cart/add/sushi', async(req, res)=>{
    const {uid,sushi_id,amount,status} = req.body;
    let conn;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query("INSERT INTO `sushi`.`amount_item` (`uid`, `sushi_id`, `amount`, `status`) VALUES (?, ?, ?, ?)",[uid,sushi_id,amount,status]) 
        res.status(200).send("insert complete")
    }catch(e){
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }finally {
        if (conn) {
            conn.release(); // Release the database connection back to the pool
        }
    }
});

app.post('/show/cart',async (req,res)=>{
    const uid = req.body;
    let conn;
    try{
        conn = pool.getConnection();
        const rows = await conn.query("SELECT sushi.name,sushi.price,amount_item.amount,amount_item.`status`,(sushi.price*amount_item.amount) AS Total FROM amount_item,user,sushi WHERE amount_item.sushi_id = sushi.id AND user.id = amount_item.uid AND amount_item.uid = ?",[uid])
        
        const formattedRows = rows.map(row =>{
            return{
                "name" : row.name,
                "price" : row.price,
                "amount" : row.amount,
                "status" : row.status,
                "Total" : row.Total
            }
        });
        res.status(200).json(formattedRows);
    }catch(e){
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
http.createServer(app).listen(5000, () => {
    console.log('Express Server started on port 1137');
});
