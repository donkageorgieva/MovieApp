import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useState } from "react";
import Movie from "../search/movie/Movie";
import thunkActions from "../../store/movies/customThunk";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
const Details = (props) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.details.movie);
  const userToken = useSelector((state) => state.user.token);
  const notes = useSelector((state) => state.details.notes);
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
            id,
          }),
          deleteNote: true,
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
  }, [movie.id, dispatch, userToken]);

  return (
    <React.Fragment>
      <Typography>{movie ? movie.name : null}</Typography>

      <textarea
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <ul>
        {" "}
        {movie.notes
          ? movie.notes.map((note) => {
              return (
                <Typography
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                >
                  {note.comment}
                </Typography>
              );
            })
          : null}
      </ul>
      <button onClick={addNote}>Submit</button>
    </React.Fragment>
  );
};

export default Details;
