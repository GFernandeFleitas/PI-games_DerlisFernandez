import gameNotFoundImage from "/not_content.png";

const GameNotFound = () => {
  return (
    <div>
      <img style={{ width: "30%" }} src={gameNotFoundImage} alt="" />
      <h2>ERROR: NOT GAME CONTENT FOUND</h2>
    </div>
  );
};

export default GameNotFound;
