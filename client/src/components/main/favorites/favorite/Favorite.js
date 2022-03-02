import { Link } from "react-router-dom";
const Favorite = (props) => {
  const link = `/movies/${props.name}`;
  return (
    <Link to={link} style={{ height: "15rem", width: "10rem" }}>
      <img
        src={props.image}
        alt={props.name}
        loading="lazy"
        style={{ height: "15rem", objectFit: "cover", width: "10rem" }}
      />
    </Link>
  );
};

export default Favorite;
