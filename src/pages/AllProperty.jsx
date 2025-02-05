import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AllProperty = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending order

    // Fetch properties based on search term and sort order
    const { data: properties, refetch } = useQuery({
        queryKey: ['properties', searchTerm, sortOrder],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/properties`, {
                params: {
                    search: searchTerm,
                    sort: sortOrder,
                },
            });
            return data;
        },
    });

    // Handle search input change
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        refetch(); // Refetch data when the search term changes
    };

    // Handle sort order change
    const handleSort = (e) => {
        setSortOrder(e.target.value);
        refetch(); // Refetch data when the sort order changes
    };

    return (
        <div className='lg:grid lg:grid-cols-4 gap-4'>
            {/* Search and Sort Inputs */}
            <div className='col-span-4 flex justify-between mb-4'>
                <input
                    type='text'
                    placeholder='Search by property name...'
                    value={searchTerm}
                    onChange={handleSearch}
                    className='input input-bordered w-full max-w-xs'
                />
                <select
                    value={sortOrder}
                    onChange={handleSort}
                    className='select select-bordered'
                >
                    <option value='asc'>Price: Low to High</option>
                    <option value='desc'>Price: High to Low</option>
                </select>
            </div>

            {/* Properties List */}
            {properties?.map(
                (property) =>
                    property.verificationStatus === 'verified' && (
                        <div
                            key={property?._id}
                            className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
                        >
                            <div className='flex flex-col gap-2 w-full'>
                                <div
                                    className='
                              aspect-square 
                              w-full 
                              relative 
                              overflow-hidden 
                              rounded-xl
                            '
                                >
                                    <img
                                        className='
                                object-cover 
                                h-full 
                                w-full 
                                group-hover:scale-110 
                                transition
                              '
                                        src={property?.image}
                                        alt='Property Image'
                                    />
                                </div>
                                <div className='font-semibold text-lg'>
                                    Property Name: {property?.propertyName}
                                </div>
                                <div className='font-semibold text-lg'>
                                    Property location: {property?.location}
                                </div>
                                <div className='flex flex-row items-center gap-1'>
                                    <div className='font-semibold'>
                                        Price: ${property?.price}
                                    </div>
                                </div>
                                <div className='font-semibold text-lg'>
                                    Verification Status: {property?.verificationStatus}
                                </div>
                                <div className='divider'></div>
                                <p>Agent Name: {property?.agent?.aName}</p>
                                <div>
                                    <Link to={`/properties/${property._id}`}>
                                        <button className='btn'>View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
            )}
        </div>
    );
};

export default AllProperty;
