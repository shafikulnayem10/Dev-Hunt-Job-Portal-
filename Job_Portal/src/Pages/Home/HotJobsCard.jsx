import React from 'react';
import { Link } from 'react-router-dom';

const HotJobsCard = ({ job }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
      {job.company_logo && (
        <figure className="px-4 pt-4">
          <img
            src={job.company_logo}
            alt={`${job.company} logo`}
            className="rounded-xl h-20 w-20 object-contain mx-auto"
          />
        </figure>
      )}
      <div className="card-body">
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <div className="badge badge-secondary">NEW</div>
        <p className="text-600">{job.company}</p>
        <p className="text-sm text-500">{job.location}</p>
        {job.salary && (
          <p className="text-sm text-500">💰 {job.salary}</p>
        )}
        {job.description && (
          <p className="mt-2 text-gray-700">
            {job.description.slice(0, 100)}...
          </p>
        )}
        <div className="flex flex-col gap-2 mt-3">
          <Link to={`/jobs/${job._id}`}>
            <button className="btn btn-primary btn-sm w-fit">
              Apply Now
            </button>
          </Link>
          {job.salaryRange && (
            <p className="text-blue-400 text-sm">
              Salary: {job.salaryRange.min}-{job.salaryRange.max} {job.salaryRange.currency}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotJobsCard;

