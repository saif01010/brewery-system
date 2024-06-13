'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageCard } from '@/components/Card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [searchType, setSearchType] = useState('city');
  const [query, setQuery] = useState('');
  const [breweries, setBreweries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_${searchType}=${query}`);
      if (response.data.length === 0) {
        toast({
          title: 'No data found',
          description: `Could not find any ${searchType} ${query}`,
          variant: 'destructive'
        });
      } else {
        setBreweries(response.data);
        
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong maybe Api is not working',
        variant: 'destructive'
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="relative lg:mx-auto p-6 bg-white rounded w-full">
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
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>
      <div className=" w-full mt-20 grid grid-cols-1 md:grid-cols-1 gap-10">
      {breweries.length > 0 && (<p className=" text-gray-400">Found total {breweries.length} results</p>)}
        {breweries.length > 0 ? (
          breweries.map((brewery) => (
            <MessageCard key={brewery.id} message={brewery} />
          ))
        ) : (

          <div className='!mt-0'>Search Brewery By Name, City, Types and State</div>
        )}
      </div>
    </div>
  );
};

export default Home;