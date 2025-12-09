import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../../Firebase/Firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const googleProvider=new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)

    const registerUser=(email,password)=>{
        setLoading(true)
     return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider);
    }
    const updateUserProfie=(profile)=>{
         return updateProfile(auth.currentUser,profile)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubcribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return()=>{
            unSubcribe();
        }
    })
     const authInfo={
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut,
        setUser,
        updateUserProfie

     }

    return (
        <AuthContext value={authInfo} >
            {children}
        </AuthContext>
    );
};

export default AuthProvider;