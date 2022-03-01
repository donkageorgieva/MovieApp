import { Box, Typography, Button, Container } from "@mui/material";
import headerImg from "../../images/image.jpg";
const styles = {
  Box: {
    backgroundImage: `url(${headerImg})`,
  },
};
const Header = () => {
  return (
    <Box
      component="header"
      bgcolor="primary.main"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "40vh",
        width: "100%",
        backgroundImage: `url(${headerImg})`,
        objectFit: "scale-down",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" color="textPrimary">
          Heading
        </Typography>
        <Typography variant="body1" component="p" color="textPrimary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Button variant="contained" color="secondary" sx={{ my: "1rem" }}>
          Search
        </Button>
      </Container>
    </Box>
  );
};

export default Header;
