import connectDB from "@/db/db";
import Review from "@/models/review";


export async function GET (req, id){
   await connectDB();
   const breweryId = id.params.id
   try {
    const brewery = await Review.aggregate([
        {$match:{
            breweryId:breweryId
        }},
        {$group:{
            '_id': '$breweryId',
            'totalRating': {$avg:'$rating'}
        }},
        {$project:{
            breweryId:1,
            totalRating:1,
        }}
    ])
    if(brewery.length<=0){
        return Response.json({message:'could not get total rating'},{status:401})
    }
    return Response.json({message:'Total Rating fatched successfully',data:brewery},{status:201})
   } catch (error) {
    console.log('Somthing went wrong in Totalrating ',error)
    return Response.json({message:'Went wrong in total rating'},{status:401})
   }
}