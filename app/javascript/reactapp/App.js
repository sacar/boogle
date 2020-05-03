import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as action from "./redux/actions/actions";
import  wordIsValid from "./Utils.js";
import Results from "./Components/results";
const apiUrl =
  "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20200503T084604Z.5ef08946641aafd2.d0eda00255a57e6f8c059d7ab298bead0d74f254&lang=en-en&text=";

const GameOver = (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    const lettersOnBoard = Array(16)
      .fill(null)
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    props.resetGame(lettersOnBoard);
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

const ButtonText = (props) => {
  if (props.pending) {
    return (
      <>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span style={{ marginLeft: "5px" }}>Verifying...</span>{" "}
      </>
    );
  } else {
    return <span>Submit</span>;
  }
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
  const [valid, setValid] = useState(true);
  const [pending, setPending] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!word) return;
    if (word.length < 3) {
      setValid(false);
      setWord("");
      return;
    }
    let board = Array(16)
      .fill(0)
      .map((e, i) => e + i);

    let wordIsOk = wordIsValid(
      [...word.toUpperCase()],
      [...board],
      [...board],
      props.lettersOnBoard
    );

    console.log("valid", wordIsOk);

    if (wordIsOk) {
      setPending(true);
      fetch(apiUrl + word)
        .then((res) => res.json())
        .then((data) => {
          if (data.def[0]) {
            props.addWord(word);
            setValid(true);
          } else {
            setValid(false);
          }
          setPending(false);
        })
        .catch(console.log);
    } else {
      setValid(false);
    }

    setWord("");
  };

  return (
    <div className="row justify-content-center">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="needs-validation"
      >
        <div className="form-group">
          <input
            id="wordinput"
            className={"form-control " + (valid ? "" : "is-invalid")}
            placeholder="Add a word"
            value={word}
            onChange={(event) => setWord(event.target.value)}
            style={{ width: "250px", margin: "10px 0px" }}
          />
          <div className="invalid-feedback">Invalid word.</div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "120px" }}
        >
          <ButtonText pending={pending} />
        </button>
      </form>
    </div>
  );
};

const Timer = (props) => {
  const [secondsLeft, setSecondsLeft] = useState(120);
  useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      props.timeUp();
    }
  });

  const formatTimer = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60; 
    seconds = seconds.toString();
    // padding the seconds value
    if (seconds.length < 2) {
      seconds = ('00' + seconds).slice(-2);
    } 

    return (minutes + ":" + seconds);
}

  return (
    <div className="row justify-content-center ">
      <span style={{ marginRight: "5px" }}>Time Remaining: </span> {formatTimer(secondsLeft)}
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <div className="container px-lg-5" style={{ marginTop: "20px" }}>
        <div className="row justify-content-center">
          <div className="col">
            {this.props.gameOver ? (
              <>
                <GameOver score={this.props.score} resetGame={this.props.resetGame} />
              </>
            ) : (
              <Timer timeUp={this.props.timeUp} />
            )}

            <div className="row ">
              <div className="col offset-3">
                <LetterGrid lettersOnBoard={this.props.lettersOnBoard} />
                <InputWord
                  addWord={this.props.addWord}
                  lettersOnBoard={this.props.lettersOnBoard}
                  gameOver={this.props.gameOver}
                ></InputWord>
              </div>
              <div className="col-3" style={{ marginTop: "10px" }}>
                <ul className="list-group">
                  <li className="list-group-item list-group-item-info">
                    Words (Score: {this.props.score})
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
    score: state.gameState.score,
    lettersOnBoard: state.gameState.lettersOnBoard,
    gameOver: state.gameState.gameOver,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addWord: (word) => dispatch(action.addWord(word)),
    timeUp: () => dispatch(action.gameOver()),
    resetGame: (board) => dispatch(action.playAgain(board)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
