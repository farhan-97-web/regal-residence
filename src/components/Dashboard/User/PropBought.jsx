import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import BoughtCard from './BoughtCard';
import Loading from '../../Loading/Loading';

const PropBought = () => {
    const { user } = useContext(AuthContext);

    const { data: offerData = [], isLoading, error } = useQuery({
        queryKey: ['offer', user?.email],
        enabled: !!user?.email, // Prevent query if email is undefined
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/offer/${user?.email}`
            );
            console.log('Fetched Offer:', data); // Debug log
            return data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-center text-red-500">Error loading Property: {error.message}</div>;
    }

    if (!offerData.length) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-lg">
                No Property Bought.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {offerData.map((offer) => (
                <BoughtCard offer={offer} key={offer._id} />
            ))}
        </div>
    );
};

export default PropBought;
