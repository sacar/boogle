import React, { useState } from "react";
import { connect } from "react-redux";
import * as addWord from "./redux/actions/addWord";
import PropTypes from "prop-types";

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
    props.dispatch(addWord.addWord(word));
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
    const lettersOnBoard = Array(16)
      .fill(null)
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

    return (
      <div className="container px-lg-5" style={{ marginTop: "20px" }}>
        <div className="row justify-content-center">
          <div className="col">
            <GameTitle />
            <div className="row ">
              <div className="col offset-3">
                <LetterGrid lettersOnBoard={lettersOnBoard} />
                <InputWord dispatch={this.props.dispatch}></InputWord>
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

App.prototypes = {
  words: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    words: state.words,
  };
}

export default connect(mapStateToProps)(App);
