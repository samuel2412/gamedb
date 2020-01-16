import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
   completeds: [],
}

const completedGameStart = (state, action) => {
    return updateObject(state, {
    });
};
const completedGameSuccess = (state, action) => {
    
    const newLike = updateObject(action.completedData, { id: action.completedData.gameId });
    return updateObject(state, {
        completeds: state.completeds.concat(newLike)
    });
    
};
const completedGameFail = (state, action) => {
    return updateObject(state, {
    });
};



const uncompletedGameStart = (state, action) => {
    return updateObject(state, {
    });
};
const uncompletedGameSuccess = (state, action) => {
    const newDiscompleted = updateObject(action.uncompletedData, { id: action.uncompletedData.id });
    const index = state.completeds.findIndex(completed => completed.id === newDiscompleted.id);
    //return [...state.slice(0, index), ...state.slice(index + 1)];
  return updateObject(state, {
        completeds: state.completeds.slice(0,index)
    });
   
};
const uncompletedGameFail = (state, action) => {
    return updateObject(state, {
    });
};




const fetchCompletedStart = (state, action) => {
    return updateObject(state, {
    });
};
const fetchCompletedSuccess = (state, action) => {
    return updateObject(state, {
        completeds: action.fetchedCompleted,
    });
};
const fetchCompletedFail = (state, action) => {
    return updateObject(state, {
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.COMPLETED_GAME_START): return completedGameStart(state, action)
        case (actionTypes.COMPLETED_GAME_SUCCESS): return completedGameSuccess(state, action)
        case (actionTypes.COMPLETED_GAME_FAIL): return completedGameFail(state, action)
        case (actionTypes.UNCOMPLETED_GAME_START): return uncompletedGameStart(state, action)
        case (actionTypes.UNCOMPLETED_GAME_SUCCESS): return uncompletedGameSuccess(state, action)
        case (actionTypes.UNCOMPLETED_GAME_FAIL): return uncompletedGameFail(state, action)
       
        case (actionTypes.FETCH_COMPLETED_START): return fetchCompletedStart(state, action)
        case (actionTypes.FETCH_COMPLETED_SUCCESS): return fetchCompletedSuccess(state, action)
        case (actionTypes.FETCH_COMPLETED_FAIL): return fetchCompletedFail(state, action)
        default: return state;
    }
}

export default reducer;