import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Link as MUILink,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Cross from "../../../images/close.png";
const Movie = (props) => {
  const genres = props.genres.join(", ");
  const favorites = useSelector((state) => state.favorites.favorites);
  const movieLink = `/movies/${props.name}`;
  const isFav = favorites.find((movie) => {
    if (movie !== undefined) {
      return movie.movieId.trim() === props.movieId.trim();
    }
  });
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
        <Link to={movieLink}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={props.image ? props.image : Cross}
            alt="Live from space album cover"
          />
        </Link>
        <CardContent sx={{ backgroundColor: "primary.main" }}>
          <Link to={movieLink} style={{ textDecoration: "none" }}>
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
            {props.url}
          </MUILink>
          <Box>
            <Button
              variant="outlined"
              color="info"
              onClick={isFav ? props.removeFav : props.addFav}
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
