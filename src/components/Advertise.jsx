import React from 'react';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Advertise = () => {
   
    const {data:properties} = useQuery({
        queryKey:['properties'],
        queryFn:async ()=>{
            const {data} =await axios(`${import.meta.env.VITE_API_URL}/properties`)
            return data
        }
    })
    return (
       
        <>
        <p className='text-xl lg:text-3xl font-bold text-center my-5'>Advertisement</p>
            {
                properties && properties.length > 0? (
                  <div className='lg:grid lg:grid-cols-4'>
                    {
                        properties.map(property =>property.verificationStatus === 'verified' && <Card property={property} key={property._id}></Card>)
                    }
                  </div>  
                ) : <p>No data</p>
            }
        </>
    );
};

export default Advertise;