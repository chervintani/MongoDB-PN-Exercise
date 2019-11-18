const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Rider model
let RiderSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: String, required: true},
    score: {type: [Number], required: false},
});

// Export the Rider model
module.exports = mongoose.model('Rider', RiderSchema);
