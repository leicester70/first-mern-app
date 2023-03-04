const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const dbo = require("./database/conn");

// Make app use created routes
app.use(require("./routes/user"));

// Establish connection with MongoDB
app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) { console.error(err) };
    });
    console.log(`Server is running on port: ${port}`);
});