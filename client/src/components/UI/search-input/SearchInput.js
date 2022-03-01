import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { moviesActions } from "../../../store/movies/movies";
const SearchInput = (props) => {
  const [query, setQuery] = useState("");
  const globalMovies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const handleSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((res) => res.json())
      .then((movies) => {
        console.log(movies);
        dispatch(
          moviesActions.setMovies({
            movies,
          })
        );
        console.log(globalMovies);
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search by movie title..."
        size="small"
        InputProps={{
          startAdornment: <SearchIcon sx={{ width: "1rem", px: "0.5rem" }} />,
        }}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root ": {
            "& > fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiOutlinedInput-root:hover ": {
            "& > fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <Link to="/search" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          color="info"
          onClick={handleSearch}
          sx={{ mx: "1rem" }}
        >
          Search
        </Button>
      </Link>
    </Box>
  );
};

export default SearchInput;
