import { Box, Typography, Container, ImageList } from "@mui/material";
import Favorite from "./favorite/Favorite";
import { useSelector } from "react-redux";
import Cross from "../../../images/close.png";
const Favorites = (props) => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const favoriteItems =
    favorites.length > 0
      ? favorites.map((fav) => {
          if (!fav) {
            return;
          }
          return (
            <Favorite
              image={!fav.image ? Cross : fav.image}
              key={fav.id}
              name={fav.name}
            />
          );
        })
      : null;
  return (
    <Box
      component="main"
      sx={{ minHeight: "50vh", maxHeight: "100%", py: "2rem" }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h2"
          color="textPrimary"
          sx={{ py: "1.5rem" }}
        >
          {favorites.length <= 0 ? "Your list is empty" : "Your Favorites"}
        </Typography>
        {favorites.length > 0 ? (
          <ImageList cols={5}>{favoriteItems}</ImageList>
        ) : null}
      </Container>
    </Box>
  );
};

export default Favorites;
