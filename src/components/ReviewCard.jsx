import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

  


export const ReviewCard = ({review}) => {
    // const {toast} = useToast();
    // console.log(review)
    
  return (
    
    <Card>
        <CardHeader>
            <CardTitle>{review.user}</CardTitle>
            <CardDescription>{review.description}</CardDescription>
            <CardDescription>Rating: {review.rating}</CardDescription>
        </CardHeader>
        
    </Card>
    
  )
}
