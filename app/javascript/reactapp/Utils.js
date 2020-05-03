const updateValidPos = (slp, board) => {
  let newPos = [];
  slp.forEach((e) => {
    let col1 = e % 4;
    let row1 = Math.floor(e / 4);
    board.forEach((f) => {
      let col2 = f % 4;
      let row2 = Math.floor(f / 4);
      if (
        !(col1 === col2 && row1 === row2) &&
        !(Math.abs(col1 - col2) > 1 || Math.abs(row1 - row2) > 1)
      ) {
        newPos = [...newPos, f];
      }
    });
  });
  return [...new Set(newPos)];
};

const wordIsValid = (word, board, validPos, lettersOnBoard) => {
  // return if reached end of word
  if (word.length === 0) {
    return true;
  }

  let currentLetter = word[0];
  // get all cell position of the current letter
  let possiblePos = lettersOnBoard.reduce(
    (acc, l, i) => (l === currentLetter ? [...acc, i] : acc),
    []
  );
  // filter all positions that are not adjacent to previous letter
  possiblePos = possiblePos.filter((e) => validPos.indexOf(e) !== -1);
  // if no cell position is valid then return false
  if (possiblePos.length === 0) {
    return false;
  }

  // check all the combination of valid position that can produce the word
  for (let index = 0; index < possiblePos.length; index++) {
    // remove the selected position from the board
    let newBoard = board.filter((e) => e !== possiblePos[index]);
    // get all adjacent cells of the current cell
    let newPossiblePos = updateValidPos([possiblePos[index]], newBoard);

    let newWord = word.slice(1);

    // checks if the next letter can be selected or not
    if (wordIsValid(newWord, newBoard, newPossiblePos, lettersOnBoard)) {
      return true;
    }
  }

  return false;
};

export const newBoard = Array(16)
  .fill(null)
  .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

export default wordIsValid;
