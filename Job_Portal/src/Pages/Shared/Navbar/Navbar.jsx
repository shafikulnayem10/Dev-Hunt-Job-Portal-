import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../../../Context/AuthContext/AuthContext';

export default function Navbar() {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log(' Successfully signed out');
        navigate('/signin');
      })
      .catch((e) => {
        console.error(' Failed to sign out:', e);
      });
  };

  const links = (
    <>
      <motion.li
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <NavLink to="/">Home</NavLink>
      </motion.li>

      <motion.li
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <NavLink to="/about">About</NavLink>
      </motion.li>

      <motion.li
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <NavLink to="/myapplications">My Applications</NavLink>
      </motion.li>

      <motion.li
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <NavLink to="/add-job">Add Job</NavLink> 
      </motion.li>
      <motion.li
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <NavLink to="/myPostedJobs">My Posted Jobs</NavLink> 
      </motion.li>
    </>
  );

  return (
    <motion.div
      className="navbar bg-base-100 shadow-sm fixed top-0 w-full z-50"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </div>
          <ul tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50">
            {links}
          </ul>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/" className="btn btn-ghost text-blue-700">DevHunt</Link>
        </motion.div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        {user ? (
          <motion.button
            onClick={handleSignOut}
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Out
          </motion.button>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/register" className="btn">Register</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/signin">
                <button className="btn">Sign In</button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}



