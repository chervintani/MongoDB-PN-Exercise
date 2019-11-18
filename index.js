// Configuration part
// ------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3231

// Create express app
const app = express();
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});



// Set up default mongoose connection
let db_url = 'mongodb://127.0.0.1/db_exercise';
mongoose.connect(db_url, { useNewUrlParser: true });
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//
// Let's start the exercise :
//
// During ALL the exercise the requests have to be connected with the database
//
// Context : We want to create a web application to manage a motorcyle Championship. 
// ------------------------------------------------------------

// Import Models
const Rider = require('./models/rider.model');
const Motorcycle = require('./models/motorcycle.model');

// Question 1 - Create a HTTP Request to add a riders in the database :
// When we create a rider he doesn't have a score yet.
app.post('/riders/create', (req, res) => {
    const rider = new Rider({
        firstName: "Chervin",
        lastName: "Tanilon",
        age: "20",
        score: 0
    })

    rider.save((err) => {
        if (err) return res.send({ message: err });
        return res.send({ rider });
    })
})

// Question 2 - Create a HTTP Request to fetch all the riders :
app.get('/riders/retrieve', (req, res) => {
    Rider.find((err, rider) => {
        return res.send(rider);
    })
})

// Question 3 - Create a HTTP Request to fetch one rider :
app.get('/riders/getRider', (req, res) => {
    Rider.find({ firstName: req.body.firstName }, (err, rider) => {
        return res.send(rider);
    })
})

// Question 4 - Create a HTTP Request to update firstName or/and lastName of a rider :
app.get('/riders/update/:id', (req, res) => {
    Rider.findByIdAndUpdate(req.params.id,
        { firstName: "Chills" },
        (err, rider) => {
            if (err) return res.send(err)
            return res.send(rider)
        })
})


// Question 5 - Create a HTTP Request to ADD score of a rider :
app.get('/riders/addScore/:id', (req, res) => {
    Rider.findByIdAndUpdate(req.params.id,
        {
            $inc: { "score.0": 1 }
        },
        (err, rider) => {
            if (err) return res.send(err)
            return res.send(rider)
        })

})

// Question 6 - Create a HTTP Request to delete one rider :
app.post('/riders/delete/:id', (req, res) => {
    console.log(req.params.id)
    Rider.findByIdAndRemove(req.params.id, (err) => {
        if (err) return res.status(404).send({ message: err.message });
        return res.send({ message: 'rider deleted!' });
    });
});

// Question 7 - Create a HTTP Request to create motorcycles :
// For create a motorcycle you will need to create the model first.
app.post('/motor/create', (req, res) => {

    Rider.find({ firstName: req.body.firstName }, (err, rider) => {
        const motor = new Motorcycle({
            manufacturer: "Suzuki",
            displacement: "1000cc",
            weight: 300,
             $push: { riderId: rider.firstName } 
        })
        motor.save((err) => {
            if (err) return res.send({ message: err });
            return res.send({ motor });
        })
        // return res.send(rider);
    })


})

// Question 8 - Create a HTTP Request to fetch all the motorcycles:


// Question 9 - Create a HTTP Request to fetch all the motorcycles associate to one rider:


// BONUS 10 - Create a HTTP Request to to get the riders ranking


//
// End of the exercise
// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});