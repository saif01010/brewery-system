import axios from 'axios';
export async function GET(req){

    const {by , query} = req.query||{}
    console.log(by, query)

    try {
        const {data} = await axios.get(`https://api.openbrewerydb.org/breweries?by_${by}=${query}`);
        return Response.json( {
            status: 200,
            data: data
        })
    } catch (error) {
        console.log("Error in Search", error)
        return {
            status: 500,
            body: {error:error.message}
        }
    }
}