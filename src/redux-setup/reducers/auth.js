import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
        currentCustomer: null,
        logged: false,
        error: null,    
    }
}; 
const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.login.currentCustomer = action.payload;
            state.login.logged = true;
        },
        loggedOut: (state, action) => {
            state.login.currentCustomer = null;
            state.login.logged = false;
            state.login.error = null;
        },
        updatedCustomer: (state, action) => {
            state.login.currentCustomer.customer.fullName = action.payload.fullName; 
            state.login.currentCustomer.customer.fullName = action.payload.phone; 
            state.login.currentCustomer.customer.fullName = action.payload.adress; 
        },
        updateAccessToken: (state, action) => {
            state.login.currentCustomer.accessToken = action.payload.newAccessToken;
        },
    }
});
export const {loggedIn, loggedOut, updatedCustomer, updateAccessToken} = authReducer.actions;
export default authReducer.reducer;