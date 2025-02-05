import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useRole from '../../../hooks/useRole';

const AdminProfile = () => {
    const {user} = useContext(AuthContext)
    const [role,isLoading] = useRole()
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={user?.photoURL}
      className="w-28 lg:max-w-sm  shadow-2xl rounded-full" />
    <div>
      <h1 className="text-xl lg:text-5xl font-bold">Name : {user?.displayName}</h1>
      <p className="py-6">
       Role : {role}
      </p>
      <p className="py-6">
       Email : {user?.email}
      </p>
     
    </div>
  </div>
</div>
        </div>
    );
};

export default AdminProfile;