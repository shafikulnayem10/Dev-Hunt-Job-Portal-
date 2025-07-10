import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Hooks/CustomHook/useAuth';
import axios from 'axios';

const JobApply = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const github = form.github.value;
    const linkedin = form.linkedin.value;
    const cvLink = form.cv.value;

    if (!user?.email) {
      alert("❌ Please login to apply.");
      setLoading(false);
      return;
    }

    const applicationData = {
      job_id: id,
      applicant_email: user.email,
      github,
      linkedin,
      cv_link: cvLink
    };

    try {
      const response = await axios.post(
        '/job-applications',
        applicationData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      alert(" Application submitted successfully!");
      form.reset();
      navigate('/myapplications');
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert(` Failed to apply: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Apply for this Job</h1>
          <p className="py-4 max-w-md">
            Provide your GitHub, LinkedIn, and a public CV link (Google Drive, Dropbox, etc.).
          </p>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline mt-4"
          >
            ← Back to Job Details
          </button>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleApply}>
              <fieldset className="fieldset space-y-2">
                <label className="label" htmlFor="github">GitHub Profile Link</label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  className="input input-bordered w-full"
                  placeholder="https://github.com/username"
                  required
                />

                <label className="label" htmlFor="linkedin">LinkedIn Profile Link</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  className="input input-bordered w-full"
                  placeholder="https://linkedin.com/in/username"
                  required
                />

                <label className="label" htmlFor="cv">Public CV Link (Drive/Dropbox)</label>
                <input
                  type="url"
                  id="cv"
                  name="cv"
                  className="input input-bordered w-full"
                  placeholder="https://drive.google.com/..."
                  required
                />

                <button
                  type="submit"
                  className={`btn btn-primary mt-4 w-full ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? "Applying..." : "Apply Now"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
