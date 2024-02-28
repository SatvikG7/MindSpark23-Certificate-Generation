const express = require("express");
const cors = require("cors");

const connectDB = require("./lib/connectDB");
connectDB();

const findByNumber = require("./utils/findByNumber");

const app = express();
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
    let documentation = {
        "GET /phone/:number": "Get the user details",
    };
    res.json(documentation);
});
app.get("/phone/:number", async (req, res) => {
    let number = req.params.number;
    let data = await findByNumber(number);
    if (data.error) {
        res.status(404);
    } else {
        res.status(200);
    }
    res.json(data);
});
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
