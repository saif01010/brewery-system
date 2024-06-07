import mongoose, {Schema} from "mongoose";

const userShcema = new Schema({
    rating:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    breweryId:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    
}, {timestamps: true});

let User = mongoose.models.User || mongoose.model('User', userShcema);

export default User;