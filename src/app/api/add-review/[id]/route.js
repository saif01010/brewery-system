import Review from "@/models/review";
import connectDB from "@/db/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/option";
import mongoose from "mongoose";

export async function POST(req,ids) {
    await connectDB();
    const breweryId = ids.params.id;

    console.log(breweryId)
    const {rating,description} = await req.json();
    console.log(rating,description)
    const session = await getServerSession(authOptions)
    console.log(session);
    const user = session?.user;
    if(!user){
        return Response.json({success:false,message:'User not found'},{status:400})
    }
    const username = user.fullName;
    try {
        const numRating = parseInt(rating)
        const review = new Review({
            breweryId:breweryId,
            user:username,
            rating:numRating,
            description
        });
        await review.save();
        return Response.json({success:true,review},{status:200})
        
    } catch (error) {
        console.log(error)
        return Response.json({success:false,message:error.message},{status:400})
    }
}