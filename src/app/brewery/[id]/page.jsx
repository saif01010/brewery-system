'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ReviewCard } from '@/components/ReviewCard'; // Ensure this is correctly imported
import { RatingCard } from '@/components/Rating';
import ReactStars from 'react-stars';



async function breweryById(id) {
  const url = `https://api.openbrewerydb.org/v1/breweries?by_ids=${id}`;
  try {
    const response = await axios.get(url);
    return response.data[0];
    } catch (e) {
      throw new Error(e.message);
      }
      }

      
const Brewery = () => {
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
  useEffect(() => {
    async function fetchBreweryData() {
      try {
        const data = await breweryById(id);
        setBrewery(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }

    fetchBreweryData();
  }, [id]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(`/api/reviews/${id}`);
        setReviews(response.data.data);
      } catch (e) {
        console.error('Failed to fetch reviews', e);
      }
    }

    fetchReviews();
  }, [id]);

  const avgRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2);
  const lenght1 = reviews.length
  // console.log(avgRating)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post(`/api/add-review/${id}`, {
        rating,
        description
      });

      setReviews([ response.data,...reviews]);
    } catch (e) {
      console.error('Failed to submit review', e);
    }
  };

  if (loading) { return <div>Loading...</div>; }


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {brewery && (
        <div className="w-full">
          <RatingCard key={brewery.id} message={brewery} totalRating= {avgRating} totalReview = {lenght1} className="w-full" />
        </div>
      )}
      <h1 className="text-2xl font-bold text-center">Add your Review</h1>
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg mt-8">
        
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              {/* <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select> */}
              <ReactStars
                count={5}
                size={24}
                color2={'#ffd700'}
                value={rating}
                onChange={setRating}
                half={false}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Review
            </button>
          </form>
        
      </div>
      <h1 className="text-2xl font-bold text-center">Reviews</h1>
      <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        { !loading && reviews.length > 0 ? (
         <div>
         { reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
         </div>
        ) : (
          <div>No reviews yet.</div>
        )}
      </div>
      
    </div>
  );
};

export default Brewery;
