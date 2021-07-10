const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

const router = require('./routes/routes');

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log("App listen port " + PORT));