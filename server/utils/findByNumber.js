const geniusJuniors = require("../models/geniusJuniors");

const findByNumber = async (number) => {
    console.log(number);
    console.log(typeof number);
    let data = await geniusJuniors.findOne({ Number: number });
    console.log(data);
    if (!data) {
        return { error: "No data found" };
    } else {
        return data;
    }
};

module.exports = findByNumber;
