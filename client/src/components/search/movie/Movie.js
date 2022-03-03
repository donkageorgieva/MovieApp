import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Link as MUILink,
  Button,
  Box,
} from "@mui/material";
import Cross from "../../../images/close.png";
import thunkActions from "../../../store/movies/customThunk";
import { Link } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Movie = (props) => {
  const genres = props.genres.join(", ");
  const favorites = useSelector((state) => state.favorites.favorites);
  const userToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const isFav = favorites.find((movie) => {
    if (movie !== undefined) {
      return movie.movieId.trim() === props.movieId.trim();
    }
  });

  const addFav = (movie) => {
    dispatch(
      thunkActions(
        {
          url: "http://localhost:8080/favorites",
          method: "POST",
          auth: true,
          body: JSON.stringify({
            name: props.name,
            movieId: props.movieId,
            genres: [...props.genres],
            image: props.image && props.image,
          }),
          addFav: true,
        },
        userToken
      )
    );
  };

  const removeFav = (movie) => {
    dispatch(
      thunkActions(
        {
          url: `http://localhost:8080/favorites/${props.movieId}`,
          method: "DELETE",
          auth: true,
          removeFav: true,
        },
        userToken
      )
    );
  };
  return (
    <React.Fragment>
      <Card
        sx={{
          display: "flex",
          boxShadow: "none",
          border: "1px solid white",
          width: "100%",
          backgroundColor: "primary.main",
        }}
        component="article"
      >
        <Link to={`/movies/${props.name}`}>
          <CardMedia
            component="img"
            sx={{ width: "10rem", objectFit: "cover", height: "100%" }}
            image={props.image ? props.image : Cross}
            alt="Live from space album cover"
          />
        </Link>
        <CardContent
          sx={{
            backgroundColor: "primary.main",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Link to={`/movies/${props.name}`} style={{ textDecoration: "none" }}>
            <Typography component="h4" variant="h5">
              {props.name} ({props.premiered})
            </Typography>
          </Link>
          <Typography variant="caption" component="h5">
            {genres} {props.genres.length > 0 ? " | " : null}{" "}
            {props.runtime + "m"}
          </Typography>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: props.summary }}
            component="p"
          ></Typography>
          <MUILink
            href={props.url}
            component="a"
            variant="body2"
            color="secondary.main"
          >
            View official site
          </MUILink>
          <Box>
            <Button
              variant="outlined"
              color="info"
              onClick={isFav ? removeFav : addFav}
              sx={{ my: "1rem" }}
            >
              {isFav ? "Remove From Favorites" : "Add to Favorites"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Movie;
