import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import AuthContext from '../../Context/AuthContext/AuthContext';

export default function MainLayout() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user && location.pathname === "/") {
      navigate('/signin');
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Navbar />}

      <main className={`${user ? 'pt-20' : ''} flex-grow max-w-7xl mx-auto`}>
        <Outlet />
      </main>

      {user && <Footer />}
    </div>
  );
}

