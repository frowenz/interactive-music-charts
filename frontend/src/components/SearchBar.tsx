import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import Dropdown from '@/components/ui/dropdown'; // Adjust the import path as necessary
import { Cross1Icon } from '@radix-ui/react-icons/';
import axios from 'axios';

export default function AlbumSearchBar() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInputempty, setIsInputEmpty] = useState(true);

  useEffect(() => {
    let cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/spotifySearch?q=${query}`, {
          cancelToken: cancelTokenSource.token,
        });
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          // console.log('Request canceled', err.message);
        } else {
          setError('Failed to fetch data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    } else {
      setData(null);
    }

    return () => {
      // Cancel the previous request before making a new request
      cancelTokenSource.cancel('Operation canceled by the user.');
    };
  }, [query]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const handleSearchChange = (e) => {
    const newQuery = e.currentTarget.value;
    setQuery(newQuery);
    setIsInputEmpty(newQuery === '');
  };

  const handleDropdownChange = (e: Event) => {
    console.log(`Selected album ID is ${e.target.value}`);
  };

  return (
    <div>
      <Input
        type="text" // 'query' is not a valid input type
        placeholder="Search for an album"
        value={query}
        onChange={handleSearchChange}
      />
      {!isInputempty && (
        <Cross1Icon
          className="absolute top-2 right-2 w-16 h-16 px-3"
          onClick={() => {
            setQuery('');
            setIsInputEmpty(true);
          }}
        />
      )}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <Dropdown
            data={data.albums.items}
            setQuery={setQuery}
            onChange={handleDropdownChange}
          />
        </div>
      )}
    </div>
  );
}
