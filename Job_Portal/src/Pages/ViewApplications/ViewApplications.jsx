import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/CustomHook/useAuth';
import axios from 'axios';

const ViewApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`https://dev-hunt-job-portal-server.onrender.com/job-applications?jobId=${jobId}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setApplications(response.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch applications');
        
        // Redirect to login if unauthorized
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchApplications();
    }
  }, [jobId, user?.email, navigate]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-24 p-6 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-24 p-6">
        <div className="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {error}</span>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-outline">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Applications for this Job</h1>
        <button onClick={() => navigate(-1)} className="btn btn-outline">
          ← Back
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>No applications yet for this job.</span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Cover Letter</th>
                <th className="py-3 px-4">Links</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{app.applicant_name}</td>
                  <td className="py-3 px-4">{app.applicant_email}</td>
                  <td className="py-3 px-4">{app.phone || "N/A"}</td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    {app.coverLetter || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {app.github && (
                        <a href={app.github} target="_blank" rel="noopener noreferrer" className="link link-primary">
                          GitHub
                        </a>
                      )}
                      {app.linkedin && (
                        <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="link link-primary">
                          LinkedIn
                        </a>
                      )}
                      {app.cv_link && (
                        <a href={app.cv_link} target="_blank" rel="noopener noreferrer" className="link link-primary">
                          CV
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;