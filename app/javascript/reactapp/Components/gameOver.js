import React from "react";
import { newBoard } from '../Utils';

const GameOver = (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    props.resetGame(newBoard);
  };

  return (
    <div className="row justify-content-center ">
      <div className="alert alert-secondary" role="alert">
        Game Over. Your Score is {" " + props.score + ". "}
        <a href="#" className="alert-link" onClick={handleClick}>
          Play Again.
        </a>
      </div>
    </div>
  );
};

export default GameOver;
