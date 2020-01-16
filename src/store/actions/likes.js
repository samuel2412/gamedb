import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const likeGameSuccess = (id, likeData) => {
    return {
        type: actionTypes.LIKE_GAME_SUCCESS,
        likeId: id,
        likeData
    };
}

export const likeGameFail = (error) => {
    return {
        type: actionTypes.LIKE_GAME_FAIL,
        error
    };
}

export const likeGameStart = () => {
    return {
        type: actionTypes.LIKE_GAME_START
    }
}

export const likeGame = (likeData,token) => {
    return dispatch => {
        dispatch(likeGameStart())
        //axios.post(`https://react-gamedb.firebaseio.com/likes.json?auth=${token}`, likeData)
        axios.post(`https://react-gamedb.firebaseio.com/likes/${likeData.userId}/${likeData.gameId}.json?auth=${token}`,new Date())
            .then(response => {
                dispatch(likeGameSuccess(response.data.name, likeData))
            })
            .catch(error => {
                dispatch(likeGameFail(error))
            });
    }
}


export const dislikeGameSuccess = (likeData) => {
    return {
        type: actionTypes.DISLIKE_GAME_SUCCESS,
        likeData
    };
}

export const dislikeGameFail = (error) => {
    return {
        type: actionTypes.DISLIKE_GAME_FAIL,
        error
    };
}

export const dislikeGameStart = () => {
    return {
        type: actionTypes.DISLIKE_GAME_START
    }
}

export const dislikeGame = (likeData,token) => {
    //https://mrdapper.firebaseio.com/v0/userFavs/41/107657061.json
    // console.log(`https://react-gamedb.firebaseio.com/likes/${likeId}.json?auth=${token}`)
    return dispatch => {
        dispatch(dislikeGameStart())
        axios.delete(`https://react-gamedb.firebaseio.com/likes/${likeData.userId}/${likeData.id}.json?auth=${token}`)
            .then(response => {
                //console.log(response)
                //console.log(likeData)
                dispatch(dislikeGameSuccess(likeData))
            })
            .catch(error => {
                console.log(error)
                dispatch(dislikeGameFail(error))
            });
    }
}



export const fetchLikesSuccess = (fetchedLikes) => {
    return {
        type: actionTypes.FETCH_LIKES_SUCCESS,
        fetchedLikes
    };
}

export const fetchLikesFail = (error) => {
    return {
        type: actionTypes.FETCH_LIKES_FAIL,
        error
    };
}

export const fetchLikesStart = () => {
    return {
        type: actionTypes.FETCH_LIKES_START
    }
}


export const fetchLikes = (token, userId) => {
    return dispatch => {
        dispatch(fetchLikesStart())
        //const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get(`https://react-gamedb.firebaseio.com/likes/${userId}.json?auth=${token}`)
            .then(res => {

                const fetchedLikes = [];
                for (let key in res.data) {
                    fetchedLikes.push({
                        ...res.data[key],
                        id: key
                    });
                }
                //console.log(fetchedLikes)
                dispatch(fetchLikesSuccess(fetchedLikes))
            })
            .catch(err => {
                dispatch(fetchLikesFail(err))
            })
    }
}



