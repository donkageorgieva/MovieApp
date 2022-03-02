import React, { useEffect } from "react";
import { useLocation, useNavigationType, useParams } from "react-router-dom";
import { useState } from "react";
import Movie from "../search/movie/Movie";
import thunkActions from "../../store/movies/customThunk";
import { useDispatch, useSelector } from "react-redux";
const Details = (props) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.details.movie);
  const userToken = useSelector((state) => state.user.token);
  const params = useParams();
  const [comment, setComment] = useState("");

  const addNote = (e) => {
    console.log(movie.id, "add note movie id");
    dispatch(
      thunkActions(
        {
          url: `http://localhost:8080/notes/${movie.id}`,
          method: "POST",
          auth: true,
          body: JSON.stringify({
            comment,
          }),
          addFav: true,
        },
        userToken
      )
    );
  };
  useEffect(() => {
    dispatch(
      thunkActions({
        url: `https://api.tvmaze.com/search/shows?q=${params.title}`,

        display: true,
      })
    );
    console.log(movie, "state movie");
  }, [dispatch, params.title]);
  return (
    <React.Fragment>
      <h1>{movie ? movie.name : null}</h1>
      <textarea
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button onClick={addNote}>Submit</button>
    </React.Fragment>
  );
};

export default Details;
