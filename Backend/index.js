const express = require('express');
const cors = require('cors');
const app = express();
const DBConnection = require('./config/database.config');

require('dotenv').config();
DBConnection();

const PORT = process.env.PORT;

app.use(cors({
  origin: ['http://localhost:5173']
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/" , (req,res) => {
  res.status(200).send("Welcome to AI Integrated ERP Management System.");
});


app.listen(PORT , ()=> {
  console.log(`Server is started at: http://localhost:${PORT}`);
});

