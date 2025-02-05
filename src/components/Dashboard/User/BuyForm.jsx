import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BuyForm = () => {
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const {data: property = []
      ,isLoading,refetch} = useQuery({
      queryKey:['plant',id],
      queryFn: async ()=>{
        const {data} = await axios(`${import.meta.env.VITE_API_URL}/property/${id}`)
        return data
      }
      
    }
  
  )
//   handle offer
const handleOffer = async e =>{
    e.preventDefault();
    const propertyName = e.target.name.value;
        const location = e.target.location.value;
        const price = parseInt(e.target.price.value);
        const agentName = e.target.aName.value;
        const agentEmail = property?.agent?.email;
        const buyerName = e.target.buyerName.value;
        const buyerEmail = e.target.email.value;
        const currentTime = new Date().toLocaleTimeString();
        const verificationStatus = 'pending'

        const offerData = {propertyName,location,price,agentName,buyerName,buyerEmail,agentEmail,currentTime,verificationStatus}

        console.log(offerData);
        try{
          await axios.post(`${import.meta.env.VITE_API_URL}/offer`, offerData)
      toast.success('offer added successfully')
      }catch(err){
          console.log(err);
      }
        
}


    return (
        <div>
             <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleOffer}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
               Property Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='name'
                id='name'
                type='text'
                value={property.propertyName}
                required
                disabled
              />
            </div>
            {/* location */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='location' className='block text-gray-600'>
                Location
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                name='location'
                id='location'
                type='text'
                value={property.location}
                required
                disabled
              />
            </div>
            {/* Price */}
            <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600 '>
                  Price
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='price'
                  id='price'
                  type='number'
                  value={property.price}
                  disabled
                  required
                />
              </div>
          </div>
          <div className='space-y-6 flex flex-col'>
            
            <div className='flex justify-between gap-2'>
              {/*Agent Name */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='aName' className='block text-gray-600 '>
                  Agent Name
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='aName'
                  id='aName'
                  type='text'
                  value={property.agent?.aName}
                  required
                  disabled
                />
              </div>

              {/* Email */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='email' className='block text-gray-600'>
                  Buyer Email
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='email'
                  id='email'
                  type='text'
                  value={user?.email}
                  disabled
                  required
                />
              </div>
              {/* buyer Name */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='buyerName' className='block text-gray-600'>
                  Buyer Name
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='buyerName'
                  id='buyerName'
                  type='text'
                  value={user?.displayName}
                  disabled
                  required
                />
              </div>
            </div>
            
            

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
            >
              Offer
            </button>
          </div>
        </div>
      </form>
    </div>
        </div>
    );
};

export default BuyForm;