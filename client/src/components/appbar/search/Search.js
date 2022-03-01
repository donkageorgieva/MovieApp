import { TextField, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

const SearchInput = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        onChange={props.onChange}
        placeholder={props.label}
        size="small"
        InputProps={{
          startAdornment: <SearchIcon />,
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
      <Button
        variant="outlined"
        color="info"
        onClick={props.search}
        sx={{ mx: "1rem" }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchInput;
