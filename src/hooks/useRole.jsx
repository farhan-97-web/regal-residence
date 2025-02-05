import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useRole = () => {
    const {user, loading} = useContext(AuthContext)
    const {data:role, isLoading} = useQuery({
        queryKey: ['role',user?.email],
        queryFn: async()=>{
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/users/role/${user?.email}`)
            return data.role;
        }
    })
    return [role,isLoading];
};

export default useRole;