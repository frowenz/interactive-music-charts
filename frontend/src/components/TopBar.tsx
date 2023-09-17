import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { BigButton } from '@/components/BigButton';
import Dropdown from '@/components/ui/dropdown'; // Adjust the import path as necessary
import { Cross1Icon } from '@radix-ui/react-icons/';
import axios from 'axios';

export default function TopBar({
  onAddHeading,
  isDragging,
  handleDeleteItem,
  draggingIndex,
  setIsDragging,
  clearAll,
}) {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInputempty, setIsInputEmpty] = useState(true);

  const dumbTestfunction = () => {
    console.log('dumb test function');
  };

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
    <div className="flex w-full gap-1.5 items-center">
      <div className="grow">
        <div className="flex w-full justify-between">
          <Input
            type="text" // 'query' is not a valid input type
            placeholder="Search for an album"
            value={query}
            onChange={handleSearchChange}
          />
          {!isInputempty && (
            <Cross1Icon
              className="mt-2 w-16 h-16 px-3 cursor-pointer"
              onClick={() => {
                setQuery('');
                setIsInputEmpty(true);
              }}
            />
          )}
        </div>
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
      {error && <p>Error: {error}</p>}

      {isDragging ? (
        <BigButton
          text="Trash"
          color="red"
          onDrop={(e) => {
            e.preventDefault(); // To prevent default behavior
            handleDeleteItem(e, draggingIndex);
            setIsDragging(false);
          }}
          onDragOver={(e) => e.preventDefault()} // To allow drop
        />
      ) : (
        <BigButton text="Add Heading" color="rgb(65 65 184)" onClick={onAddHeading} />
      )}

      <BigButton
        text="Clear"
        // color="#7373C1"
        // pretty dark gold
        color="#D4AF37"
        onClick={clearAll}
      />

      <BigButton
        className="save"
        text="Save"
        onClick={console.log('TODO: Save logic')}
      />
    </div>
  );
}
