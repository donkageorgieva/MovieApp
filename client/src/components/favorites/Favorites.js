import { Box, Typography, Button, Card, Container } from "@mui/material";
import { useSelector } from "react-redux";
const Favorites = (props) => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <Box component="main" bgcolor="primary.main" sx={{ height: "50vh" }}>
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h2"
          color="textPrimary"
          sx={{ py: "1.5rem" }}
        >
          {favorites.length <= 0 ? "Your list is empty" : "Your Favorites"}
        </Typography>
      </Container>
    </Box>
  );
};

export default Favorites;
