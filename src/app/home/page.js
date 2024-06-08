'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MessageCard } from '@/components/Card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const Home = () => {
  const [searchType, setSearchType] = useState('city');
  const [query, setQuery] = useState('');
  const [breweries, setBreweries] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const {toast} = useToast();
  if (!session) {
    router.push('/sign-in');
    return;
  }
 useEffect

  

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_${searchType}=${query}`);
    if ( response.data.length === 0) {
      toast({
        title: 'No data found',
        description: 'Search Again',
        variant: 'destructive'
      })
    }
    setBreweries(response.data);
  };

   
  return ( 
    <div className="relative  lg:mx-auto p-6 bg-white rounded w-full ">
  <div className="absolute top-0 right-0 bg-white p-6 rounded shadow-lg">
    <form onSubmit={handleSearch} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="city">City</option>
        <option value="name">Name</option>
        <option value="type">Type</option>
        <option value="state">State</option>
      </select>
      <input
        type="text"
        placeholder="Search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  </div>
  <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-10">
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
