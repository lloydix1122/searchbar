const express = require("express");
const mysql = require("mysql");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 4000;
const app = express();
const db = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'shopping',
});

app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({'extended':true}));
app.use(express.json());

app.get("/itemlist",(req,res)=>{
	let sql = "SELECT * FROM `ingredient`"
	db.query(sql,(err,results,fields)=>{
		if(err) res.status(500).json(err);
		res.status(200).json(results);
	});
});

app.post("/additem",(req,res)=>{
	let keys = Object.keys(req.body);
	let values = Object.values(req.body);
	let flds = keys.join("`,`")
	let sql = "INSERT INTO `ingredient`(`"+flds+"`) VALUES(?)";
	console.log(sql);
	db.query(sql,[values],(err,results,fields)=>{
		if(err) res.status(500).json(err);
		res.redirect("/");
	}); 
});



app.get("/",(req,res)=>{ res.render("index.html");});

app.listen(port,()=>{ console.log(`listening from port ${port}`);});
