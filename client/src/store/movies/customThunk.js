import { userActions } from "../user/user";
import { moviesActions } from "./movies";

const thunkActions = (config) => {
  const authHeaders = {
    "Authorization": "Bearer " + config.token,
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
          dispatch(
            moviesActions.setMovies({
              movies: data,
            })
          );
        }
        if (config.login) {
          dispatch(
            userActions.login({
              token: data.token,
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
