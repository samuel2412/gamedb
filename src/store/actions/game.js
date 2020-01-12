import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchGames = (url = `https://api.rawg.io/api/games?page_size=6`) => { 
return dispatch => {
        dispatch(fetchGamesStart())
        axios.get(url)
            .then(response => {
                console.log(response)
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
