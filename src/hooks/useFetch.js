import { useState, useEffect } from 'react';
 
    // Fetch movies from the API when the component mounts
    // and update the state with the fetched data.
    // This will be used in the MovieList component to display the list of movies.

    export const useFetch = (apiPath) => {
      const [data, setData] = useState([]);
      const url = `https://api.themoviedb.org/3/${apiPath}?api_key=299dbc2257c90dccef0f8793240a189c`; // Ensure you have your API key in .env file


    useEffect(() => {
       async function fetchMovies() {
       const response = await fetch(url); // Replace with your API endpoint
       const json = await response.json();
       setData(json.results); // Adjust based on your API response structure
       }
       fetchMovies();
     }, [url])
     return {data}

     }
