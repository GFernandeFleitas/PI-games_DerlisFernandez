import axios from "axios";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const ORDER_DATA_DES = "ORDER_DATA_DES";
export const ORDER_DATA_DES_RATING = "ORDER_DATA_DES_RATING";
export const ORDER_DATA_ASC = "ORDER_DATA_ASC";
export const ORDER_DATA_ASC_RATING = "ORDER_DATA_ASC_RATING";
export const RESET_DATA = "RESET_DATA";
export const FILTER_BY_GENRE_ARRAY = "FILTER_BY_GENRE_ARRAY";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const SEARCH_GAMES = "SEARCH_GAMES";

export const getAllVideogames = () => {
  const endpoint = "http://localhost:3001/videogames";
  return (dispatch) => {
    axios
      .get(endpoint)
      .then(({ data }) => {
        console.log(data);
        return dispatch({
          type: GET_ALL_VIDEOGAMES,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error fetching videogames:", error);
      });
  };
};

export const createVideogame = (formData) => {
  const endpoint = "http://localhost:3001/videogames";
  return (dispatch) => {
    axios
      .post(endpoint, formData)
      .then(({ data }) => {
        console.log(data);
        return dispatch({
          type: CREATE_VIDEOGAME,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error creating videogame:", error);
      });
  };
};

export const getVieogameDetailById = (idVideogame) => {
  const endpoint = `http://localhost:3001/videogames/${idVideogame}`;
  return (dispatch) => {
    axios
      .get(endpoint)
      .then(({ data }) => {
        console.log(data);
        return dispatch({
          type: GET_VIDEOGAME_DETAIL,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error fetching videogame details:", error);
      });
  };
};

export const searchGamesByName = (videogameName) => {
  const endpoint = `http://localhost:3001/videogames/name?name=${videogameName}`;
  return (dispatch) => {
    axios
      .get(endpoint)
      .then(({ data }) => {
        console.log(data);
        return dispatch({
          type: SEARCH_GAMES,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error fetching videogame info:", error);
      });
  };
};

export const getAllGenres = () => {
  const endpoint = "http://localhost:3001/genres";
  return (dispatch) => {
    axios
      .get(endpoint)
      .then(({ data }) => {
        console.log(data);
        return dispatch({
          type: GET_ALL_GENRES,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  };
};

export const orderVideogamesDesc = () => {
  return (dispatch) => {
    return dispatch({
      type: ORDER_DATA_DES,
    });
  };
};

export const orderVideogamesDesRating = () => {
  return (dispatch) => {
    return dispatch({
      type: ORDER_DATA_DES_RATING,
    });
  };
};

export const orderVideogamesAsc = () => {
  return (dispatch) => {
    return dispatch({
      type: ORDER_DATA_ASC,
    });
  };
};
export const orderVideogamesAscRating = () => {
  return (dispatch) => {
    return dispatch({
      type: ORDER_DATA_ASC_RATING,
    });
  };
};

export const resetVideogamesData = (originalData) => {
  return (dispatch) => {
    return dispatch({
      type: RESET_DATA,
      payload: originalData,
    });
  };
};

export const filterByGenreId = (arrayOfGenres) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_BY_GENRE_ARRAY,
      payload: arrayOfGenres,
    });
  };
};

// export const searchDogs = (dogsName) => {
//   const endpoint = `http://localhost:3001/searchdogs?name=${dogsName}`;
//   return (dispatch) => {
//     axios
//       .get(endpoint)
//       .then(({ data }) => {
//         console.log(data);
//         return dispatch({
//           type: SEARCH_DOGS,
//           payload: data,
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching dogs:", error);
//       });
//   };
// };

// export const getAlldogsTemperaments = () => {
//   const endpoint = `http://localhost:3001/temperaments`;
//   return (dispatch) => {
//     axios
//       .get(endpoint)
//       .then(({ data }) => {
//         console.log(data);
//         return dispatch({
//           type: TEMPERAMENTS,
//           payload: data,
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching dogs:", error);
//       });
//   };
// };
