function MovieCard({
  poster_path,
  name,
  movieObj,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  movieWatchList,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < movieWatchList.length; i++) {
      if (movieWatchList[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <>
      <div
        className="movie-card w-[200px] h-[40vh] bg-center bg-cover rounded-xl p-4 hover:scale-110 duration-300  hover:cursor-pointer p-3"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
          position: "relative",
        }}
      >
        {doesContain(movieObj) ? (
          <div
            onClick={() => handleRemoveFromWatchList(movieObj)}
            className="flex justify-center bg-black rounded-xl w-8 h-8 text-xl"
          >
            &#10060;
          </div>
        ) : (
          <div
            onClick={() => handleAddToWatchList(movieObj)}
            className="flex justify-center bg-black rounded-xl w-8 h-8 text-xl"
          >
            &#128525;
          </div>
        )}

        <div
          className="text-white text-xl w-100 p-2 text-center bg-gray-900/60"
          style={{
            position: "absolute",
            bottom: 2,
          }}
        >
          {name}
        </div>
      </div>
    </>
  );
}

export default MovieCard;
