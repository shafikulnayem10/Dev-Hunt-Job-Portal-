import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/CustomHook/useAuth';
import axios from 'axios';

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.email) {
                console.log("⚠️ User not logged in, skipping fetch.");
                setLoading(false);
                return;
            }

            try {
                // First fetch applications
                const appsResponse = await axios.get(
                    `https://dev-hunt-job-portal-server.onrender.com/job-applications?email=${user.email}`,
                    { withCredentials: true }
                );
                
                const appsData = appsResponse.data;
                if (Array.isArray(appsData)) {
                    setApplications(appsData);
                } else {
                    console.error("❌ Unexpected applications data:", appsData);
                    setApplications([]);
                }

                // Then fetch jobs
                const jobsResponse = await axios.get(
                    'https://dev-hunt-job-portal-server.onrender.com/jobs',
                    { withCredentials: true }
                );
                
                const jobsData = jobsResponse.data;
                if (Array.isArray(jobsData)) {
                    setJobs(jobsData);
                } else {
                    console.error("❌ Unexpected jobs data:", jobsData);
                    setJobs([]);
                }

            } catch (error) {
                console.error("❌ Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.email]);

    const getJobDetails = (jobId) => jobs.find(job => job._id === jobId);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-10">
                <p className="text-lg text-red-500">⚠️ Please log in to view your applications.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 mt-24">
            <button
                onClick={() => navigate(-1)}
                className="btn btn-outline mb-4"
            >
                ← Back
            </button>

            <h1 className="text-2xl font-bold mb-4">
                My Applications: {applications.length}
            </h1>

            {applications.length === 0 ? (
                <p className="text-gray-600">You have not applied to any jobs yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, idx) => {
                                const job = getJobDetails(app.job_id);
                                return (
                                    <tr key={idx} className="hover">
                                        <td>{idx + 1}</td>
                                        <td>{job?.title ?? <span className="text-red-500">Not Found</span>}</td>
                                        <td>{job?.company ?? '-'}</td>
                                        <td>{job?.location ?? '-'}</td>
                                        <td>
                                            {job?.salary
                                                ?? (job?.salaryRange
                                                    ? `${job.salaryRange.min}-${job.salaryRange.max} ${job.salaryRange.currency?.toUpperCase() ?? ''}`
                                                    : '-')}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyApplications;