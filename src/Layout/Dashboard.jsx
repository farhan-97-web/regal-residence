import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useRole from '../hooks/useRole';

const Dashboard = () => {
    // Get roles
    const [isAdmin] = useAdmin();
    const [role, isLoading] = useRole();

    // Sidebar toggle state
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <div
                className={`fixed lg:static z-20 bg-[#bc986b] lg:w-64 w-64 min-h-screen p-4 transform transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
            >
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden absolute top-6 right-6 text-white z-10"
                >
                    ✖
                </button>
                <ul className="menu space-y-4 text-white">
                    {isAdmin && (
                        <>
                            <li>
                                <Link to={'/dashboard/admin-profile'}>Admin Profile</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/admin-manage-user'}>Manage Users</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/admin-manage-property'}>Manage Property</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/admin-manage-review'}>Manage Review</Link>
                            </li>
                        </>
                    )}
                    {role === 'agent' && (
                        <>
                            <li>
                                <Link to={'/dashboard/add-property'}>Add Property</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/agent-profile'}>Agent Profile</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/my-added'}>My Added Properties</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/my-sold'}>My Sold Properties</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/req-property'}>Requested Properties</Link>
                            </li>
                        </>
                    )}
                    {role === 'customer' && (
                        <>
                            <li>
                                <Link to={'/dashboard/user-profile'}>My Profile</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/user-wishlist'}>Wishlist</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/property-bought'}>Property Bought</Link>
                            </li>
                            <li>
                                <Link to={'/dashboard/user-review'}>My Reviews</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                </ul>
            </div>

            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden  bg-[#bc986b] text-white z-10"
            >
                ☰
            </button>

            {/* Content */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
