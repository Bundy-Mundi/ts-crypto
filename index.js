const express = require('express');
const Blockchain = require('./blockchain');
const bodyParser = require("body-parser");

const PORT = 3000;
const app = express();
const blockchian = new Blockchain();

app.use(bodyParser.json());

app.get("/api/blocks", (req, res) => {
    res.json(blockchian.chain);
});

app.post("/api/mine", (req, res) => {
    const { data } = req.body;
    blockchian.addBlock({ data });

    res.redirect("/api/blocks");
});



app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`))