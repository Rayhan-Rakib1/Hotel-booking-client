import React, {  useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    
    if(user){
        return children;
    }

    return <Navigate to='/signIn' state={location?.pathname}></Navigate>
};

export default PrivateRoute;