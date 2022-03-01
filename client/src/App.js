import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { userActions } from "./store/user/user";
import { favActions } from "./store/favorites/favorites";
import useFetch from "./hooks/useFetch";
import Header from "./components/main/header/Header";
import AppBarComponent from "./components/appbar/AppBarComponent";
import Favorites from "./components/main/favorites/Favorites";
import Search from "./components/search/Search";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const { sendRequest, result } = useFetch();

  useEffect(() => {
    const getUserData = (token) => {
      sendRequest({
        url: "http://localhost:8080/favorites",
        token,
        auth: true,
        fn: (data) => {
          dispatch(
            favActions.setFavorites({
              favorites: data,
            })
          );
        },
      });
    };
    const savedToken = window.localStorage.getItem("token");
    if (!savedToken) {
      sendRequest({
        url: "http://localhost:8080/auth/login",
        token: "",
        method: "POST",
        auth: true,
        body: {
          username: "",
          password: "",
          demo: true,
        },
        fn: (data) => {
          dispatch(
            userActions.login({
              token: data.token,
            })
          );
          window.localStorage.setItem("token", JSON.stringify(data.token));
          getUserData(data.token);
        },
      });
    } else {
      const parsedToken = JSON.parse(savedToken);
      getUserData(parsedToken);
      dispatch(
        userActions.login({
          token: parsedToken,
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Box bgcolor="primary.main" sx={{ minHeight: "100vh" }}>
        <AppBarComponent />
        <Routes>
          <Route
            element={
              <React.Fragment>
                <Header />
                <Favorites />
              </React.Fragment>
            }
            path="/"
          ></Route>
          <Route
            element={
              <React.Fragment>
                <Search />
              </React.Fragment>
            }
            path="/search"
          ></Route>
        </Routes>
      </Box>
    </div>
  );
}

export default App;
