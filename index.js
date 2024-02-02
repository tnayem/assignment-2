const express = require('express')
const app = express()
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./uploads')
    },
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})
let upload = multer({storage:storage}).single('myfile')

app.get('/', (req, res) => {
    res.end('This is Home Page')
})
app.get('/about', (req, res) => {
    res.end('This is About Page')
})
app.get('/contact', (req, res) => {
    res.end('This is Contact Page')
})
app.get('/file-write', (req, res) => {
    fs.writeFileSync('demo.txt','hello world');
    res.end('File created successfully!');
})

app.post('/',(req,res)=>{
    upload(req,res,(error)=>{
        if(error){
            res.end('File upload failed')
        }
        else{
            res.end('File upload successfull')
        }
    })
})

app.listen(5500, () => {
    console.log("My server is Running");
})