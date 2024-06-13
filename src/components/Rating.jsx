import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

  


export const RatingCard = ({message,totalRating,totalReview }) => {
  isNaN(totalRating)? totalRating = 0: totalRating = totalRating 
  console.log(totalRating)
  return (
    <Card>
        <CardHeader>
         
            <CardTitle>{message.name}</CardTitle>
            <CardDescription>Address: {message.address_1}</CardDescription>
            <CardDescription>Mobile: {message.phone}</CardDescription>
            <CardDescription>Website:<Link className=" text-blue-500 hover:text-sky-500" href={`${message.website_url}` } target="_blank">{message.website_url}</Link></CardDescription>
            <CardDescription>State: {message.state}</CardDescription>
            <CardDescription>City: {message.city}</CardDescription>
            <CardDescription>Rating: {totalRating} ({totalReview})</CardDescription>
        </CardHeader>
        <Link href={`/brewery/${message.id}`} >
        <CardFooter><button className=" hover:text-gray-400"> Add Review</button></CardFooter>
        </Link>
    </Card>
  )
}
