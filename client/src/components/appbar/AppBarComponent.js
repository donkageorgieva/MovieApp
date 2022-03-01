import { AppBar, Box, Container, Typography } from "@mui/material";
import SearchInput from "./search/Search";

const AppBarComponent = (props) => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ padding: "1rem 0em 1rem 0rem", height: "10vh" }}
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
        <SearchInput label="Search by movie title..." />
      </Container>
    </AppBar>
  );
};

export default AppBarComponent;
