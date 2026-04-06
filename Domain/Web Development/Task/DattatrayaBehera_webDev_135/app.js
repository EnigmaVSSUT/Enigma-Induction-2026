const express=require('express')
const path=require('path')
const app=express()

app.use(express.static('./public'))


app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/index.html'))
})

app.use((req,res)=>{
    res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(5000,()=>{
    console.log('server 5000');
})