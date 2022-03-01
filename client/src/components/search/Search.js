import { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import SearchInput from "../UI/search-input/SearchInput";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (text) => {
    setQuery(text);
  };
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
    </Container>
  );
};

export default Search;
