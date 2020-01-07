import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchGames = (url = `https://api.rawg.io/api/games?page_size=6`) => {
console.log('fetch')  
return dispatch => {
        dispatch(fetchGamesStart())
        axios.get(url)
            .then(response => {
                dispatch(fetchGamesSuccess(response.data))
            })
            .catch(err => {
                dispatch(fetchGamesFail(err))
            })
    }
}

export const fetchGamesStart = () => {
    return {
        type: actionTypes.FETCH_GAMES_START
    }
}
export const fetchGamesSuccess = (data) => {
    return {
        type: actionTypes.FETCH_GAMES_SUCCESS,
        data
    };
}

export const fetchGamesFail = (error) => {
    return {
        type: actionTypes.FETCH_GAMES_FAIL,
        error
    };
}


export const fetchGameDetail = (id) => {
console.log('fetchDetail')    
return dispatch => {
        dispatch(fetchGameDetailStart())
        axios.get(`https://api.rawg.io/api/games/${id}`)
            .then(response => {
                dispatch(fetchGameDetailSuccess(response.data))
            })
            .catch(err => {
                dispatch(fetchGameDetailFail(err))
            })
    }
}

export const fetchGameDetailStart = () => {
    return {
        type: actionTypes.FETCH_GAME_DETAIL_START
    }
}
export const fetchGameDetailSuccess = (data) => {
    return {
        type: actionTypes.FETCH_GAME_DETAIL_SUCCESS,
        data
    };
}

export const fetchGameDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_GAME_DETAIL_FAIL,
        error
    };
}

