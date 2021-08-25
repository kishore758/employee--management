const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    empId:{
        type: String,
        required: true
    },
    empName:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required:true,
        min: 18
    },
    deptId:{
        type: String,
        required: true
    },
    dept:{
        type: String,
        lowercase: true,
        categories: ['SALES','MARKETING','DEVELOPMENT','TECH SUPPORT']
    } 

});

module.exports = mongoose.model('Employee', employeeSchema);