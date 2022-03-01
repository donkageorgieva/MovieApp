import { AppBar, Box, Container, Typography } from "@mui/material";
import SearchInput from "../UI/search-input/SearchInput";

const AppBarComponent = (props) => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ padding: "1rem 0em 1rem 0rem", minHeight: "10vh" }}
      component="nav"
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" component="p" color="textPrimary">
          {" "}
          Your Movie Collection
        </Typography>
        <SearchInput />
      </Container>
    </AppBar>
  );
};

export default AppBarComponent;
