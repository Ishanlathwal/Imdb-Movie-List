/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function MovieDetails({
  selectedId,
  handleSelectedIdNull,
  handleAddWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatchedMovie = watched
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Genre: genre,
    Director: director,
  } = movie;
  const key = "db680955";

  /////////////////
  const handleMovieAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    handleAddWatchedMovie(newWatchedMovie);
    handleSelectedIdNull();
  };

  //////////////////
  useEffect(() => {
    async function getMoviesDetails() {
      try {
        setisLoading(true);
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const data = res.data;
        setMovie(data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getMoviesDetails();
  }, [selectedId]);

  useEffect(
    function () {
      if (!title) return;
      document.title = title;

      return () => {
        return (document.title = "usePopcorn");
      };
    },
    [title]
  );

  useEffect(() => {
    const callBack = (e) => {
      if (e.code === "Escape") {
        handleSelectedIdNull();
      }
    };
    document.addEventListener("keydown", callBack);

    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [handleSelectedIdNull]);

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={handleSelectedIdNull}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie.Title}`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre} </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {!isWatchedMovie ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleMovieAdd}>
                      Add To List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated this movie {watchedUserRating}{" "}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot} </em>
            </p>
            <p>Starring {actors} </p>
            <p>Directed by {director} </p>
          </section>
        </>
      )}
    </div>
  );
}
