const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const fs = require("fs");
const path = require("path");

let messages = [];
let calculations = [];

app.use(express.json());
app.use(cors());

app.post("/api/messages", (req, res) => {
  fs.readFile(path.join(__dirname, "messages.json"), (err, data) => {
    if (err) {
      return res.status(500).send({ error: "Error reading messages file" });
    }

    let messages = JSON.parse(data);
    messages = Array.isArray(messages) ? messages : [];
    messages.push(req.body);

    fs.writeFile(
      path.join(__dirname, "messages.json"),
      JSON.stringify(messages),
      (err) => {
        if (err) {
          return res
            .status(500)
            .send({ error: "Error writing to messages file" });
        }

        res.send({ message: req.body });
      }
    );
  });
});

app.post("/api/calculations", (req, res) => {
  fs.readFile(path.join(__dirname, "numbers.json"), (err, data) => {
    if (err) {
      return res.status(500).send({ error: "Error reading numbers file" });
    }

    let numbers = JSON.parse(data);
    numbers = Array.isArray(numbers) ? numbers : [];
    let requested = req.body.number;
    let previous = numbers.slice(-1)[0].previous;
    numbers.push({
      previous,
      requested,
      average: (+requested + +previous) / 2,
    });

    fs.writeFile(
      path.join(__dirname, "numbers.json"),
      JSON.stringify(numbers),
      (err) => {
        if (err) {
          return res
            .status(500)
            .send({ error: "Error writing to numbers file" });
        }

        res.send({
          previous,
          requested,
          average: (+requested + +previous) / 2,
        });
      }
    );
  });
});

app.get("/api/history", (req, res) => {
  fs.readFile(path.join(__dirname, "numbers.json"), (err, data) => {
    if (err) {
      return res.status(500).send({ error: "Error reading numbers file" });
    }

    res.send(JSON.parse(data));
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
