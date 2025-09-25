const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/save', (req, res) => {
    const text = req.body.text;
    
    if (!text) {
        return res.status(400).send('Text is required');
    }

    const data = `${text}\n`;
    
    fs.appendFile('data.txt', data, (err) => {
        if (err) {
            return res.status(500).send('Error saving data');
        }
        res.send('Сохранено');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});