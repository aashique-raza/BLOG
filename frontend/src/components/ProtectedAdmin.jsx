
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedAdmin() {
    const{UserData}=useSelector((state)=>state.user)

    return UserData && UserData.isAdmin ? <Outlet/> :  <Navigate to={'/login'}/>
}

export default ProtectedAdmin