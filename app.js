const express = require("express");
const cors = require("cors");
const logRoutes = require("./routes/main");
require("dotenv").config();

const app = express();
const PORT = process.env.PG_PORT;

app.use(cors());
app.use(express.json());

app.use("/api", logRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});