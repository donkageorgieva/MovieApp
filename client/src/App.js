import { useEffect } from "react";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user/user";
import { Container } from "@mui/material";
import Header from "./components/header/Header";

function App() {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  useEffect(() => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "",
        password: "",
        demo: true,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(userActions.login(data.token));
        fetch("http://localhost:8080/favorites", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + data.token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div className="App">
      <Container sx={{ height: "100vh" }}>
        <Header />
        <Container maxWidth="lg"></Container>
      </Container>
    </div>
  );
}

export default App;
