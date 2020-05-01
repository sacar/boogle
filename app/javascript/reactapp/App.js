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
    // let wordIsValid = true;
    let board =  Array(16).fill(0).map((e,i) => e + i);
    let validPositions = [...board];
    const validPosition = (e) => {
      return
    };

    const vp = (e, b) => {

    }

    const updateValidPos = (slp,board) => {
      let newPos = [];
      slp.forEach((e) => {
        let col1 = e % 4; 
        let row1 = Math.floor(e / 4) ;
        board.forEach((f) => {
          let col2 = f % 4; 
          let row2 = Math.floor(f / 4) ;
          if(!(col1 === col2 && row1 === row2) && !(Math.abs(col1-col2) > 1 || Math.abs(row1-row2) > 1) ){
            newPos = [...newPos,f]
          }
        });
      });
      return [...new Set(newPos)];
    }
    
    const wordIsValid = (word,board,validPos) => {
      
      // return if reached end of word
      if (word.length === 0) {
        return true;
      }

      let currentLetter = word[0];
      // get all cell position of the current letter
      let possiblePos = props.lettersOnBoard.reduce((acc,l,i)=>(l === currentLetter ? [...acc, i] : acc ),[]);
      // filter all positions that are not adjacent to previous letter
      possiblePos = possiblePos.filter((e)=>(validPos.indexOf(e) !== -1));
      // if no cell position is valid then return false
      if (possiblePos.length === 0) {
        return false;
      }

      // check all the combination of valid position that can produce the word
      for(let index=0; index<possiblePos.length; index++) {
        
        // remove the selected position from the board
        let newBoard = board.filter((e)=>(e !== possiblePos[index]));
        // get all adjacent cells of the current cell
        let newPossiblePos = updateValidPos([possiblePos[index]],newBoard);
       
        let newWord = word.slice(1);
        
        // checks if the next letter can be selected or not
        if (wordIsValid(newWord,newBoard,newPossiblePos)) {
          return true;
        }
      }

      return false;
     
    }

    let enteredWord = [...word.toUpperCase()];
    

    
    // [...word.toUpperCase()].forEach((letter) => {
    //   console.log("letters on board", [...props.lettersOnBoard]);
    //   let selectedLetterPositions = props.lettersOnBoard.reduce((acc,l,i)=>(l === letter ? [...acc, i] : acc ),[]);
    //   selectedLetterPositions = selectedLetterPositions.filter((e)=>(validPositions.indexOf(e) !== -1));
    //   console.log(letter + " is at position " , selectedLetterPositions);
    //   if (selectedLetterPositions.length === 0) {
    //     wordIsValid = false;
    //   }
    //   if (wordIsValid) {
    //    console.log("new valid", updateValidPos(selectedLetterPositions,board));
    //    validPositions = updateValidPos(selectedLetterPositions,board);
      
    //   }

    // });

    // console.log("Word is valid", wordIsValid);
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
