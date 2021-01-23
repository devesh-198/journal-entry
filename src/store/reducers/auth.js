import { createSlice } from '@reduxjs/toolkit';

const authStart = (state, action) => {
    return (
        state.error = null, 
        state.loading = true
    )
}

const authSuccess = (state, action) => {
    return (
        state.token = action.payload.idToken,
        state.userId = action.payload.userId,
        state.error = null,
        state.loading = false
    )
}

const authFail = (state, action) => {
    return (
        state.error = action.payload.error,
        state.loading = false
    )
}

const authLogout = (state, action) => {
    return (
        state.token = null,
        state.userId = null
    )
}

const setAuthRedirectPath = (state, action) => {
    return (
        state.authRedirectPath = action.payload.path
    )
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    },
    reducers: {
        AUTH_START: (state, action) => {
            authStart(state, action)
        },
        AUTH_SUCCESS: (state,action) => {
            authSuccess(state, action)
        },
        AUTH_FAIL: (state, action) => {
            authFail(state, action)
        },
        AUTH_LOGOUT: (state, action) => {
            authLogout(state, action)
        },
        SET_AUTH_REDIRECT_PATH: (state, action) => {
            setAuthRedirectPath(state, action)
        }
    }
})

export default authSlice.reducer;

export const {
    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL, 
    AUTH_LOGOUT, 
    SET_AUTH_REDIRECT_PATH
} = authSlice.actions