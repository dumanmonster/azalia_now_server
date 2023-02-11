const express = require('express');
const app = express();
const cors = require('cors')
// an array to store the messages
let messages = [{
  author: 'John Doe',
  text: 'Hello, this is a message',
  date: new Date().toLocaleString()
}];

// an array to store the numbers and their average
let numbers = [];
let avg = 0;

app.use(cors());
// endpoint 1: POST to add new messages
app.post('/api/add-message', (req, res) => {
  const { author, text } = req.body;
  messages.push({
    author,
    text,
    date: new Date().toLocaleString()
  });
  res.send({ message: 'Message added successfully' });
});

// endpoint 2: POST to receive messages between them and memorable dates in response
app.post('/api/get-messages', (req, res) => {
  res.send({ messages });
});

// endpoint 3: GET to get information about all previous numbers and calculations
app.get('/api/get-numbers', (req, res) => {
  res.send({ numbers, avg });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});