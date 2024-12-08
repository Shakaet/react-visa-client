import React, { useContext } from 'react';
import { AuthContext } from './Provider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    let {user,loading}= useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <div className='flex justify-center'><span className="loading loading-bars loading-lg"></span></div>
    }

    if(user){
        return children
    }
    return (
        <div>
            <Navigate  state={{from:location.pathname}} to="/login"></Navigate>
        </div>
    );
};

export default PrivateRoute;