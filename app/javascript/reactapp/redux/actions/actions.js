export function addWord(word) {
  return {
    type: "ADD_WORD",
    word,
  };
}

export function gameOver() {
  return {
    type: "GAME_OVER"
  };
}


export function playAgain(board) {
  return {
    type: "PLAY_AGAIN",
    board,
  };
}
