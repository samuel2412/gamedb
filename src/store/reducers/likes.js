import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
   likes: [],
}

const likeGameStart = (state, action) => {
    return updateObject(state, {
    });
};
const likeGameSuccess = (state, action) => {
    const newLike = updateObject(action.likeData, { id: action.likeId });
    return updateObject(state, {
        likes: state.likes.concat(newLike)
    });
};
const likeGameFail = (state, action) => {
    return updateObject(state, {
    });
};



const dislikeGameStart = (state, action) => {
    return updateObject(state, {
    });
};
const dislikeGameSuccess = (state, action) => {
    const newDislike = updateObject(action.likeId, { id: action.likeId });
    return updateObject(state, {
        likes: state.likes.filter(newDislike)
    });
};
const dislikeGameFail = (state, action) => {
    return updateObject(state, {
    });
};




const fetchLikesStart = (state, action) => {
    return updateObject(state, {
    });
};
const fetchLikesSuccess = (state, action) => {
    return updateObject(state, {
        likes: action.fetchedLikes,
    });
};
const fetchLikesFail = (state, action) => {
    return updateObject(state, {
    });
};
 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.LIKE_GAME_START): return likeGameStart(state, action)
        case (actionTypes.LIKE_GAME_SUCCESS): return likeGameSuccess(state, action)
        case (actionTypes.LIKE_GAME_FAIL): return likeGameFail(state, action)
        
        case (actionTypes.DISLIKE_GAME_START): return dislikeGameStart(state, action)
        case (actionTypes.DISLIKE_GAME_SUCCESS): return dislikeGameSuccess(state, action)
        case (actionTypes.DISLIKE_GAME_FAIL): return dislikeGameFail(state, action)
       
        case (actionTypes.FETCH_LIKES_START): return fetchLikesStart(state, action)
        case (actionTypes.FETCH_LIKES_SUCCESS): return fetchLikesSuccess(state, action)
        case (actionTypes.FETCH_LIKES_FAIL): return fetchLikesFail(state, action)
        default: return state;
    }
}

export default reducer;