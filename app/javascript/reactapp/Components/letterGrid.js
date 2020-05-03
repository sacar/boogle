import React from "react";

const LetterBox = (props) => {
  return <div className="cell">{props.letter}</div>;
};

const LetterGrid = (props) => {
  const displayCells = (arr) => {
    return arr.map((letter, index) => (
      <LetterBox key={index} letter={letter} />
    ));
  };

  return (
    <div className="row justify-content-center">
      <div className="squaregrid board">
        {displayCells(props.lettersOnBoard)}
      </div>
    </div>
  );
};

export default LetterGrid;
