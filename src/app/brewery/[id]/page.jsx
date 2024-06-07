'use client'
import { useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

async function breweryById(id) {
  const url = `https://api.openbrewerydb.org/v1/breweries?by_ids=${id}`;
  console.log(url)
  try{
      const response = await axios.get(url);
      return response.data;
  }catch (e) {
      return {error: e.message}
  }
}


const Brewery = () => {
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  const { data: session } = useSession();
  const params = useParams();
  const  id  = params.id;
  console.log(id)

const brewery =  breweryById(id).then((data) => data[0]);
// console.log(brewery.then((data) => console.log(data)))
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('You need to be logged in to post a review.');
      return;
    }

    const response = await axios.post(`/api/add-review/${id}`, {
      rating,
      description,
      userId: session.user.id,
    });

    setReviews([...reviews, response.data]);
  };

  return (
    <div>
      <h2>{brewery.name}</h2>
      <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
      <p>Phone: {brewery.phone}</p>
      <a href={brewery.website_url}>Website</a>

      {/* <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <strong>{review.user.username}:</strong> {review.rating}/5<br />
            {review.description}
          </li>
        ))}
      </ul> */}

      {session ? (
        <form onSubmit={handleReviewSubmit}>
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button type="submit">Submit Review</button>
        </form>
      ) : (
        <p>Please log in to post a review.</p>
      )}
    </div>
  );
};



export default Brewery;