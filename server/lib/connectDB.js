const mongoose = require("mongoose");

const db =
    "mongodb+srv://mindspark:mindspark@cluster0.jtgt9ph.mongodb.net/geniusJunior";
const connectDB = async () => {
    mongoose
        .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("We got the MongoDB.");
        })
        .catch((err) => {
            console.log(err);
        });
};
module.exports = connectDB;
