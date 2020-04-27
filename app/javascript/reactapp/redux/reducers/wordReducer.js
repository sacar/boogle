export default function wordReducer(state = [], action) {
  switch (action.type) {
    case "ADD_WORD":
      return [...state, action.word ];
    default:
      return state;
  }
}
