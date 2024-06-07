import axios from 'axios';
export async function GET(req){

    const url = req.url
    const regex = /by_(\w+)=([\w-]+)/;
    const match = url.match(regex);
    console.log(match[1], match[2])
    try {
        const {data} = await axios.get(`https://api.openbrewerydb.org/breweries?by_${match[1]}=${match[2]}`);
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