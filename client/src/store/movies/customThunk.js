import { userActions } from "../user/user";
import { moviesActions } from "./movies";
import { favActions } from "../favorites/favorites";
const thunkActions = (config, token = "") => {
  console.log(token, "config token");
  const authHeaders = {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json",
  };
  console.log(authHeaders, "headers");
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
          dispatch(
            moviesActions.setMovies({
              movies: data.map((movie) => {
                return {
                  name: movie.show.name,
                  genres: [...movie.show.genres],
                  image: movie.show.image.medium,
                  url: movie.show.url,
                  summary: movie.show.summary,
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
      })
      .catch((err) => {
        throw err;
      });
  };
};

export default thunkActions;
