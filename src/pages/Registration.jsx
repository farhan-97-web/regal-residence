import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { imageUpload } from '../api/utility';

const Registration = () => {
  const [error,setError] = useState('');
  const {createUser,logOut,updateUserProfile} =  useContext(AuthContext);
  const navigate = useNavigate();
 const handleRegister = async e =>{
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.files[0];
    const email = e.target.email.value;
    const password = e.target.password.value;
 
    const userData = {name,image,email}
    const photoURL = await imageUpload(image)
    console.log(photoURL);



    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if(!passwordRegex.test(password)){
      setError('Must have an Uppercase letter, a Lowercase letter and Length must be at least 6 character in the password');
      
      return;
    }
    // create user
    createUser(email,password)
    .then(result => {
      
      logOut();
      const user = result.user;
      updateUserProfile({displayName : name,
        photoURL : photoURL
      }).then(()=>{
          // save user in the database
          const userInfo = {
            name : name,
            image : photoURL,
            email: email,
            role: 'customer' 
          }
          axios.post(`${import.meta.env.VITE_API_URL}/users`,userInfo)
          .then(res =>{
            const notify = () => toast('Data saved successfully');
        notify();
          })



          
        })
      navigate('/login');
      
      console.log(user);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      console.log(errorCode,errorMessage);
    
    });

 }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
        <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
        </div>
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
          <p>{error}</p>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
      <p>Already Have an account ? <Link className='text-blue-800' to={'/login'}>Login here</Link></p>
    </div>
  </div>
</div>
        </div>
    );
};

export default Registration;