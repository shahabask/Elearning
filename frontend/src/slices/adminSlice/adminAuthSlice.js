 import { createSlice } from "@reduxjs/toolkit";
// import authSlice from "../userSlice/authSlice"; 

 const initialState={
    adminInfo:localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
 }


 const adminAuthSlice=createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
       setAdminCredentials:(state,action)=>{
        state.adminInfo=action.payload
        localStorage.setItem('adminInfo',JSON.stringify(action.payload))
       },
       adminLogout:(state)=>{
        state.adminInfo=null;
        localStorage.removeItem('adminInfo')
       }
    }
 })


 export const {setAdminCredentials,adminLogout}=adminAuthSlice.actions

 export default adminAuthSlice.reducer