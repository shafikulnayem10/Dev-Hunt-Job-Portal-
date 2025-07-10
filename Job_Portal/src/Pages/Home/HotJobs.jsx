import React, { useEffect, useState } from 'react';
import HotJobsCard from './HotJobsCard';

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    fetch('https://dev-hunt-job-portal-server.onrender.com/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(" Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updatedJobs = [...jobs];

   
    if (searchLocation.trim() !== '') {
      updatedJobs = updatedJobs.filter(job =>
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    setFilteredJobs(updatedJobs);
  }, [searchLocation, jobs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">🔥 Hot Jobs</h2>

     
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
          className="input input-bordered w-full sm:max-w-xs"
        />
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, index) => (
            <HotJobsCard key={index} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotJobs;
