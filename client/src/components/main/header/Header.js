import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import headerImg from "../../../images/image.jpg";
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
        minHeight: "40vh",
        width: "100%",
        backgroundImage: `url(${headerImg})`,
        objectFit: "scale-down",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1">
          Heading
        </Typography>
        <Typography variant="body1" component="p">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Link to="/search" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" sx={{ my: "1rem" }}>
            Search
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Header;
