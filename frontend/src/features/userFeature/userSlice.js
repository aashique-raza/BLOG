

import { createSlice } from "@reduxjs/toolkit";


const initialState={
    UserData:null,
    error:null,
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state,action)=>{
            state.loading=true
            state.error=null
        },
        loginSuccess:(state,action)=>{
            state.UserData=action.payload,
            state.loading=false
            state.error=null
        },
        loginFailiure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})


export const {loginFailiure,loginStart,loginSuccess}=userSlice.actions

export default userSlice.reducer