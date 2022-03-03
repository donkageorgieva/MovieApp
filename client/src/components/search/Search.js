import { useSelector } from "react-redux";
import { Container, Box, Typography, List, ListItem } from "@mui/material";
import Movie from "./movie/Movie";
import SearchInput from "../UI/search-input/SearchInput";

const Search = () => {
  const movies = useSelector((state) => state.movies.movies);

  const moviesElements =
    movies.length > 0 ? (
      movies.map((movie) => {
        return (
          <ListItem component="li" key={movie.id}>
            <Movie
              image={movie.image}
              name={movie.name}
              premiered={movie.premiered}
              genres={movie.genres}
              url={movie.url}
              summary={movie.summary}
              runtime={movie.runtime}
              movieId={movie.id.toString()}
            />
          </ListItem>
        );
      })
    ) : (
      <Typography> </Typography>
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
      <List component="ul">{moviesElements}</List>
    </Container>
  );
};

export default Search;
