import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { AuthContext } from '../AuthProvider/AuthProvider';

const Login = () => {
  const {logIn,googleLogin} = useContext(AuthContext);
  const [user,setUser] = useState('')
  const navigate = useNavigate();
    const handleLogin = e =>{
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      // login user
      logIn(email,password)
      .then(result => {
        const user = result.user;
        const notify = () => toast('login successfull');
        notify();
        navigate('/');
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        const notify = () => toast(errorMessage);
        notify();
      
      });
    }
    const handleGoogle =()=>{
      googleLogin()
      .then(result =>{
        const user = result.user;
        const userInfo = {
          email : result.user?.email,
          name : result.user?.displayName,
          image : result.user?.photoURL,
          role: 'customer'
        }
        axios.post(`${import.meta.env.VITE_API_URL}/users`,userInfo)
          .then(res =>{
            const notify = () => toast('Data saved successfully');
        notify();
          })
        console.log(user);
        setUser(user);
        const notify = () => toast('login successful');
        notify();
        navigate('/');

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       
        
      
      });
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <button onClick={handleGoogle} className="btn btn-outline">Sign in with Google</button>
      <p>New here ? <Link to={'/register'}><button className="btn btn-primary">Register</button></Link></p>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;