const Employee = require('./models/employee');
const mongoose = require('mongoose');

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

// const p = new Employee({
//     empId: '1',
//     empName:'Arya',
//     age: 20,
//     deptId:'101',
//     dept:'CSE'
// })

// p.save().then(p =>{
//     console.log(p)
// }).catch(e => {
//     console.log(e);
// })

const rootEmployee = [
    {
    empId: '1',
    empName:'Arya',
    age: 20,
    deptId:'101',
    dept:'TECH SUPPORT'
    },
    {
        empId: '2',
        empName:'Sansa',
        age: 20,
        deptId:'102',
        dept:'DEVELOPER'
    },
    {
        empId: '3',
        empName:'Dany',
        age: 23,
        deptId:'131',
        dept:'SALES'
    }
] 

Employee.insertMany(rootEmployee).then(res=> {
    console.log(res)
}).catch(e => {
    console.log(e);
})