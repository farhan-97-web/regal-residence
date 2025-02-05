
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
const ManageUsers = () => {
    // handle make admin
const handleMakeAdmin = async user =>{
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount > 0){
            toast.success(`${user.name} is Admin now`)
            refetch()
        }
    })
}
// handle make agent
const handleMakeAgent = async user =>{
  axiosSecure.patch(`/users/agent/${user._id}`)
  .then(res => {
      console.log(res.data);
      if(res.data.modifiedCount > 0){
          toast.success(`${user.name} is Agent now`)
          refetch()
      }
  })
}




    // handle delete
    const handleDelete = async user =>{
        try{
            // fetch del req
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/${user._id}`)
            // call refatch to refresh ui
            refetch()
          }catch(err){
            console.log(err);
          }
    }


    const {data:users=[],refetch} = useQuery({
        queryKey : ['users'],
        queryFn : async ()=>{
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`,{
              headers : {
                authorization : `bearer ${localStorage.getItem('access-token')}`
              }
            });
      return data;
        }
    })
    return (
        <div>
           

            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map(user => <tr key={user?._id}>
            
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{
                user.role === 'admin'? 'Admin' :
                <button onClick={()=>handleMakeAdmin(user)} className="btn">Make Admin</button>
                }
                </td>
            <td>
              {
                user?.role === 'agent'? 'Agent' : <button onClick={()=>handleMakeAgent(user)} className="btn">Make Agent</button>
              }
            </td>
            {
                user?.role == 'agent'? <td><button className="btn">Mark as Fraud</button></td>
                :
                ''
            }
            <td><button onClick={()=>handleDelete(user)} className="btn">Delete user</button></td>
          </tr>)
      }
     
     
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default ManageUsers;