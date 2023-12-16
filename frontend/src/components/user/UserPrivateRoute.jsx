import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function UserPrivateRoute() {
    const {userInfo}=useSelector((state)=>state.auth)
    return userInfo? <Outlet/> : <Navigate to='/login' replace/>
}

export default UserPrivateRoute