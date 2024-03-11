import "./App.css";
import { useEffect, useState } from "react";
import { getAllVideogames, getAllGenres } from "./store/actions";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Videogames from "./components/Videogames/Videogames";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import Home from "./components/Home/Home";
import CreateVideogameForm from "./components/CreateVideoGameForm/CreateVideogameForm";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllVideogames());
        dispatch(getAllGenres());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const allVideogames = useSelector((state) => state.allVideogames);
  const allGenres = useSelector((state) => state.allGenres);

  console.log(allVideogames);

  return allVideogames.apigames &&
    allVideogames.dbvideogames &&
    allGenres.length ? (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/videogames" element={<Videogames />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/create_videgame" element={<CreateVideogameForm />} />
        <Route
          path="/home/detail_videogame/:idVideogame"
          element={<VideogameDetail />}
        />
      </Routes>
    </>
  ) : (
    <LoadingPage />
  );
}

export default App;
