import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

  


export const MessageCard = ({message }) => {
 
    
  return (
    <Card>
        <CardHeader>
         
            <CardTitle>{message.name}</CardTitle>
            <CardDescription>Address: {message.address_1}</CardDescription>
            <CardDescription>Mobile: {message.phone}</CardDescription>
            {message.website_url?(
            <CardDescription>Website:<Link className=" text-blue-500 hover:text-sky-500" href={`${message.website_url}` } target="_blank">{message.website_url}</Link></CardDescription>):<CardDescription>Website Not Available</CardDescription>}
            <CardDescription>State: {message.state}</CardDescription>
            <CardDescription>City: {message.city}</CardDescription>
            
        </CardHeader>
        <Link href={`/brewery/${message.id}`} >
        <CardFooter><button className=" hover:text-gray-400"> Add Review</button></CardFooter>
        </Link>
    </Card>
  )
}
