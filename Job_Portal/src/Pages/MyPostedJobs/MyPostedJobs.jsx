import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/CustomHook/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPostedJobs = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [applicationCounts, setApplicationCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.email) return;
            
            try {
                setLoading(true);
                setError(null);

                // Fetch posted jobs using axios
                const jobsResponse = await axios.get(`https://dev-hunt-job-portal-server.onrender.com/jobs-by-hr?email=${user.email}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setJobs(jobsResponse.data);

                // Fetch application counts using axios
                const countsResponse = await axios.get('https://dev-hunt-job-portal-server.onrender.com/job-applications-count', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                const counts = {};
                countsResponse.data.forEach(item => {
                    counts[item._id] = item.count;
                });
                setApplicationCounts(counts);

            } catch (err) {
                console.error('Error:', err);
                setError(err.response?.data?.message || err.message);
                if (err.response?.status === 401 || err.response?.status === 403) {
                    // Handle token expiration or invalid token
                    navigate('/signin');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.email, navigate]);

    if (loading) {
        return <div className="max-w-6xl mx-auto mt-24 p-4 text-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto mt-24 p-4">
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error: {error}</span>
                </div>
                <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm mt-4">
                    ← Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-24 p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">My Posted Jobs ({jobs.length})</h1>
                <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
                    ← Back
                </button>
            </div>

            {jobs.length === 0 ? (
                <p className="text-center text-gray-500">You have not posted any jobs yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Salary Range</th>
                                <th>Status</th>
                                <th>Applications</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr key={job._id}>
                                    <td>{index + 1}</td>
                                    <td>{job.title}</td>
                                    <td>{job.company}</td>
                                    <td>{job.location}</td>
                                    <td>{job.salaryRange?.min} - {job.salaryRange?.max} BDT</td>
                                    <td>{job.status}</td>
                                    <td>{applicationCounts[job._id] || 0}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => navigate(`/view-applications/${job._id}`)}
                                        >
                                            View Applications
                                        </button>
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

export default MyPostedJobs;