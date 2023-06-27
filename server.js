const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

const uri = "mongodb+srv://yourfavouritegamerproductions:Brown010500@cluster0.zifuqew.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("connected to mongoDB");
    } catch (error) {
        console.log("couldn't connect to mongoDb");
    }

}
connect();

const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const routes = require('./routes/routes');

app.use('/api', routes);
var listener = app.listen(4201, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

