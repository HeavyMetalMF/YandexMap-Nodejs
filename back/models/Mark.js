import mongoose from "mongoose";

const Mark = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, {versionKey: false})


export default mongoose.model('Mark', Mark)