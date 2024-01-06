const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/updateAccount', async (req, res) => {
    const { srcIban, iban, amount } = req.body;

    console.log('Received request:', req.body);

    if (!iban || !amount || !srcIban) {
        return res.status(400).json({ error: 'srcIban, iban, and amount are required in the request body' });
    }

    try {
        const [result1] = await db.execute('UPDATE users SET checking_account_balance = checking_account_balance + ? WHERE checking_account_iban = ?', [amount, iban]);
        
        const [result2] = await db.execute('UPDATE users SET checking_account_balance = checking_account_balance - ? WHERE checking_account_iban = ?', [amount, srcIban]);

        if (result1.affectedRows > 0 && result2.affectedRows > 0) {
            res.json({ message: 'werkt' });
        } else {
            res.json({ message: 'niet geupdate' });
        }
    } catch (error) {
        console.error('Error executing update query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/updateTransaction', async (req, res) => {
    const { srcIban, iban, amount, userName, user_Id } = req.body;

    console.log('Received request:', req.body);

    if (!iban || !amount || !srcIban || !userName) {
        return res.status(400).json({ error: 'srcIban, iban, and amount are required in the request body' });
    }

    try {
        const [result] = await db.execute('INSERT INTO TransactionHistory (userID, amount, destinantName, destinantIBAN) VALUES (?,?,?,?)', [user_Id, amount, userName, iban]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Account updated successfully' });
        } else {
            res.json({ message: 'Account was not updated' });
        }
    } catch (error) {
        console.error('Error executing update query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/Transactions', async (req, res) => {
    const { user_Id } = req.query;

    try {
        const [rows] = await db.execute('SELECT * FROM TransactionHistory WHERE userID = ?', [user_Id]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
