import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import headerImg from "../../../images/image.jpg";

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
          Have fun
        </Typography>
        <Typography variant="body1" component="p">
          Browse for your favorite movies, write down private notes and don't
          forget to come back!
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
