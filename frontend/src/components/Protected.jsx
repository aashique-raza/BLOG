

import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Protected() {

    const{UserData}=useSelector((state)=>state.user)

    return UserData ? <Outlet/> :  <Navigate to={'/login'}/>
  
}

export default Protected