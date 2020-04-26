import React from "react";

const GameTitle = (props) => {
  return <div className="row justify-content-center ">Boogle Game</div>;
};

const LetterGrid = (props) => {
  const displayCells = (arr) => {
    return arr.map((letter, index) => (
      <div key={index} className="cell">
        {letter}
      </div>
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

const InputWord = (props) => {
  return (
    <div className="row justify-content-center">
      <form>
        <input
          id="wordinput"
          className="form-control"
          placeholder="Add a word"
          style={{ width: "250px", margin: "10px 0px" }}
        />
      </form>
    </div>
  );
};

const PlayArea = (props) => {
  const lettersOnBoard = Array(16)
    .fill(null)
    .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

  return (
    <>
      <LetterGrid lettersOnBoard={lettersOnBoard} />
      <InputWord></InputWord>
    </>
  );
};

const WordList = (props) => {
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item list-group-item-info">Words</li>
      </ul>
      <div id="style-1" style={{ height: "250px", overflow: "auto" }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">SQUATS</li>
          <li className="list-group-item">LATCH</li>
          <li className="list-group-item">FATS</li>
        </ul>
      </div>
    </>
  );
};

const Board = (props) => {
  return (
    <>
      <div className="row ">
        <div className="col offset-3">
          <PlayArea />
        </div>
        <div className="col-3" style={{ marginTop: "10px" }}>
          <WordList />
        </div>
      </div>
    </>
  );
};

class App extends React.Component {
  render() {
    return (
      <div className="container px-lg-5" style={{marginTop: "20px"}}>
        <div className="row justify-content-center">
          <div className="col">
            <GameTitle />
            <Board />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
