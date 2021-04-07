const express = require('express');
const Blockchain = require('./blockchain');

const PORT = 3000;
const app = express();
const blockchian = new Blockchain();

app.get("/api/blocks", (req, res) => {
    res.json(blockchian.chain);
});

app.listen(PORT, () => console.log(`Listening to: http://localhost:${PORT}`))