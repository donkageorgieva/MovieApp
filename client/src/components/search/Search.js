import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  Card,
  CardMedia,
} from "@mui/material";
import SearchInput from "../UI/search-input/SearchInput";

const Search = () => {
  const movies = useSelector((state) => state.movies.movies);
  const moviesElements =
    movies.length > 0 ? (
      movies.map((movie) => {
        return (
          <List component="ul">
            <ListItem component="li">
              <Card sx={{ display: "flex" }} component="article">
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={movie.image}
                  alt="Live from space album cover"
                />
              </Card>
              <Typography>{movie.name}</Typography>
            </ListItem>
          </List>
        );
      })
    ) : (
      <Typography>Loading...</Typography>
    );
  return (
    <Container maxWidth="lg" component="section">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          my: "2rem",
        }}
      >
        <Box>
          <Typography variant="h4" component="h2">
            Search
          </Typography>
        </Box>

        <Box sx={{ my: "1rem" }}>
          <SearchInput />
        </Box>
      </Box>
      {moviesElements}
    </Container>
  );
};

export default Search;
