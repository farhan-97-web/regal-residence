import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyAdded = () => {
    const { user } = useContext(AuthContext);

// handle delete
const handleDelete = async (id)=>{
  try{
    // fetch del req
    await axios.delete(`${import.meta.env.VITE_API_URL}/property/delete/${id}`)
    // call refatch to refresh ui
    refetch()
  }catch(err){
    console.log(err);
  }
}




    const { data: myAdded = [], isLoading, error,refetch } = useQuery({
        queryKey: ['added', user?.email],
        enabled: !!user?.email, // Prevent query if email is undefined
        queryFn: async () => {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/properties/${user?.email}`);
          return data;
        },
      });
    
      if (isLoading) {
        return <Loading></Loading>;
      }
    
      if (error) {
        return <div>Error loading property: {error.message}</div>;
      }
    
      if (!myAdded.length) {
        return <div>No items in the property.</div>;
      }
    return (
        <div className='lg:grid lg:grid-cols-3'>
           
            {
                myAdded?.map(property => <div key={property._id} className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
                    >
                      <div className='flex flex-col gap-2 w-full'>
                        <div
                          className='
                              aspect-square 
                              w-full 
                              relative 
                              overflow-hidden 
                              rounded-xl
                            '
                        >
                          <img
                            className='
                                object-cover 
                                h-full 
                                w-full 
                                group-hover:scale-110 
                                transition
                              '
                            src={property.image}
                            alt='Plant Image'
                          />
                          <div
                            className='
                              absolute
                              top-3
                              right-3
                            '
                          ></div>
                        </div>
                        <div className='font-semibold text-lg'>Property location :{property.location} </div>
                        
                        
                        <div className='flex flex-row items-center gap-1'>
                          <div className='font-semibold'>Price Range: {property?.price}$</div>
                        </div>
                        <div className='font-semibold text-lg'>Verfication Status: {property?.verificationStatus}</div>
                        <div className='divider'></div>
                        <div>
                            <p>Agent name : {property?.agent?.aName}</p>
                        </div>
                        <div className='divider'></div>
                        <div>
                            <Link to={`/dashboard/update/${property._id}`}><button className={`btn ${property.verificationStatus === 'rejected' && 'hidden'}`}>Update</button></Link>
                            <button onClick={()=>handleDelete(property._id)} className="btn">Delete</button>
                        </div>

                      </div>
                      
                    </div>)
            }
        </div>
    );
};

export default MyAdded;