import { userActions } from "../user/user";
import { moviesActions } from "./movies";
import { favActions } from "../favorites/favorites";
import { detailsActions } from "../details/details";
const thunkActions = (config, token = "") => {
  const authHeaders = {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json",
  };
  return async (dispatch) => {
    return fetch(config.url, {
      method: config.method ? config.method : "GET",
      headers: config.auth && authHeaders,
      body: config.body ? config.body : null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (config.deleteNote) {
          dispatch(
            detailsActions.deleteNote({
              note: data.data,
            })
          );
        }
        if (config.search) {
          dispatch(
            moviesActions.setMovies({
              movies: data.map((movie) => {
                return {
                  name: movie.show.name && movie.show.name,
                  genres: movie.show.genres && [...movie.show.genres],
                  image: movie.show.image && movie.show.image.medium,
                  url: movie.show.url && movie.show.url,
                  summary: movie.show.summary && movie.show.summary,
                  premiered: movie.show.premiered && movie.show.premiered,
                  runtime: movie.show.runtime && movie.show.runtime,
                  id: movie.show.id,
                };
              }),
            })
          );
        }
        if (config.login) {
          dispatch(
            userActions.login({
              token: data.token,
            })
          );

          localStorage.setItem("token", JSON.stringify(data.token));
          if (config.fn) {
            config.fn();
          }
        }
        if (config.getFavs) {
          dispatch(
            favActions.setFavorites({
              favorites: data,
            })
          );
        }
        if (config.addFav) {
          dispatch(
            favActions.addFavorite({
              favorite: data.data,
            })
          );
        }
        if (config.removeFav) {
          dispatch(
            favActions.removeFavorite({
              favorite: data.data,
            })
          );
        }
        if (config.addNote) {
          console.log(data, "data from note adding");
          dispatch(
            detailsActions.comment({
              movie: data.data,
            })
          );
        }
        if (config.display) {
          dispatch(
            detailsActions.display({
              movie: {
                name: data[0].show.name && data[0].show.name,
                genres: data[0].show.genres && [...data[0].show.genres],
                image: data[0].show.image && data[0].show.image.medium,
                url: data[0].show.url && data[0].show.url,
                summary: data[0].show.summary && data[0].show.summary,
                premiered: data[0].show.premiered && data[0].show.premiered,
                runtime: data[0].show.runtime && data[0].show.runtime,
                id: data[0].show.id,
              },
            })
          );
          if (config.fn) {
            config.fn();
          }
        }
        if (config.getNotes) {
          dispatch(
            detailsActions.setNotes({
              notes: data,
            })
          );
        }
        if (config.addRating) {
          dispatch(
            detailsActions.addRating({
              notes: data,
            })
          );
          if (config.fn) {
            config.fn();
          }
        }
        if (config.fetchRating) {
          dispatch(
            detailsActions.setRating({
              notes: data,
            })
          );
        }
      })
      .catch((err) => {
        throw err;
      });
  };
};

export default thunkActions;
