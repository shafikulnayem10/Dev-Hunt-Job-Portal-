import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Import Link
import { motion } from 'framer-motion';
import AuthContext from '../../Context/AuthContext/AuthContext';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import axios from 'axios';

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(result => {
        console.log("Sign in successful:", result.user.email);
        const user ={email:result.user.email}
       axios.post('http://localhost:3000/jwt',user,{ withCredentials: true })
       .then(res=>{
        console.log(res.data);
       })
       
       navigate('/'); // ✅ Redirect to home after sign in
      })
      .catch(e => {
        console.error("Sign in error:", e);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse">

        {/* 🪄 Animated left text block */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="py-6">
            Welcome back! Sign in to manage your applications, track your interviews, and discover new opportunities tailored for you.
          </p>
        </motion.div>

        {/* 🌀 Animated sign-in card */}
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
            Sign In
          </motion.h1>
          <div className="card-body">
            <form onSubmit={handleSignIn}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  required
                />
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  required
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>

                {/* 💥 Animated Sign In Button */}
                <motion.button
                  className="btn btn-neutral mt-4 w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                >
                  Sign In
                </motion.button>
              </fieldset>
            </form>

            {/* 🌟 Social login */}
            <SocialLogin />

            {/* ✅ Register option */}
            <p className="mt-4 text-center text-sm">
              Don’t have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
