import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const completedGameSuccess = (id, completedData) => {
    return {
        type: actionTypes.COMPLETED_GAME_SUCCESS,
        completedId: id,
        completedData
    };
}

export const completedGameFail = (error) => {
    return {
        type: actionTypes.COMPLETED_GAME_FAIL,
        error
    };
}

export const completedGameStart = () => {
    return {
        type: actionTypes.COMPLETED_GAME_START
    }
}

export const completedGame = (completedData,token) => {
    return dispatch => {
        dispatch(completedGameStart())
        //axios.post(`https://react-gamedb.firebaseio.com/likes.json?auth=${token}`, likeData)
        axios.post(`https://react-gamedb.firebaseio.com/completed/${completedData.userId}/${completedData.gameId}.json?auth=${token}`,new Date())
            .then(response => {
                dispatch(completedGameSuccess(response.data.name, completedData))
            })
            .catch(error => {
                dispatch(completedGameFail(error))
            });
    }
}


export const uncompletedGameSuccess = (uncompletedData) => {
    return {
        type: actionTypes.UNCOMPLETED_GAME_SUCCESS,
        uncompletedData
    };
}

export const uncompletedGameFail = (error) => {
    return {
        type: actionTypes.UNCOMPLETED_GAME_FAIL,
        error
    };
}

export const uncompletedGameStart = () => {
    return {
        type: actionTypes.UNCOMPLETED_GAME_START
    }
}

export const uncompletedGame = (uncompletedData,token) => {
    //https://mrdapper.firebaseio.com/v0/userFavs/41/107657061.json
    // console.log(`https://react-gamedb.firebaseio.com/likes/${likeId}.json?auth=${token}`)
    return dispatch => {
        dispatch(uncompletedGameStart())
        axios.delete(`https://react-gamedb.firebaseio.com/completed/${uncompletedData.userId}/${uncompletedData.id}.json?auth=${token}`)
            .then(response => {
                //console.log(response)
                //console.log(likeData)
                dispatch(uncompletedGameSuccess(uncompletedData))
            })
            .catch(error => {
               console.log(error)
                dispatch(uncompletedGameFail(error))
            });
    }
}



export const fetchCompletedSuccess = (fetchedCompleted) => {
    return {
        type: actionTypes.FETCH_COMPLETED_SUCCESS,
        fetchedCompleted
    };
}

export const fetchCompletedFail = (error) => {
    return {
        type: actionTypes.FETCH_COMPLETED_FAIL,
        error
    };
}

export const fetchCompletedStart = () => {
    return {
        type: actionTypes.FETCH_COMPLETED_START
    }
}


export const fetchCompleted = (token, userId) => {
    return dispatch => {
        dispatch(fetchCompletedStart())
        //const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get(`https://react-gamedb.firebaseio.com/completed/${userId}.json?auth=${token}`)
            .then(res => {

                const fetchedCompleted = [];
                for (let key in res.data) {
                    fetchedCompleted.push({
                        ...res.data[key],
                        id: key
                    });
                }
                //console.log(fetchedLikes)
                dispatch(fetchCompletedSuccess(fetchedCompleted))
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchCompletedFail(err))
            })
    }
}



