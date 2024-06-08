import connectDB from "@/db/db";
import Review from "@/models/review";


export async function GET(req,id){
    const breweryId = id.params.id;
    console.log(breweryId)
    await connectDB();
    try {
        const breweries = await Review.find({breweryId})
        // console.log(breweries)
        if(!breweries){
            return Response.json({message:'Could not fetched all breweries'},{status:401})
        }
        return Response.json({message:'Successfully fetched all breweries',data:breweries},{status:201})
    } catch (error) {
        console.log('Error while fetching data',error)
        return Response.json({message:'could not get total brewery'},{status:401})
    }
}