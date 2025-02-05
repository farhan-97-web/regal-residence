import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RCard from './RCard';

const UserReview = () => {
  const { user } = useContext(AuthContext);

  const { data: reviewData = [], isLoading, error,refetch } = useQuery({
    queryKey: ['review', user?.email],
    enabled: !!user?.email, // Prevent query if email is undefined
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/review/${user?.email}`);
      console.log('Fetched Reviews:', data); // Debug log
      return data;
    },
  });

  const handleDelete = async review =>{
    try{
        // fetch del req
        await axios.delete(`${import.meta.env.VITE_API_URL}/review/${review._id}`)
        // call refatch to refresh ui
        refetch()
      }catch(err){
        console.log(err);
      }
}

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error loading reviews: {error.message}</div>;
  }

  if (!reviewData.length) {
    return <div>No reviews found.</div>;
  }

  return (
    <div>
      {reviewData.map((review) => (
        <RCard handleDelete={handleDelete} review={review} key={review._id} />
      ))}
    </div>
  );
};

export default UserReview;
