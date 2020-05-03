
import { newBoard } from '../../Utils';

const initialState = {
  lettersOnBoard: newBoard,
  words: [],
  score: 0,
  gameOver: false,
};

export default function wordReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_WORD":
      if ( state.words.indexOf(action.word) === -1 ){
        return {...state, words: [...state.words, action.word ], score: state.score + action.word.length};
      } else {
        return state;
      }
    
    case "GAME_OVER":
      return {...state, gameOver: true}
    
    case "PLAY_AGAIN":
      return { ...state, lettersOnBoard: action.board, words: [], score: 0, gameOver: false}
      
    default:
      return state;
  }
}
