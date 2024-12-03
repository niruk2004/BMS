import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:'app',
    initialState:{
        dashboard:false
    },
    reducers:{
        toggleDashBoard(state,action){
            state.dashboard = !state.dashboard;
        },
        resetDashBoard(state,action){
            state.dashboard=false;
        }
    }
})

export const {toggleDashBoard,resetDashBoard} = appSlice.actions
export default appSlice.reducer

