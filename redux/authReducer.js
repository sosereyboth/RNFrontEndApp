import * as actionTypes from './actions'

const initialState = {
    authenticated: false,
    appLoading: true,
    token: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTHENTICATED:
            return { ...state, authenticated: action.payload }
        case actionTypes.SET_APP_LOADING:
            return { ...state, appLoading: action.payload }
        case actionTypes.SET_TOKEN:
            return { ...state, token: action.payload }
        default:
            return state;
    }
}
