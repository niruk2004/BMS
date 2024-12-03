import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedin:false,
        userType:null,
        userId:null,
        authToken:null,
    },
    reducers:{
        login(state,action){
            //handle Login in firebase
            state.isLoggedin = true;
            state.userType = action.payload.userType;

            
        },
        logout(state,action){
            //handle Logout in firebase
            state.isLoggedin=false;
            state.userType = null;
            // console.log("LoggedOut"); works
        },
        setAuthToken(state,action){
            state.authToken = action.payload;
        },
    }
})

export const {logout,login,setAuthToken} = authSlice.actions
export default authSlice.reducer


