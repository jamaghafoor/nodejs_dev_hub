const mongoose = require("mongoose");

const ConatctSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required."]
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Contact", ConatctSchema)