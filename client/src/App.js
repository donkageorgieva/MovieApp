import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { userActions } from "./store/user/user";
import Details from "./components/details/Details";
import Header from "./components/main/header/Header";
import AppBarComponent from "./components/appbar/AppBarComponent";
import Favorites from "./components/main/favorites/Favorites";
import Search from "./components/search/Search";
import thunkActions from "./store/movies/customThunk";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      console.log("no token");
      dispatch(
        thunkActions({
          url: "http://localhost:8080/auth/login",
          method: "POST",
          auth: true,
          login: true,
          body: JSON.stringify({
            username: "",
            password: "",
            demo: true,
          }),
          fn: () => {
            dispatch(
              thunkActions(
                {
                  url: "http://localhost:8080/favorites",
                  auth: true,
                  getFavs: true,
                },
                userToken
              )
            );
          },
        })
      );
    } else {
      const parsedToken = JSON.parse(savedToken);
      dispatch(
        thunkActions(
          {
            url: "http://localhost:8080/favorites",
            auth: true,
            getFavs: true,
          },
          parsedToken
        )
      );

      dispatch(
        userActions.login({
          token: parsedToken,
        })
      );
    }
  }, [dispatch, userToken]);

  return (
    <div className="App">
      <Box bgcolor="primary.main" sx={{ minHeight: "100vh" }}>
        <AppBarComponent />
        <Routes>
          <Route element={<Details />} path="/movies/:title"></Route>
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
