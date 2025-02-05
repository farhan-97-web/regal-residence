import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";


const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const {data : isAdmin, isPending : isAdminLoading} = useQuery({
        queryKey : [user?.email, 'isAdmin'],
        queryFn : async() =>{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/admin/${user.email}`)
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;