import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Rating, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Movie from "../search/movie/Movie";
import thunkActions from "../../store/movies/customThunk";

const Details = (props) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.details.movie);
  const userToken = useSelector((state) => state.user.token);
  const rating = useSelector((state) => state.details.rating);

  const params = useParams();
  const [comment, setComment] = useState("");

  const addNote = (e) => {
    dispatch(
      thunkActions(
        {
          url: `http://localhost:8080/notes/${movie.id}`,
          method: "POST",
          auth: true,
          body: JSON.stringify({
            comment,
          }),
          addNote: true,
        },
        userToken
      )
    );
  };
  const deleteNote = (id) => {
    dispatch(
      thunkActions(
        {
          url: `http://localhost:8080/notes/${movie.id}`,
          method: "DELETE",
          auth: true,
          body: JSON.stringify({
            id: id,
          }),
          deleteNote: true,
        },
        userToken
      )
    );
  };
  const addRating = (e) => {
    console.log(e.target.value, "value");
    dispatch(
      thunkActions(
        {
          url: `http://localhost:8080/ratings/${movie.id}`,
          method: "PUT",
          auth: true,
          body: JSON.stringify({
            value: e.target.value,
            movieId: movie.id.toString().trim(),
          }),
          addRating: true,
        },
        userToken
      )
    );
  };
  useEffect(() => {
    if (userToken && params.title) {
      dispatch(
        thunkActions({
          url: `https://api.tvmaze.com/search/shows?q=${params.title}`,
          display: true,
        })
      );
    }
  }, [dispatch, params.title, userToken]);
  useEffect(() => {
    if (movie.id) {
      dispatch(
        thunkActions(
          {
            url: `http://localhost:8080/notes/${movie.id}`,
            method: "GET",
            auth: true,
            getNotes: true,
          },
          userToken
        )
      );
      dispatch(
        thunkActions(
          {
            url: `http://localhost:8080/ratings/${movie.id}`,
            method: "GET",
            auth: true,

            fetchRating: true,
          },
          userToken
        )
      );
    }
  }, [movie.id, dispatch, userToken]);

  return (
    <React.Fragment>
      <Typography>{movie ? movie.name : null}</Typography>
      <Typography>Your review</Typography>
      <Typography>{rating ? rating.value : null}</Typography>
      <Box>
        {" "}
        <Rating variant="secondary" onChange={addRating} />
        <textarea
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </Box>

      <ul>
        {" "}
        {movie.notes
          ? movie.notes.map((note) => {
              return (
                <div onClick={deleteNote.bind(null, note._id)}>
                  <Typography>{note.comment}</Typography>
                </div>
              );
            })
          : null}
      </ul>
      <button onClick={addNote}>Submit</button>
    </React.Fragment>
  );
};

export default Details;
