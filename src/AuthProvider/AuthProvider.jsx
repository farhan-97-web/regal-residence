import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider,  updateProfile } from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // login
    const logIn = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateUserProfile = (updatedData)=>{
        return updateProfile(auth.currentUser,updatedData)
    }
    // google login
    
    const googleLogin = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
   const logOut = () =>{
    setLoading(true);
    return signOut(auth);
   }
   useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
        // jwt
        if(currentUser){
            // get token and store client
            const userInfo = {email : currentUser.email}
            axios.post(`${import.meta.env.VITE_API_URL}/jwt`,userInfo)
            .then(res =>{
                if(res.data.token){
                    localStorage.setItem('access-token',res.data.token)
                }
            })
        }else{
            // remove token
            localStorage.removeItem('access-token')
        }



        setLoading(false);
    });
    return ()=>{
        unSubscribe()
    }
   },[]) 

// useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async currentUser => {
//       console.log('CurrentUser-->', currentUser?.email)
//       if (currentUser?.email) {
//         setUser(currentUser)
//         // save user info in db
//         await axios.post(
//           `${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,
//           {
//             name: currentUser?.displayName,
//             image: currentUser?.photoURL,
//             email: currentUser?.email,
//           }
//         )
        
//       } else {
//         setUser(currentUser)
        
//       }
//       setLoading(false)
//     })
//     return () => {
//       return unsubscribe()
//     }
//   }, [])


   const userInfo = {
        user,
        loading,
        createUser,
        logIn,
        googleLogin,
        logOut,
        updateUserProfile
   }
    return (
        
        <AuthContext.Provider value={userInfo}>
           {children} 
        </AuthContext.Provider>
    );
};

export default AuthProvider;