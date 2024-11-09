const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String, // Storing the path of the photo
    },
    tableData: {
        type: [[String]], // Array of arrays to represent a 6x8 table
        default: Array.from({length: 6}, () => Array(8).fill("")), // Default to empty 6x8 grid
    },
    position: {
        type: String, // Storing the path of the photo
    },
    qualification: {
        type: String, // Storing the path of the photo
    },
});

module.exports = Contact = mongoose.model("contact", ContactSchema);
