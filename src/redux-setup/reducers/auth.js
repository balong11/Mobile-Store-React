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
        }
    }
});
export const {loggedIn, loggedOut} = authReducer.actions;
export default authReducer.reducer;