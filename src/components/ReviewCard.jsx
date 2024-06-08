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
import { useRouter } from "next/navigation";
  


export const ReviewCard = ({review}) => {
    const {toast} = useToast();
    console.log(review)
    
  return (
    <Card>
        <CardHeader>
            <CardTitle>{review.user}</CardTitle>
            <CardDescription>City: {review.description}</CardDescription>
            <CardDescription>Rating: {review.rating}</CardDescription>
        </CardHeader>
        
    </Card>
  )
}
