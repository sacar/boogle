import { combineReducers } from 'redux';
import gameState from './wordReducer';

const rootReducer = combineReducers({
    gameState
});

export default rootReducer;