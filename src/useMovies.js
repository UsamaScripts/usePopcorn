import { useState , useEffect } from "react";
const KEY = "a9132229";


export function useMovie(query ){
  
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}
      `,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with feteching movies");

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found!");
          }

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setIsError("");
        setMovies([]);
        return;
      }
      // handleCloseMovie();
            fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

return {movies , isError ,isLoading }


}