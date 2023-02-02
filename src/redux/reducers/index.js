// import wallet from './wallet';

import { combineReducers } from 'redux';
import { user } from './user';

const rootReducer = combineReducers({ user });

export default rootReducer;
