import React, { useState } from "react";
import { connect } from "react-redux";
import * as action from "./redux/actions/addWord";

const GameTitle = () => {
  return <div className="row justify-content-center ">Boogle Game</div>;
};

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

const InputWord = (props) => {
  const [word, setWord] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let wordIsValid = true;
    let board =  Array(16).fill(0).map((e,i) => e + i + 1 );
    let validPositions = [...board];
    console.log("entered word", [...word]); 
    console.log("valid posi", [...validPositions]);
    console.log("letters on board", [...props.lettersOnBoard]);
    [...word.toUpperCase()].forEach((letter) => {
      let selectedLetterPositions = props.lettersOnBoard.reduce((acc,l,i)=>(l === letter ? [...acc, i + 1] : acc ),[]);
      selectedLetterPositions = selectedLetterPositions.filter((e)=>(validPositions.indexOf(e) !== -1));
      console.log(letter + " is at position " , selectedLetterPositions);
      if (selectedLetterPositions.length === 0) {
        wordIsValid = false;
      }
      if (wordIsValid) {
       let validPositionsTemp = [];

      }

    });

    console.log("Word is valid", wordIsValid);
    props.addWord(word);
    setWord("");
  };

  return (
    <div className="row justify-content-center">
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          id="wordinput"
          className="form-control"
          placeholder="Add a word"
          value={word}
          onChange={(event) => setWord(event.target.value)}
          style={{ width: "250px", margin: "10px 0px" }}
        />
      </form>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <div className="container px-lg-5" style={{ marginTop: "20px" }}>
        <div className="row justify-content-center">
          <div className="col">
            <GameTitle />
            <div className="row ">
              <div className="col offset-3">
                <LetterGrid lettersOnBoard={this.props.lettersOnBoard} />
                <InputWord addWord={this.props.addWord} lettersOnBoard={this.props.lettersOnBoard}></InputWord>
              </div>
              <div className="col-3" style={{ marginTop: "10px" }}>
                <ul className="list-group">
                  <li className="list-group-item list-group-item-info">
                    Words
                  </li>
                </ul>
                <div id="style-1" style={{ height: "250px", overflow: "auto" }}>
                  <ul className="list-group list-group-flush">
                    {this.props.words.map((word, index) => (
                      <li key={index} className="list-group-item">
                        {word}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    words: state.gameState.words,
    lettersOnBoard: state.gameState.lettersOnBoard
   };
}

function mapDispatchToProps(dispatch) {
  return {
    addWord: (word) => dispatch(action.addWord(word)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
