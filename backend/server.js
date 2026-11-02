const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// ADD TODO
app.post('/add-item', async (req, res) => {
    try {
        const { text } = req.body;

        const result = await pool.query(
            'INSERT INTO todos (text) VALUES ($1) RETURNING *',
            [text]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

// GET ALL TODOS
app.get('/todos', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM todos ORDER BY id DESC'
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});