import mongoose, {Schema} from "mongoose";
import { number } from "zod";

const reviewSchema = new Schema({
    rating:{
        type: Number,
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
        type: Schema.Types.String,
        ref:'User',
        required: true
    },
    
}, {timestamps: true});

let Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;