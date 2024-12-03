import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import clientReducer from './clientSlice'
import appReducer from './appSlice'
import employeeReducer from './employeeSlice'


const store = configureStore({
    reducer:{
        auth:authReducer,
        client:clientReducer,
        employee:employeeReducer,
        app:appReducer,
    }
})
export default store



