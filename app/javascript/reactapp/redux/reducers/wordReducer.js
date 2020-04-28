const lettersOnBoard = Array(16)
  .fill(null)
  .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

const initialState = {
  lettersOnBoard: lettersOnBoard,
  words: [],
};

export default function wordReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_WORD":
      return {...state, words: [...state.words, action.word ]};
    default:
      return state;
  }
}
