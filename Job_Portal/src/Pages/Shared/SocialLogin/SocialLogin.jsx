import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../../Context/AuthContext/AuthContext';

const SocialLogin = () => {
    const {signInWithGoogle}=useContext(AuthContext);
    const navigate = useNavigate();
    const handleGoogleSignIn =()=>{
    signInWithGoogle()
    .then(result=>{
        console.log(result.user)
        navigate('/');

    })
  .catch(e=>{
    console.log(e.message)
  })


    }
    return (
        <div className='m-4'>
            <div className='divider'>OR</div>
            
            <button className='btn' onClick={handleGoogleSignIn}>Google</button>
        </div>
    );
};

export default SocialLogin;