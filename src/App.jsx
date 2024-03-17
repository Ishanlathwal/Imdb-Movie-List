import { Navbar } from "./Components/Navbar";
import { useEffect, useState } from "react";
import { Logo } from "./Components/Logo";
import { NumResults } from "./Components/NumResults";
import { SearchBar } from "./Components/SearchBar";
import { Main } from "./Components/Main";
import Box from "./Components/Box";
import MovieList from "./Components/MovieList";
import WatchedSummary from "./Components/WatchedSummary";
import WatchedMovieList from "./Components/WatchedMovieList";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import MovieDetails from "./Components/MovieDetails";
import { useCustomHook } from "./Components/Custom hook/CustomHook";
/* eslint-disable react/prop-types */

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setselectedId] = useState(null);

  //custom hook

  const { movies, loading, error } = useCustomHook(query, handleSelectedIdNull);

  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return storedValue !== null ? JSON.parse(storedValue) : [];
  });
  const handleSelectedId = (id) => {
    setselectedId((prevSelectedId) => (id === prevSelectedId ? null : id));
  };
  function handleSelectedIdNull() {
    setselectedId(null);
  }

  const handleAddWatchedMovie = (movie) => {
    setWatched((prevWatched) => [...prevWatched, movie]);
  };

  const handleDeleteWatchedMovie = (id) => {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== id)
    );
  };

  // useEffect(
  //   function () {
  //     const get = async () => {
  //       try {
  //         setloading(true);
  //         seterror("");
  //         const res = await axios.get(
  //           `https://www.omdbapi.com/?apikey=${key}&s=${query}`
  //         );
  //         if (res.data.Response == "False") throw new Error("Movie not found");
  //         setMovies(res.data.Search);
  //       } catch (e) {
  //         seterror(e.message);
  //         // console.log(e.message);
  //       } finally {
  //         setloading(false);
  //       }
  //     };
  //     if (query.length < 3) {
  //       setMovies([]), seterror("");
  //       return;
  //     }
  //     handleSelectedIdNull();
  //     get();
  //   },
  //   [query]
  // );
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <Navbar>
        <nav className='nav-bar'>
          <Logo />
          <SearchBar setQuery={setQuery} />
          <NumResults movies={movies} />
        </nav>
      </Navbar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movie={movies} handleSelectedId={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                handleSelectedIdNull={handleSelectedIdNull}
                handleAddWatchedMovie={handleAddWatchedMovie}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList
                  watched={watched}
                  handleDeleteWatchedMovie={handleDeleteWatchedMovie}
                />
              </>
            )}
          </>
        </Box>
      </Main>
    </>
  );
}
