import { combineReducers } from 'redux';
import getRoleListReducer from './getRoleListReducer'

const rootReducer = combineReducers({
    getRoleList: getRoleListReducer
});

export default rootReducer;
