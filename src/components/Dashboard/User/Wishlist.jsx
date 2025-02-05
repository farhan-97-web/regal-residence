import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const handleDelete = async (id)=>{
    try{
      // fetch del req
      await axios.delete(`${import.meta.env.VITE_API_URL}/wishlist/${id}`)
      // call refatch to refresh ui
      refetch()
    }catch(err){
      console.log(err);
    }
  }

  const { data: wishlist = [], isLoading, error,refetch } = useQuery({
    queryKey: ['wish', user?.email],
    enabled: !!user?.email, // Prevent query if email is undefined
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/wishlist/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading wishlist...</div>;
  }

  if (error) {
    return <div>Error loading wishlist: {error.message}</div>;
  }

  if (!wishlist.length) {
    return <div>No items in the wishlist.</div>;
  }

  return (
    <div className='lg:grid lg:grid-cols-3'>
      {wishlist.map((wish) => (
        
            <div key={wish?._id} className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl">
          <div className="flex flex-col gap-2 w-full">
            <div
              className="
                aspect-square 
                w-full 
                relative 
                overflow-hidden 
                rounded-xl
              "
            >
              <img
                className="
                  object-cover 
                  h-full 
                  w-full 
                  group-hover:scale-110 
                  transition
                "
                src={wish?.building?.image}
                alt="Plant Image"
              />
            </div>
            <div className="font-semibold text-lg">Property location: {wish?.building?.location}</div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold">Price Range: {wish?.building?.price}$</div>
            </div>
            <div className="font-semibold text-lg">Verification Status:  {wish?.building?.verificationStatus}</div>
            <div className='flex justify-between'>
              <div>
                <Link to={`/dashboard/buy/${wish?.building?._id}`}><button className="btn">Make an offer</button></Link>
              </div>
              <div>
                <button onClick={()=>handleDelete(wish?._id)} className="btn">Remove</button>
              </div>
            </div>
          </div>
        </div>
       
      ))}
    </div>
  );
};

export default Wishlist;
