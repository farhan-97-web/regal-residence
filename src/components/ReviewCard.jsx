import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const ReviewCard = ({review}) => {
    
    return (
        
        
           <div className='card bg-base-100 w-full lg:w-96 shadow-xl'>
             <div className="card-body">
                   
             <p>{review.review}</p>
                <div className='flex items-center'>
                <div className="avatar">
                <div className="w-12 rounded-full">
                 <img src={review.reviewGiverImg} />
                 </div>
                 </div>
                    <div>
                        <p className='card-title'>{review.reviewGiverName}</p>
                        <p>{review.reviewGiverEmail}</p>
                        </div>   {/* reviwer name */}
                </div>
             </div>
            </div>
           
            
        
    );
};

export default ReviewCard;