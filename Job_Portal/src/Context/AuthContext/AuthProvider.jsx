import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.init';
import axios from 'axios';

 


const googleProvider = new GoogleAuthProvider();
export default function AuthProvider({children}) {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const createUser =(email,password)=>{
        setLoading(true);
return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);

    }

    const signInWithGoogle = ()=>{
        setLoading(true);
   return signInWithPopup(auth,googleProvider)



    }
   const signOutUser = ()=>{

setLoading(true);
return signOut(auth);


   }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{


            setUser(currentUser);
            console.log("sate captured",currentUser?.email)

             if(currentUser?.email){
                const user = {email:currentUser.email};
                axios.post('https://dev-hunt-job-portal-server.onrender.com/jwt',user,{withCredentials:true})
                .then(res=>{
                    console.log("log in token:",res.data);
                    setLoading(false);
                })
             }
             else{
                axios.post('https://dev-hunt-job-portal-server.onrender.com/logout',{},{
                    withCredentials:true
                })
                .then(res=>{
                    console.log('logout:',res.data);
                    setLoading(false);
                })

             }





            
         }

    )
    return ()=>{
        unsubscribe();
    }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle
    }
  return (
    <AuthContext.Provider value={authInfo}>
       {children}
    </AuthContext.Provider>
  )
}
