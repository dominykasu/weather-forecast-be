const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("logModel", logSchema);