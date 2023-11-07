const { render } = require('ejs');
const express = require('express');
const mongoose = require('./config/mongooseconnection');
const url = require('url');
const todoData = require('./models/schema');
const path = require('path');
const PORT = 557;
const app = express();
app.set('view engine', 'ejs')
app.use(express.urlencoded());
app.set('views', path.join(__dirname, 'views'))
app.get('/', function(req, res) {
    res.send('<h1>Hello</h1>');
})
app.get('/todolist', function(req, res) {
    const sc = todoData.find({}).exec();
    sc.then(data =>{res.render('power',{tasks : data});})
    .catch(err=>{console.log("error in fetching Tasks : ",err)});
})
app.get('/delete/', function(req, res) {
    let id = req.query.id;
    todoData.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('back');
    })
    .catch((err)=>{
        console.log("Error in deleting Object from the db : ",err);
    });
});
app.post('/data', function(req, res) {
    const todotasks = new Promise((resolve, reject)=>{
        todoData.create({
            description: req.body.description,
            category: req.body.category,
            duedate: req.body.duedate,
        })
        .then((newdata)=>{
            console.log("***********",newdata);
            resolve(newdata);
        })
        .catch(err=>{
            console.log("Error in creating data");
            reject(err);
        })
    });
    todotasks.then(data=>{
        res.redirect('back');
    })
    .catch(err=>{
        console.log("Error in creation");
    });
});
app.listen(PORT, function(err) {
    if (err) {
        console.log('oops!');
        return;
    }
    console.log('server running on the port', PORT);
})