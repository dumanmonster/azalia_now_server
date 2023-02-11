const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let messages = [];
let calculations = [];

app.use(express.json());

app.post('/api/messages', (req, res) => {
  const { text, author } = req.body;
  const message = { text, author };
  messages.push(message);
  res.status(201).json({ message: 'Message added successfully' });
});

app.post('/api/calculations', (req, res) => {
  const { value } = req.body;
  calculations.push(value);
  const average =
    calculations.reduce((acc, current) => acc + current, 0) / calculations.length;
  res.status(200).json({ average });
});

app.get('/api/history', (req, res) => {
  res.status(200).json({ messages, calculations });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));