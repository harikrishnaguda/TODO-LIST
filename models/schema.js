const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
    {
        description : {
            type : String,
            required : true
        },
        category : {
            type : String,
            required : true
        },
        duedate : {
            type : String,
            required : false
        }
        
    }
);
const todoData = mongoose.model('todoData',todoSchema);
module.exports = todoData;