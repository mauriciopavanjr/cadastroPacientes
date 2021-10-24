const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"challenge"
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res)=> {
    const {name} = req.body;
    const {birth} = req.body;
    const {email} = req.body;
    const {address} = req.body;

    let SQL = "INSERT INTO patientregister (name, birth, email, address) VALUES (?,?,?,?)"
    db.query(SQL, [name, birth, email, address], (erro, result) =>{
        console.log(erro);
    });
});

app.get("/getCards", (req, res) => {
    let SQL = "SELECT * FROM patientregister";
    db.query(SQL, (erro, result)=>{
        if (erro) console.log(erro)
        else res.send(result);
    })
});

app.put("/edit", (req, res)=>{
    const {id} = req.body;
    const {name} = req.body;
    const {birth} = req.body;
    const {email} = req.body;
    const {address} = req.body;

    let SQL = "UPDATE patientregister SET name = ?, birth = ?, email = ?, address = ? WHERE id = ?"
    
    db.query(SQL, [name, birth, email, address, id],(erro, result) => {
        if(erro) console.log(erro);
        else res.send(result);
    })
});

app.delete("/delete/:id", (req, res) =>{
    const {id} = req.params;
    let SQL = "DELETE FROM patientregister WHERE id = ?"

    db.query(SQL, [id], (erro, result) =>{
        if(erro) console.log(erro);
        else res.send(result);
    });    
});

app.listen(3001, ()=> {
    console.log("rodando servidor");
})