import { useEffect, useState } from "react";
import { genreIds } from "../Utilities/Genre";

function WatchList({
  movieWatchList,
  setMovieWatchList,
  handleRemoveFromWatchList,
}) {
  // seach method in second part
  const [search, setSearch] = useState(""); // check line 50 for the logic

  // genre
  const [genreList, setGenreList] = useState(["All Genre"]);
  const [currentGenre, setCurrentGenre] = useState("All Genre");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // handing sorting for arrows in rating at line no. 50 and 54
  let sortIncreasing = () => {
    let sortedIncrease = movieWatchList.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setMovieWatchList([...sortedIncrease]);
  };

  let sortDecreasing = () => {
    let sortedIncrease = movieWatchList.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setMovieWatchList([...sortedIncrease]);
  };

  // handling genre filter to filter movies by onClick and making active class color blue
  const handleFilterGenre = (genre) => {
    setCurrentGenre(genre);
  };

  // performing a side effect to genreList
  useEffect(() => {
    let temp = movieWatchList.map((movieObj) => {
      return genreIds[movieObj.genre_ids[0]];
    });
    temp = new Set(temp); // this is used after genreFilter , because genres are repeating
    setGenreList(["All Genre", ...temp]);
    console.log(temp);
  }, [movieWatchList]);

  // console.log(movieWatchList); // to check which movies are added to the watchlist
  return (
    <>
      {/* First part : Genre Part ===================================================== */}
      <div className="flex justify-center flex-wrap m-4 gap-4">
        {genreList.map((genre) => {
          return (
            <div
              key={movieWatchList.id}
              onClick={() => handleFilterGenre(genre)}
              className={
                currentGenre == genre
                  ? "flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold hover:cursor-pointer"
                  : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold hover:cursor-pointer "
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      {/* Second Part :  Search Bar  ==================================================== */}
      <div className="flex justify-center my-6">
        <input
          value={search}
          onChange={handleSearch}
          type="text"
          className="border-2 h-[2rem] w-[18rem] bg-gray-200 outline-none p-1 text-l"
          placeholder="Search movies.."
        />
      </div>

      {/* Third Part : Movie List ================================================= */}
      {/* Creating table for the added movies */}
      <div className="overflow-hidden border border-gray-200 m-8 rounded-lg">
        <table className="w-full text-gray-500 text-center">
          {/* table heading */}
          <thead className="border b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center items-center gap-4">
                <div onClick={sortDecreasing}>
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div>Rating</div>
                <div onClick={sortIncreasing}>
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          {/* table body */}

          <tbody>
            {movieWatchList
              //  this filter is used to filter genre, when we clicked on the genres
              .filter((movieObj) => {
                if (currentGenre == "All Genre") return true;
                return genreIds[movieObj.genre_ids[0]] == currentGenre;
              })

              // this filter is for search filter
              .filter((movieObj) => {
                return movieObj.name
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })

              // this map is used for body bada
              .map((movieObj) => {
                return (
                  <tr key={movieObj.id} className="border b-2 ">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt=""
                      />
                      <div className="mx-10">{movieObj.name}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreIds[movieObj.genre_ids[0]]}</td>

                    <td
                      onClick={() =>handleRemoveFromWatchList(movieObj)}
                      className="text-red-800 hover:cursor-pointer"
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
