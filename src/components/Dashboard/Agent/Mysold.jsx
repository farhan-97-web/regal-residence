import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loading from '../../Loading/Loading';

const Mysold = () => {
  const {user} = useContext(AuthContext);

    

    const { data: properties = [], isLoading, error,refetch } = useQuery({
      queryKey: ['added', user?.email],
      enabled: !!user?.email, // Prevent query if email is undefined
      queryFn: async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/payment/${user?.email}`);
        return data;
      },
    });
  
    if (isLoading) {
      return <Loading></Loading>;
    }
  
    if (error) {
      return <div>Error loading property: {error.message}</div>;
    }
  
    if (!properties.length) {
      return <div>No items in the property.</div>;
    }



    return (
        <div>
          <p>Agent Name : {user?.displayName}</p>
            <p>Total property sold : {properties?.length}</p>
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
        <th>Sold Price</th>
        
      </tr>
        
    </thead>
    <tbody>
      {/* row 1 */}
      {
        properties?.map(property => <tr key={property?._id}>
            
            <td>{property?.propertyName}</td>
            <td>{property?.location}</td>
            <td>
                
                {property?.buyerName}
                </td>
            <td>
              
            {property?.email}
              
            </td>
            
                 <td>
                 {property?.price}
                    </td>
               
            
           
           
          </tr>)
      }
     
     
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default Mysold;