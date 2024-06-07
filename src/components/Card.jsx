import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useToast } from "./ui/use-toast";
import Link from "next/link";
  


export const MessageCard = ({message}) => {
    const messageId = message._id;
    const {toast} = useToast();
    
  return (
    <Card>
        <CardHeader>
            <CardTitle>{message.name}</CardTitle>
            <CardDescription>Address: {message.address_1}</CardDescription>
            <CardDescription>Mobile: {message.phone}</CardDescription>
            <CardDescription>Website: {message.website_url}</CardDescription>
            <CardDescription>State: {message.state}</CardDescription>
            <CardDescription>City: {message.city}</CardDescription>
            
        </CardHeader>
        <Link href={`/brewery/${message.id}`}>
        <CardFooter><button className=" hover:text-gray-400"> Add Review</button></CardFooter>
        </Link>
    </Card>
  )
}
