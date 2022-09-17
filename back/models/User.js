import mongoose, {Schema} from "mongoose";

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    marks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Mark',
        }
    ]
}, {versionKey: false})

export default mongoose.model('User', User)