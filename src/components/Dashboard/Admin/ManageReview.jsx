import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const ManageReview = () => {
    const {data:allReview,refetch} = useQuery({
        queryKey:['review'],
        queryFn:async ()=>{
            const {data} =await axios(`${import.meta.env.VITE_API_URL}/review`)
            return data
        }
    })
    // handle remove
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
    return (
        <div>
            
            {
                allReview?.map(review => <div key={review._id} className="card card-side bg-base-100 shadow-xl">
                    <figure>
                      <img
                        src={review.reviewGiverImg}
                        alt="Movie" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Name : {review.reviewGiverName}</h2>
                      <p>Email : {review.reviewGiverEmail}</p>
                      <p>Review : {review.review}</p>
                      <div className="card-actions justify-end">
                        <button onClick={()=>handleDelete(review)} className="btn btn-primary">Delete</button>
                      </div>
                    </div>
                  </div>)
            }
        </div>
    );
};

export default ManageReview;