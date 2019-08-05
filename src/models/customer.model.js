let mongoose = require('mongoose');

let username = "mon";
let password = "go"

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-om4hd.mongodb.net/test?retryWrites=true&w=majority`);

//object that is getting created
let customerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
});


module.exports = mongoose.model('Customer', customerSchema);