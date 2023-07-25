import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser'))
        : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('currentUser');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
