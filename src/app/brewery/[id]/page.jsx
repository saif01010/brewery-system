'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MessageCard } from '@/components/Card';
import { ReviewCard } from '@/components/ReviewCard'; // Ensure this is correctly imported

async function breweryById(id) {
  const url = `https://api.openbrewerydb.org/v1/breweries?by_ids=${id}`;
  try {
    const response = await axios.get(url);
    return response.data[0]; // Assuming the API returns an array of breweries
  } catch (e) {
    throw new Error(e.message);
  }
}

const Brewery = () => {
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
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

    async function fetchReviews() {
      try {
        const response = await axios.get(`/api/reviews/${id}`);
        setReviews(response.data.data);
        
      } catch (e) {
        console.error('Failed to fetch reviews', e);
      }
    }

    fetchBreweryData();
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('You need to be logged in to post a review.');
      return;
    }

    try {
      const response = await axios.post(`/api/add-review/${id}`, {
        rating,
        description,
        userId: session.user.id,
      });

      setReviews([...reviews, response.data]);
    } catch (e) {
      console.error('Failed to submit review', e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log(reviews)
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {brewery && (
        <div className="w-full">
          <MessageCard key={brewery.id} message={brewery} className="w-full" />
        </div>
      )}

      <h1 className="text-2xl font-bold text-center">Reviews</h1>
      <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        ) : (
          <div>No reviews yet.</div>
        )}
      </div>
      <h1 className="text-2xl font-bold text-center">Add your Review</h1>
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg mt-8">
        {session ? (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
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
        ) : (
          <div className="text-center">
            <p className="mb-4">Please log in to post a review.</p>
            <Link href="/sign-in" className="text-blue-500 hover:underline">Log in</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brewery;
