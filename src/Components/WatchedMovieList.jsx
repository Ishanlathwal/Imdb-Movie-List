/* eslint-disable react/prop-types */
import WatchedMovie from "./WatchedMovies";

export default function WatchedMovieList({
  watched,
  handleDeleteWatchedMovie,
}) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDeleteWatchedMovie={handleDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}
