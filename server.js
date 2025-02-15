const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    let logMessage = new Date().toISOString() + " - IP: " + req.ip + "\n";
    fs.appendFileSync("visits.log", logMessage);
    next();
});

app.use(express.static("public"));

app.get("/logs", (req, res) => {
    let logs = fs.existsSync("visits.log") ? fs.readFileSync("visits.log", "utf8") : "No logs found";
    res.send("<pre>" + logs + "</pre>");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
