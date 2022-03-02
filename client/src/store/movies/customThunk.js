import { userActions } from "../user/user";
import { moviesActions } from "./movies";
import { favActions } from "../favorites/favorites";
const thunkActions = (config, token = "") => {
  console.log(token, "config token");
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
        if (config.search) {
          console.log(data);
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

          window.localStorage.setItem("token", JSON.stringify(data.token));
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
          console.log(data);
          dispatch(
            favActions.addFavorite({
              favorite: data.data,
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
