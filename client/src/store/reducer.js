import {
  GET_ALL_VIDEOGAMES,
  ORDER_DATA_DES,
  ORDER_DATA_DES_RATING,
  ORDER_DATA_ASC,
  ORDER_DATA_ASC_RATING,
  GET_ALL_GENRES,
  RESET_DATA,
  FILTER_BY_GENRE_ARRAY,
} from "./actions";

const initialState = {
  originalData: [],
  allVideogames: [],
  searchedVideogames: [],
  allGenres: [],
};

const rootReducer = (state = initialState, action) => {
  //Auxiliary Variables

  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        originalData: action.payload,
      };
    case RESET_DATA:
      return {
        ...state,
        allVideogames: action.payload,
      };

    case GET_ALL_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };
    case ORDER_DATA_ASC:
      return {
        ...state,
        allVideogames: {
          ...state.allVideogames,
          apigames: [...state.allVideogames.apigames].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
          dbvideogames: [...state.allVideogames.dbvideogames].sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        },
      };
    case ORDER_DATA_DES_RATING:
      return {
        ...state,
        allVideogames: {
          ...state.allVideogames,
          apigames: [...state.allVideogames.apigames].sort(
            (a, b) => b.rating - a.rating
          ),
          dbvideogames: [...state.allVideogames.dbvideogames].sort(
            (a, b) => b.rating - a.rating
          ),
        },
      };

    case ORDER_DATA_DES:
      return {
        ...state,
        allVideogames: {
          ...state.allVideogames,
          apigames: [...state.allVideogames.apigames].sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
          dbvideogames: [...state.allVideogames.dbvideogames].sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
        },
      };

    case ORDER_DATA_ASC_RATING:
      return {
        ...state,
        allVideogames: {
          ...state.allVideogames,
          apigames: [...state.allVideogames.apigames].sort(
            (a, b) => a.rating - b.rating
          ),
          dbvideogames: [...state.allVideogames.dbvideogames].sort(
            (a, b) => a.rating - b.rating
          ),
        },
      };

    case FILTER_BY_GENRE_ARRAY:
      if (action.payload.length > 0) {
        return {
          ...state,
          allVideogames: {
            ...state.allVideogames,
            apigames: [...state.originalData.apigames].filter((videogame) =>
              videogame.genres.some((genre) => action.payload.includes(genre))
            ),
            dbvideogames: [...state.originalData.dbvideogames].filter(
              (videogame) =>
                videogame.genres.some((genre) => action.payload.includes(genre))
            ),
          },
        };
      } else {
        return { ...state, allVideogames: state.originalData };
      }

    default:
      return { ...state };
  }
};

export default rootReducer;
