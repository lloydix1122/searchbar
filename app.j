const express = require("express");
const mysql = require("mysql");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();

app.get("/",(req,res)=>{ res.send("hello world");});

app.listen(port);
