import axios from 'axios';
import * as actionTypes from './actionTypes';

export const checkAuthTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup, adicionalUserData) => {
   // console.log(email, password, isSignup, adicionalUserData)
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        const apiKey = 'AIzaSyA49aPuUEubUlCXuIBIx-N4Xzd_VyEg-Uk';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= ${apiKey}`
        if (!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        }
        axios.post(url, authData)
            .then(response => {
                //console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)

                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(checkAuthTime(response.data.expiresIn));
                if (isSignup) {
                    dispatch(userAdicionalData(response.data.localId, response.data.idToken, adicionalUserData))
                }
            })
            .catch(err => {
                //console.log(err.response);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (userId, tokenId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId,
        tokenId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(userId, token));
                dispatch(checkAuthTime((expirationDate.getTime() - new Date().getTime()) / 100))
            } else {
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    }
}

export const userAdicionalData = (userId, token, adicionalUserData) => {
    return dispatch => {
        dispatch(userAdicionalDataStart())
        axios.post(`https://react-gamedb.firebaseio.com/userData/${userId}.json?auth=${token}`, adicionalUserData)
            .then(response => {
                dispatch(userAdicionalDataSuccess(response.data.name, adicionalUserData))
            })
            .catch(error => {
                dispatch(userAdicionalDataFail(error))
            });
    }

}

export const userAdicionalDataSuccess = (id, adicionalUserData) => {
    return {
        type: actionTypes.USER_ADICIONAL_DATA_SUCCESS,
        id,
        adicionalUserData
    };
}

export const userAdicionalDataFail = (error) => {
    return {
        type: actionTypes.USER_ADICIONAL_DATA_FAIL,
        error
    };
}

export const userAdicionalDataStart = () => {
    return {
        type: actionTypes.USER_ADICIONAL_DATA_START
    }
}

export const fetchUserAdicionalData = (token, userId) => {
    return dispatch => {
        dispatch(fetchUserAdicionalDataStart())
        //const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        let auth = `?auth=${token}`;
        if (token === null) {
            auth = '';
        }
        axios.get(`https://react-gamedb.firebaseio.com/userData/${userId}.json${auth}`)
            .then(res => {
                
                let userData;

                for (let key in res.data) {
                    userData = {
                        id: key,
                        ...res.data[key]
                    }

                }
                //console.log(userData)
                dispatch(fetchUserAdicionalDataSuccess(userData))
            })
            .catch(err => {
                dispatch(fetchUserAdicionalDataFail(err))
            })
    }
}

export const fetchUserAdicionalDataSuccess = (userData) => {
    return {
        type: actionTypes.FETCH_USER_ADICIONAL_DATA_SUCCESS,
        userData
    };
}

export const fetchUserAdicionalDataFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_ADICIONAL_DATA_FAIL,
        error
    };
}

export const fetchUserAdicionalDataStart = () => {
    return {
        type: actionTypes.FETCH_USER_ADICIONAL_DATA_START
    }
}


