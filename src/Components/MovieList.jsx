/* eslint-disable react/prop-types */
import Movie from "./Movies";

export default function MovieList({ movie, handleSelectedId }) {
  return (
    <ul className='list list-movies'>
      {movie?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectedId={handleSelectedId}
        />
      ))}
    </ul>
  );
}
