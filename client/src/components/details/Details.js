import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Rating,
  Box,
  Container,
  TextareaAutosize,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Movie from "../search/movie/Movie";
import thunkActions from "../../store/movies/customThunk";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Card } from "@mui/material";
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
  const addRating = (e, newVal) => {
    dispatch(
      thunkActions(
        {
          url: `http://localhost:8080/ratings/${movie.id}`,
          method: "PUT",
          auth: true,
          body: JSON.stringify({
            value: parseInt(e.target.value),
            movieId: movie.id.toString().trim(),
          }),
          addRating: true,
          fn: () => {
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
          },
        },
        userToken
      )
    );
  };
  const removeRating = (e) => {
    dispatch(
      thunkActions(
        {
          url: `http://localhost:8080/ratings/${movie.id}`,
          method: "DELETE",
          auth: true,
          body: JSON.stringify({
            ratingId: rating._id,
            movieId: movie.id.toString().trim(),
          }),
          addRating: true,
          fn: () => {
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
          },
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
            fn: () => {
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
            },
          },
          userToken
        )
      );
    }
  }, [movie.id, dispatch, userToken]);
  const movieElement = movie.name.length > 0 && (
    <Movie
      premiered={movie.premiered}
      image={movie.image && movie.image}
      genres={movie.genres}
      movieId={movie.id.toString()}
      runtime={movie.runtime}
      summary={movie.summary}
      url={movie.url}
      name={movie.name}
    />
  );
  return (
    <React.Fragment>
      <Container
        maxWidth="lg"
        sx={{
          my: "2rem",
          justifyContent: "center",
          display: "flex",
          flexFlow: "column",
          py: "4rem",
        }}
      >
        {movie && movieElement}
        <Box sx={{ my: "1rem" }}>
          <Typography component="h4" variant="h5" sx={{ my: "0.2rem" }}>
            Your review ( {rating && rating.value} )
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", my: "0.2rem" }}>
            {" "}
            <Rating
              variant="secondary"
              value={rating ? parseInt(rating.value) : 0}
              onChange={(event, newValue) => {
                addRating(event, newValue);
              }}
            />{" "}
            <CancelIcon
              sx={{
                cursor: "pointer",
                mx: "0.2em",
              }}
              onClick={removeRating}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <TextareaAutosize
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Comment..."
            style={{
              width: "50%",
              maxWidth: "100%",
              height: "8rem",
              margin: "1rem 0rem 1rem 0rem",
              borderRadius: "0.2rem",
              fontFamily: "sans-serif",
              fontSize: "14px",
              fontColor: "#00151c",
              padding: "0.5rem",
            }}
          ></TextareaAutosize>
          <Box
            sx={{
              m: "1rem",
              display: "flex",
              flexFlow: "column",
              justifyContent: "end",
            }}
          >
            <Button variant="contained" color="secondary" onClick={addNote}>
              Submit
            </Button>
          </Box>
        </Box>

        <Card sx={{ width: "20%" }}>
          {" "}
          {movie.notes
            ? movie.notes.map((note) => {
                return (
                  <CardContent
                    sx={{
                      display: "flex",
                      flexFlow: "row-reverse",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={note._id}
                  >
                    <CancelIcon
                      sx={{
                        cursor: "pointer",
                        mx: "0.2em",
                      }}
                      onClick={deleteNote.bind(null, note._id)}
                    />
                    <Typography color="primary.main">{note.comment}</Typography>
                  </CardContent>
                );
              })
            : null}
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Details;
