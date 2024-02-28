// create model for geniusJunior

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const geniusJuniorSchema = new Schema({
    Name: String,
    Number: String,
    Standard: String,
});

const geniusJuniors = mongoose.model("geniusJuniors", geniusJuniorSchema);

module.exports = geniusJuniors;
