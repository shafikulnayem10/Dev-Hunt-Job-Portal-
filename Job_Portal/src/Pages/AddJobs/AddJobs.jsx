import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import useAuth from '../../Hooks/CustomHook/useAuth';
import axios from 'axios';

// 🔹 Options for dropdowns (unchanged)
const skillsOptions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "SEO", label: "SEO" },
  { value: "Excel", label: "Excel" },
  { value: "Flutter", label: "Flutter" },
  { value: "Firebase", label: "Firebase" },
  { value: "Python", label: "Python" },
  { value: "Figma", label: "Figma" },
];

const responsibilityOptions = [
  { value: "Develop software", label: "Develop software" },
  { value: "Code reviews", label: "Code reviews" },
  { value: "Project management", label: "Project management" },
  { value: "Client communication", label: "Client communication" },
  { value: "Content writing", label: "Content writing" },
  { value: "UI/UX design", label: "UI/UX design" },
  { value: "Marketing campaigns", label: "Marketing campaigns" },
];

// 🎨 Custom styles for react-select (unchanged)
const customStyles = {
  control: (base, state) => ({
    ...base,
    padding: "6px 10px",
    fontSize: "16px",
    borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px #93c5fd" : "none",
    "&:hover": {
      borderColor: "#2563eb",
    },
  }),
  menu: (base) => ({
    ...base,
    fontSize: "16px",
    zIndex: 100,
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#e0f2fe",
    color: "#0c4a6e",
    fontWeight: "500",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#0c4a6e",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#2563eb" : isFocused ? "#dbeafe" : "white",
    color: isSelected ? "white" : "black",
    padding: 12,
    fontSize: "16px",
    cursor: "pointer",
  }),
};

const AddJobs = () => {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const {user} = useAuth();

  const handleAddJob = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newJob = {
      title: form.title.value,
      company: form.company.value,
      location: form.location.value,
      jobType: form.jobType.value,
      category: form.category.value,
      applicationDeadline: form.applicationDeadline.value,
      salaryRange: {
        min: parseInt(form.salaryMin.value),
        max: parseInt(form.salaryMax.value),
        currency: "bdt",
      },
      description: form.description.value,
      company_logo: form.company_logo.value,
      hr_name: form.hr_name.value,
      hr_email: form.hr_email.value,
      requirements: requirements.map((opt) => opt.value),
      responsibilities: responsibilities.map((opt) => opt.value),
      status: "active",
      postedAt: new Date(),
    };

    try {
      const response = await axios.post("https://dev-hunt-job-portal-server.onrender.com/jobs", newJob, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });

      console.log("✅ Job added:", response.data);
      toast.success("✅ Job posted successfully!");
      form.reset();
      setRequirements([]);
      setResponsibilities([]);
      navigate("/myPostedJobs");
    } catch (error) {
      console.error("❌ Error adding job:", error);
      toast.error(`❌ ${error.response?.data?.message || "Failed to add job, please try again."}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-24">
      <h2 className="text-3xl font-bold mb-6 text-center">Add a New Job</h2>

      <form onSubmit={handleAddJob} className="space-y-4 bg-base-200 p-6 rounded shadow">
        <input type="text" name="title" placeholder="Job Title" className="input input-bordered w-full" required />
        <input type="text" name="company" placeholder="Company Name" className="input input-bordered w-full" required />
        <input type="text" name="location" placeholder="Location" className="input input-bordered w-full" required />
        <input type="text" name="jobType" placeholder="Job Type (e.g. Remote, Hybrid)" className="input input-bordered w-full" required />
        <input type="text" name="category" placeholder="Job Category (e.g. Engineering)" className="input input-bordered w-full" required />
        <input type="date" name="applicationDeadline" className="input input-bordered w-full" required />
        <input type="number" name="salaryMin" placeholder="Min Salary (BDT)" className="input input-bordered w-full" required />
        <input type="number" name="salaryMax" placeholder="Max Salary (BDT)" className="input input-bordered w-full" required />
        <input type="url" name="company_logo" placeholder="Company Logo URL" className="input input-bordered w-full" />
        <textarea name="description" placeholder="Job Description" className="textarea textarea-bordered w-full" required></textarea>

        <div>
          <label className="font-semibold block mb-1">Select Requirements</label>
          <Select
            isMulti
            styles={customStyles}
            options={skillsOptions}
            value={requirements}
            onChange={setRequirements}
            placeholder="Choose technical requirements..."
          />
        </div>

        <div className="mt-4">
          <label className="font-semibold block mb-1">Select Responsibilities</label>
          <Select
            isMulti
            styles={customStyles}
            options={responsibilityOptions}
            value={responsibilities}
            onChange={setResponsibilities}
            placeholder="Choose job responsibilities..."
          />
        </div>

        <input type="text" name="hr_name" placeholder="HR Name" className="input input-bordered w-full mt-4" required />
        <input type="email" defaultValue={user?.email} name="hr_email" placeholder="HR Email" className="input input-bordered w-full" required />

        <button type="submit" className="btn btn-primary w-full">Add Job</button>
      </form>

      <div className="text-center mt-4">
        <button onClick={() => navigate(-1)} className="btn btn-outline">← Back</button>
      </div>
    </div>
  );
};

export default AddJobs;