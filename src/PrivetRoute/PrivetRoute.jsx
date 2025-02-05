import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';



const PrivetRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children;
    }
    return <Navigate to={'/login'}></Navigate>
    return (
        <div>
            
        </div>
    );
};

export default PrivetRoute;