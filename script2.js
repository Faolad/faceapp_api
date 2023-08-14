const lNum = 345;

module.exports ={
    lNum: lNum
} 


app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.get('/', (req,res)=>{
    console.log(req.query)
    res.send('success')
})
