const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Meghu@123',
    database: 'sbi_bank'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// API to save transaction
app.post('/api/transactions', (req, res) => {
    const tx = req.body;

    const sql = `
        INSERT INTO transactions 
        (id, amount, type, direction, partyDisplay, time, isLoanRepay,
         clearedThisTx, totalCleared, remainingLoan, hash)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        tx.id,
        tx.amount,
        tx.type,
        tx.direction,
        tx.partyDisplay,
        tx.time,
        tx.isLoanRepay,
        tx.clearedThisTx,
        tx.totalCleared,
        tx.remainingLoan,
        tx.hash
    ], (err, result) => {
        if (err) {
            console.error('Insert failed:', err);
            return res.status(500).json({ error: 'Database insert failed' });
        }
        res.json({ message: 'Transaction saved successfully' });
    });
});

// API to fetch all transactions
app.get('/api/transactions', (req, res) => {
    db.query('SELECT * FROM transactions ORDER BY created_at DESC',
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Fetch failed' });
            }
            res.json(results);
        });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
