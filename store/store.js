import { createStore, applyMiddleware, combineReducers } from 'redux';
import citiesReducer from '../features/cities/citiesSlice';
import loginReducer from '../features/login/loginSlice';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
    cities: citiesReducer,
    login: loginReducer
});

// Abilita Redux DevTools se disponibile nel browser
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
