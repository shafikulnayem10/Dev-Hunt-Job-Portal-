import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ for back button with history

  useEffect(() => {
    fetch(`https://dev-hunt-job-portal-server.onrender.com/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("❌ Error fetching job details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!job) {
    return <p className="text-center text-red-500">Job not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate('/')}
        className="btn btn-outline btn-primary mb-4"
      >
        ⬅️ Back to Home
      </button>

      <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
      {job.company_logo && (
        <img
          src={job.company_logo}
          alt={`${job.company} logo`}
          className="h-24 w-24 object-contain mb-4"
        />
      )}
      <p className="text-lg font-semibold">{job.company}</p>
      <p className="text600">{job.location}</p>
      {job.salary && <p className="text-700">💰 {job.salary}</p>}
      {job.salaryRange && (
        <p className="text700">
          Salary Range: {job.salaryRange.min}-{job.salaryRange.max} {job.salaryRange.currency}
        </p>
      )}
      <p className="mt-4 text800">{job.description}</p>

      <Link to={`/jobApply/${job._id}`}>
        <button className="btn btn-primary mt-6">
          Apply Now
        </button>
      </Link>
    </div>
  );
};

export default JobDetails;

