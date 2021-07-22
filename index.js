const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

const router = require('./routes/routes');

//внедряем json
app.use(express.json());

//внедряем роутер
app.use("/api", router);

//создаём слушатель для порта 8080
app.listen(PORT, () => console.log(`App listen port  + ${PORT}`));