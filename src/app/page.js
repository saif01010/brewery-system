'use client'
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MessageCard } from '@/components/Card';

const Home = () => {
  const [searchType, setSearchType] = useState('city');
  const [query, setQuery] = useState('');
  const [breweries, setBreweries] = useState([]);

  

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_${searchType}=${query}`);
    setBreweries(response.data);
  };

  return ( 
    <div className='my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl'>
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
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      {breweries.length > 0 && (
        <div>
          {breweries.map((brewery) => (
            <MessageCard key={brewery.id} message={brewery} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;
