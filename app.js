const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


app.engine('ejs',ejsMate);
app.use(methodOverride('_method'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));


const Employee = require('./models/employee');

mongoose.connect('mongodb://localhost:27017/Employee',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    
});

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("database connected");
})

app.get('/',async(req, res)=>{
    res.render('Home.ejs');
})

app.get('/employee',async(req, res)=>{
    const employees = await Employee.find({})
    res.render('index.ejs', { employees });
})


//GETTING BY SPECIFIC ID
app.get('/employee/:id',async(req, res)=>{
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.render('Details.ejs', { employee })
})

//CREATE A NEW EMPLOYEE DETAILS
const categories = ['SALES','MARKETING','DEVELOPMENT','TECH SUPPORT']
app.get('/new',(req, res)=>{
    res.render('New.ejs',{ categories });
})

app.post('/employee', async(req, res)=>{
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.redirect(`/employee/${newEmployee._id}`);
})

//UPDATING EMPLOYEE DETAILS
app.get("/employee/:id/edit", async(req, res)=>{
    const {id}= req.params;
    const employee = await Employee.findById(id);
    res.render('Edit.ejs',{ employee , categories})
})

app.put('/employee/:id',async(req, res)=>{
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body, {runValidators: true, new: true, useFindAndModify: false});
    res.redirect(`/employee/${employee._id}`);
})

//DELETING EMPLOYEE DETAILS
app.delete('/employee/:id',async(req, res)=>{
    const { id } = req.params;
    const Demployee = await Employee.findByIdAndDelete(id);
    res.redirect('/employee');
})



app.listen(3000,()=>{
    console.log('Server is running');
})