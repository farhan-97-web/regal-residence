import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const ReqProperty = () => {
    // const {data:reqProp=[],refetch} = useQuery({
    //     queryKey : ['req'],
    //     queryFn : async ()=>{
    //         const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/offer`);
    //   return data;
    //     }
    // })
    const {user} = useContext(AuthContext)
    const { data: reqProp = [], isLoading, error,refetch } = useQuery({
      queryKey: ['added', user?.email],
      enabled: !!user?.email, // Prevent query if email is undefined
      queryFn: async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/offerData/${user?.email}`);
        return data;
      },
    });
  
    if (isLoading) {
      return <Loading></Loading>;
    }
  
    if (error) {
      return <div>Error loading property: {error.message}</div>;
    }
  
    if (!reqProp.length) {
      return <div>No items in the property.</div>;
    }




    // handle accept
    const handleAccept = async req =>{
      axios.patch(`${import.meta.env.VITE_API_URL}/offer/${req._id}`)
      .then(res => {
          console.log(res.data);
          if(res.data.modifiedCount > 0){
              toast.success(`Purchase Request Accepted`)
              refetch()
          }
      })
    }
    return (
        <div>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Property Name</th>
        <th>Property Location</th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Offered Price</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
        
    </thead>
    <tbody>
      {/* row 1 */}
      {
        reqProp.map(req => <tr key={req?._id}>
            
            <td>{req?.propertyName}</td>
            <td>{req?.location}</td>
            <td>
                {req?.buyerName}
                
                </td>
            <td>
              
            {req?.buyerEmail}
              
            </td>
            
                 <td>
                 {req?.price}
                    </td>
               
            
            <td>
                {
                    req.verificationStatus === 'accepted'? 'accepted' : <button onClick={()=>handleAccept(req)} className="btn">Accept</button> 
                }
            </td>
            <td><button className={`btn ${req.verificationStatus === 'accepted' && 'btn-disabled'}`} >Reject</button></td>
          </tr>)
      }
     
     
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default ReqProperty;