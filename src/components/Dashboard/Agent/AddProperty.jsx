import React, { useContext, useState } from 'react';
import { imageUpload } from '../../../api/utility';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AddProperty = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [imgUploadText,setImgUploadText] = useState('Upload Image')
    const handleSubmit =async e =>{
       
        e.preventDefault();
        const propertyName = e.target.name.value;
        const location = e.target.location.value;
        const price = parseInt(e.target.price.value);
        
        const image = e.target.image.files[0];
        
        const imageUrl = await imageUpload(image);
        const agent = {
            aName : e.target.aName.value,
            email : e.target.email.value
        }

        const propertyData = {
            propertyName,location,price,
            image: imageUrl,
            agent,verificationStatus : 'pending'
        }
        console.log(propertyData);
        // save data in db
        // post req
        try{
            await axiosSecure.post('/properties', propertyData)
        toast.success('Data added successfully')
        }catch(err){
            console.log(err);
        }
        
        



    }



    return (
        <div>
             <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
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
                placeholder='Property Name'
                required
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
                placeholder='Location Name'
                required
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
                  placeholder='Price'
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
                  value={user?.displayName}
                  required
                  disabled
                />
              </div>

              {/* Email */}
              <div className='space-y-1 text-sm'>
                <label htmlFor='email' className='block text-gray-600'>
                  Agent Email
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
            </div>
            {/* Image */}
            <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      onChange={(e)=>setImgUploadText(e.target.files[0].name)}
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
                      {imgUploadText}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
        </div>
    );
};

export default AddProperty;