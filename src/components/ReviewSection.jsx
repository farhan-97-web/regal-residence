import React from 'react';
import ReviewCard from './ReviewCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ReviewSection = () => {
    const {data:allReview,refetch} = useQuery({
        queryKey:['review'],
        queryFn:async ()=>{
            const {data} =await axios(`${import.meta.env.VITE_API_URL}/review`)
            return data
        }
    })
    return (
        <div>
            <p className='text-xl lg:text-3xl font-bold text-center my-5'>Customers Review</p>
            <div className='lg:grid lg:grid-cols-4 lg:m-7'>
            {
                allReview?.map(review => <ReviewCard key={review?._id} review={review}></ReviewCard>)
            }
            
        </div>
        </div>
    );
};

export default ReviewSection;