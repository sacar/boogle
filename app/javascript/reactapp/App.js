import React from "react";
import { connect } from "react-redux";
import * as action from "./redux/actions/actions";
import GameOver from "./Components/gameOver";
import LetterGrid from "./Components/letterGrid";
import InputWord from "./Components/inputComponent";
import Timer from "./Components/timer";
class App extends React.Component {
  render() {
    return (
      <div className="container px-lg-5" style={{ marginTop: "20px" }}>
        <div className="row justify-content-center">
          <div className="col">
            {this.props.gameOver ? (
              <GameOver
                score={this.props.score}
                resetGame={this.props.resetGame}
              />
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
