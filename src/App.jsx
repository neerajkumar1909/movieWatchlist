import { useEffect, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [movieWatchList, setMovieWatchList] = useState([]);

  // handling movies added to watchlist
  let handleAddToWatchList = (movieObj) => {
    let newWatchList = [...movieWatchList, movieObj];
    localStorage.setItem("movieApp", JSON.stringify(newWatchList)); // we are setting this item our local storage
    setMovieWatchList(newWatchList);
    // console.log(newWatchList);
  };

  // handling movies remove from watchlist
  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = movieWatchList.filter((movie) => {
      return movie.id != movieObj.id;
    });

    // if dont setItem again in localstorage, the deleted items will shown again after refresh
    localStorage.setItem("movieApp", JSON.stringify(filteredWatchList));

    setMovieWatchList(filteredWatchList);
    // console.log(filteredWatchList)
  };

  // performing useEffect hook to get the items as it is even after refreshing the page..
  useEffect(() => {
    let getMoviesFromLocalStorage = localStorage.getItem("movieApp");
    if (!getMoviesFromLocalStorage) {
      return;
    }
    setMovieWatchList(JSON.parse(getMoviesFromLocalStorage));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  movieWatchList={movieWatchList}
                  handleAddToWatchList={handleAddToWatchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                movieWatchList={movieWatchList}
                setMovieWatchList={setMovieWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
