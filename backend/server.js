const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const allUsers = require("./routes/allUsers");

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/allUsers", allUsers);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is runnning on the port ${PORT}`)
});