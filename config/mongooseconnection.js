const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/TODO');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'Error in Connection'));
db.once('open',function(){
    console.log("Database connection is Successful");
});

