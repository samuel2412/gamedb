import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    games: [],
    nextPage: null,
    prevPage: null,
    isLoading: false,
    gamesFetched: false,
}

const fetchGamesStart = (state,action) => {
    return updateObject(state, {
        isLoading: true
    });
} 
const fetchGamesSuccess = (state,action) => {
    return updateObject(state, {
        games: action.data.results,
        nextPage: action.data.next,
        prevPage: action.data.previous,
        isLoading: false,
        gamesFetched: !state.gamesFetched
    });
} 
const fetchGamesFail = (state,action) => {
    return updateObject(state, {
        isLoading: false
    });
} 

const fetchGameDetailStart = (state,action) => {
    return updateObject(state, {
        isLoading: true
    });
} 
const fetchGameDetailSuccess = (state,action) => {
   
    const indexOldElement = state.games.findIndex(({ id }) => id == action.data.id);
    const newArray = Object.assign([... state.games], {[indexOldElement]:  action.data});

    return updateObject(state, {
        games: newArray,
        isLoading: false
    });
   
} 
const fetchGameDetailFail = (state,action) => {
   return updateObject(state, {
        isLoading: false
    });
} 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_GAMES_START): return fetchGamesStart(state, action)
        case (actionTypes.FETCH_GAMES_SUCCESS): return fetchGamesSuccess(state, action)
        case (actionTypes.FETCH_GAMES_FAIL): return fetchGamesFail(state, action)
        case (actionTypes.FETCH_GAME_DETAIL_START): return fetchGameDetailStart(state, action)
        case (actionTypes.FETCH_GAME_DETAIL_SUCCESS): return fetchGameDetailSuccess(state, action)
        case (actionTypes.FETCH_GAME_DETAIL_FAIL): return fetchGameDetailFail(state, action)
        default: return state;
    }
}

export default reducer;
