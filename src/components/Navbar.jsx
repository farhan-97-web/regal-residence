import React, { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
  const location = useLocation();

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow">
       <li><Link  className={`px-4 py-2  ${
          isActive("/") ? "text-[#bc986b] font-bold text-lg" : "text-black text-lg"
        }`} to={'/'}>Home</Link></li>
      <li><Link  className={`px-4 py-2  ${
          isActive("/all-property") ? "text-[#bc986b] font-bold text-lg" : "text-black text-lg"
        }`} to={'/all-property'}>All Properties</Link></li>
      <li><Link  className={`px-4 py-2  ${
          isActive("/dashboard") ? "text-[#bc986b] font-bold text-lg" : "text-black text-lg"
        }`} to={'/dashboard'}>Dashboard</Link></li>
      </ul>
    </div>
    <a className="text-xl">Regal Residences</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu-horizontal px-1">
      <li><Link  className={`px-4 py-2  ${
          isActive("/") ? "text-[#bc986b] font-bold text-lg" : "text-black text-lg"
        }`} to={'/'}>Home</Link></li>
      <li><Link  className={`px-4 py-2  ${
          isActive("/all-property") ? "text-[#bc986b] font-bold text-lg" : "text-black text-lg"
        }`} to={'/all-property'}>All Properties</Link></li>
      <li><Link  className={`px-4 py-2  ${
          isActive("/dashboard") ? "text-[#bc986b] font-bold text-lg" : "text-black text-lg"
        }`} to={'/dashboard'}>Dashboard</Link></li>
     
      
      
      
      
    </ul>
  </div>
  <div className="navbar-end">
     { 
      user && user.email? (<>
     <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='w-10 rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <div>
            <button onClick={logOut} className="btn bg-[#bc986b]">Log out</button>
            </div>
      </>) : (<>
     <Link to={'/login'}><a className="btn bg-[#FF4500]">Log in</a></Link>
      
      </>)
    }
   
  </div>
</div>
        </div>
    );
};

export default Navbar;