import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const ManageProperty = () => {
    const { data: properties, refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/properties`);
            return data;
        },
    });

    // Handle verify
    const handleVerify = async (property) => {
        axios
            .patch(`${import.meta.env.VITE_API_URL}/properties/${property._id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    toast.success(`Property Verified`);
                    refetch();
                }
            });
    };

    // Handle reject
    const handleReject = async (property) => {
        axios
            .patch(`${import.meta.env.VITE_API_URL}/properties/rejected/${property._id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    toast.error(`Property Rejected`);
                    refetch();
                }
            });
    };

    return (
        <div className="p-4">
            <div className="overflow-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    {/* Table Header */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left border">Property Name</th>
                            <th className="px-4 py-2 text-left border">Property Location</th>
                            <th className="px-4 py-2 text-left border">Agent Name</th>
                            <th className="px-4 py-2 text-left border">Agent Email</th>
                            <th className="px-4 py-2 text-left border">Price</th>
                            <th className="px-4 py-2 text-center border">Action</th>
                            <th className="px-4 py-2 text-center border">Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {properties?.map((property) => (
                            <tr key={property?._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{property?.propertyName}</td>
                                <td className="px-4 py-2 border">{property?.location}</td>
                                <td className="px-4 py-2 border">{property?.agent?.aName}</td>
                                <td className="px-4 py-2 border">{property?.agent?.email}</td>
                                <td className="px-4 py-2 border">${property?.price}</td>
                                <td className="px-4 py-2 border text-center">
                                    {property.verificationStatus === 'verified' ? (
                                        <span className="text-green-500 font-semibold">Verified</span>
                                    ) : (
                                        <button
                                            onClick={() => handleVerify(property)}
                                            className={`btn btn-primary ${
                                                property?.verificationStatus === 'rejected' && 'btn-disabled'
                                            }`}
                                        >
                                            Verify
                                        </button>
                                    )}
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    {property.verificationStatus === 'rejected' ? (
                                        <span className="text-red-500 font-semibold">Rejected</span>
                                    ) : (
                                        <button
                                            onClick={() => handleReject(property)}
                                            className={`btn btn-danger ${
                                                property?.verificationStatus === 'verified' && 'btn-disabled'
                                            }`}
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperty;
