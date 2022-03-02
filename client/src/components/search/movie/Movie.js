import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Link,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import Cross from "../../../images/close.png";
const Movie = (props) => {
  const genres = props.genres.join(", ");

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
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={props.image ? props.image : Cross}
          alt="Live from space album cover"
        />
        <CardContent sx={{ backgroundColor: "primary.main" }}>
          <Typography component="h4">
            {props.name} ({props.premiered})
          </Typography>
          <Typography variant="subtitle2" component="h5">
            {genres} {props.genres.length > 0 ? " | " : null}{" "}
            {props.runtime + "m"}
          </Typography>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: props.summary }}
            component="p"
          ></Typography>
          <Link
            href={props.url}
            component="a"
            variant="body2"
            color="secondary.main"
          >
            {props.url}
          </Link>
          <Box>
            <Button variant="outlined" color="info" onClick={props.onClick}>
              Add to favorites
            </Button>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Movie;
