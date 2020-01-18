import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    tokenId: null,
    userId: null,
    error: null,
    loading: false,
    avatarUrl: null,
    userName: null,
};
const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        tokenId: action.tokenId,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { tokenId: null, userId: null });
};

const userAdicionalDataStart = (state,action) => {
    return updateObject(state, { error: null, loading: true });
}
const userAdicionalDataSuccess = (state,action) => {
    return updateObject(state, {
        avatarUrl: action.avatarUrl,
        userName: action.userName
    });
}
const userAdicionalDataFail = (state,action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const fetchUserAdicionalDataStart = (state,action) => {
    return updateObject(state, { error: null, loading: true });
}
const fetchUserAdicionalDataSuccess = (state,action) => {
    return updateObject(state, {
        avatarUrl: action.userData.avatarUrl,
        userName: action.userData.userName
    });
}
const fetchUserAdicionalDataFail = (state,action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.USER_ADICIONAL_DATA_START: return userAdicionalDataStart(state,action);
        case actionTypes.USER_ADICIONAL_DATA_SUCCESS: return userAdicionalDataSuccess(state,action);
        case actionTypes.USER_ADICIONAL_DATA_FAIL: return userAdicionalDataFail(state,action);
        case actionTypes.FETCH_USER_ADICIONAL_DATA_START: return fetchUserAdicionalDataStart(state,action);
        case actionTypes.FETCH_USER_ADICIONAL_DATA_SUCCESS: return fetchUserAdicionalDataSuccess(state,action);
        case actionTypes.FETCH_USER_ADICIONAL_DATA_FAIL: return fetchUserAdicionalDataFail(state,action);
        default: return state;
    }

}

export default reducer;