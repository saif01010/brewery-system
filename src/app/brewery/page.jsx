'use client'
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const [searchType, setSearchType] = useState('city');
  const [query, setQuery] = useState('');
  const [breweries, setBreweries] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get('/api/search', {
      params: { by: searchType, query },
    });
    setBreweries(response.data);
  };

  return ( 
    <div>
      <form onSubmit={handleSearch}>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="city">City</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
        <input
          type="text"
          placeholder="Search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {breweries.length > 0 && (
        <ul>
          {breweries.map((brewery) => (
            <li key={brewery.id}>
              <Link href={`/brewery/${brewery.id}`}>
                <a>{brewery.name}</a>
              </Link>
              <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
              <p>Phone: {brewery.phone}</p>
              <a href={brewery.website_url}>Website</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
