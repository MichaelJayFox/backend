const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Сохранить текст (v1.0)
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

// Прочитать данные из файла (v2.0)
app.get('/read', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.send('File is empty or does not exist');
            }
            return res.status(500).send('Error reading file');
        }
        
        if (!data) {
            return res.send('File is empty');
        }
        
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});