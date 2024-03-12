import notFoundPageImage from "/game_not_found.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const styleForTheBox = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const imageStyle = {
    width: "60%",
  };

  const buttonStyle = {
    borderColor: "gold",
    borderRadius: "5px",
    color: "black",
    backgroundColor: "gold",
    fontWeight: "bold",
    margin: "20px",
    padding: "10px",
    fontSize: "15px",
  };

  return (
    <div style={styleForTheBox}>
      <img style={imageStyle} src={notFoundPageImage} alt="PAGE NOT FOUND" />
      <Link style={buttonStyle} to={"/home"}>
        GO HOME ➡️
      </Link>
    </div>
  );
};
export default NotFoundPage;
