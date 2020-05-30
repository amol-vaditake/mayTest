let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let companySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    product: {
        type: String
    },
    description: {
        type: String,
        default: "Not given"
    },
    owner: {
        type: String,
        default: "Not given"
    },
}, {
    timestamps: true
});

let company = mongoose.model("company", companySchema);

module.exports = company;