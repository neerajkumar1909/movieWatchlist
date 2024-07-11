import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({
  handleAddToWatchList,
  handleRemoveFromWatchList,
  movieWatchList,
 
}) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  // handling forward arrow for pagination
  const handleForwardPage = () => {
    setPage(page + 1);
  };

  // handling backward arrow for pagination
  const handleBackwardPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=dfd3b0591a1c1be78d8b3962acfaeab5&language=en-US&page=${page}`
      )
      .then((res) => setMovies(res.data.results));
  }, [page]);
  // console.log(movies);

  return (
    <div>
      <div className="text-2xl font-bold text-center p-3">Trending Movies</div>

      <div className="flex flex-row flex-wrap justify-around gap-8">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              poster_path={movieObj.poster_path}
              name={movieObj.original_name}
              movieObj={movieObj}
              handleAddToWatchList={handleAddToWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              movieWatchList={movieWatchList}
            />
          );
        })}
      </div>

      <Pagination
        handleForwardPage={handleForwardPage}
        handleBackwardPage={handleBackwardPage}
        page={page}
      />
    </div>
  );
}

export default Movies;
