import { Box, Typography, Button, Container } from "@mui/material";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "30rem",
        backgroundColor: "primary",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1">
          Heading
        </Typography>
        <Typography variant="p" component="p">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Button variant="contained" sx={{ my: "1rem" }}>
          Search
        </Button>
      </Container>
    </Box>
  );
};

export default Header;
