import { useEffect, useState } from "react";
import axios from "axios";
const key = "db680955";

export function useCustomHook(query, callBackFunction) {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  useEffect(
    function () {
      const get = async () => {
        try {
          setloading(true);
          seterror("");
          const res = await axios.get(
            `https://www.omdbapi.com/?apikey=${key}&s=${query}`
          );
          if (res.data.Response == "False") throw new Error("Movie not found");
          setMovies(res.data.Search);
        } catch (e) {
          seterror(e.message);
          // console.log(e.message);
        } finally {
          setloading(false);
        }
      };
      if (query.length < 3) {
        setMovies([]), seterror("");
        return;
      }
      callBackFunction?.();
      get();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  return { movies, loading, error };
}
