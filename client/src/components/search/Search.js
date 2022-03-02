import { useDispatch, useSelector } from "react-redux";
import { Container, Box, Typography, List, ListItem } from "@mui/material";
import thunkActions from "../../store/movies/customThunk";
import Movie from "./movie/Movie";
import SearchInput from "../UI/search-input/SearchInput";

const Search = () => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const addFav = (movie) => {
    dispatch(
      thunkActions(
        {
          url: "http://localhost:8080/favorites",
          method: "POST",
          auth: true,
          body: JSON.stringify({
            name: movie.name,
            movieId: movie.id,
            genres: [...movie.genres],
            image: movie.image && movie.image,
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
          url: `http://localhost:8080/favorites/${movie.id}`,
          method: "DELETE",
          auth: true,
          removeFav: true,
        },
        userToken
      )
    );
  };
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
              addFav={addFav.bind(null, movie)}
              removeFav={removeFav.bind(null, movie)}
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
