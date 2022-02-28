import { useState } from "react";
import useHttp from "./hooks/httphook";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user/user";
import { Container } from "@mui/material";
import Header from "./components/header/Header";
function App() {
  const { sendRequest, result } = useHttp();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  useState(() => {
    sendRequest({
      url: "http://localhost:8080/auth/login",
      method: "POST",
      body: {
        username: "",
        password: "",
        demo: true,
      },
      fn: (response) => {
        dispatch(
          userActions.login({
            token: response.token,
          })
        );
        localStorage.setItem("token", JSON.stringify(userToken));
      },
    });
  }, [sendRequest]);
  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg"></Container>
    </div>
  );
}

export default App;
