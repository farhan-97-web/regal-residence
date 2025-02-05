import React from 'react';
import { Link } from 'react-router-dom';

const BoughtCard = ({offer}) => {
    return (
        <div>
            <div className="card bg-base-100 w-full lg:w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{offer.propertyName}</h2>
    <p>Location : {offer.location}</p>
    <p>Price : {offer.price}</p>
    <p>Agent Name : {offer.agentName}</p>
    <p>Status : {offer.verificationStatus}</p>
    <div className="card-actions justify-end">
     {
        offer.verificationStatus === 'accepted' &&  <Link to={`/dashboard/payment/${offer._id}`}><button className="btn btn-primary">Pay</button></Link>
     }
    </div>
  </div>
</div>
        </div>
    );
};

export default BoughtCard;