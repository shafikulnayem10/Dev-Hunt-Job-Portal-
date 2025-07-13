import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-12"
    >
      
      <button
        onClick={handleBack}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">About Dev Hunt</h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        <strong>Dev Hunt</strong> is a modern job portal designed specifically for developers and tech enthusiasts.
        Whether you're looking for your first internship or your next full-time gig, we've got your back. 🧑‍💻✨
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">🚀 Why Dev Hunt?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Clean and intuitive UI</li>
            <li>Filtered job listings by skills, category, and type</li>
            <li>Authentication via Email, Google login 🔐</li>
            <li>Role-based dashboards (Admin, Recruiter, Candidate)</li>
            <li>Responsive design across all devices 📱💻</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">💡 Our Mission</h2>
          <p className="text-gray-700">
            We aim to bridge the gap between passionate developers and forward-thinking companies.
            In a digital world moving fast, Dev Hunt brings opportunity to your fingertips — no recruiter spam, no outdated listings.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl shadow-md mb-10">
        <h3 className="text-xl font-semibold mb-3">🧰 Built With:</h3>
        <div className="flex flex-wrap gap-3 text-gray-800">
          <span className="bg-white px-3 py-1 rounded-full shadow text-sm">React</span>
          <span className="bg-white px-3 py-1 rounded-full shadow text-sm">Node.js</span>
          <span className="bg-white px-3 py-1 rounded-full shadow text-sm">Express</span>
          <span className="bg-white px-3 py-1 rounded-full shadow text-sm">MongoDB</span>
          <span className="bg-white px-3 py-1 rounded-full shadow text-sm">Tailwind CSS</span>
          <span className="bg-white px-3 py-1 rounded-full shadow text-sm">Framer Motion</span>
          <span className="bg-white px-3 py-1 rounded-full shadow text-sm">JWT & Firebase Auth</span>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm">
        Built with ❤️ by <strong>Shafiqul Islam Nayem</strong> | ID: 23-54388-3 | CSE, AIUB
      </p>
    </motion.div>
  );
}
