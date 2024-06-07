import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema({
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

let Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;