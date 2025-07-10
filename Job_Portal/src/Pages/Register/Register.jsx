import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext/AuthContext';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import axios from 'axios';

export default function Register() {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    createUser(email, password)
      .then(result => {
        console.log(result.user);
        const user ={email:result.user.email}
       axios.post('https://dev-hunt-job-portal-server.onrender.com/jwt',user,{ withCredentials: true })
        form.reset();
        navigate('/'); 
      })
      .catch(e => {
        console.log(e.message);
        setError(e.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse">

        
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="py-6">
            Ready to launch your career? Register now and start exploring internships to top-tier roles tailored just for you!
          </p>
        </motion.div>

        <motion.div
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
         
          <motion.h1
            className="ml-8 mt-4 text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Register now!
          </motion.h1>

          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" required />

                <label className="label">Password</label>
                <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />

                

               
                {error && <p className="text-red-500 mt-2">{error}</p>}

              
                <motion.button
                  className="btn btn-neutral mt-4 w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                >
                  Register
                </motion.button>
              </fieldset>
            </form>

           
            <SocialLogin />

            
            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


