
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
export const SET_APP_LOADING = 'SET_APP_LOADING';
export const SET_TOKEN = 'SET_TOKEN';

export const setAuthenticated = authenticated => dispatch => {
    dispatch({
        type: SET_AUTHENTICATED,
        payload: authenticated
    })
}
export const setAppLoading = appLoading => dispatch => {
    dispatch({
        type: SET_APP_LOADING,
        payload: appLoading
    })
}

export const setToken = token => dispatch => {
    dispatch({
        type: SET_TOKEN,
        payload: token
    })
}