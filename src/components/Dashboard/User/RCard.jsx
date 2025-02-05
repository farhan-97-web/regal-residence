import axios from 'axios';
import React from 'react';

const RCard = ({review,handleDelete}) => {
  
    return (
        <div>
             <div className="card card-side bg-base-100 shadow-xl">
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
                  </div>
        </div>
    );
};

export default RCard;