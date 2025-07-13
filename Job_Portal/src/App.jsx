import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Pages/MainLayout/MainLayout';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import SignIn from './Pages/SignIn/SignIn';
import JobDetails from './Pages/JobDetails/JobDetails';
import JobApply from './Pages/JobApply/JobApply';
import MyApplications from './Pages/MyApplications/MyApplications';
import AddJobs from './Pages/AddJobs/AddJobs'; // ✅ import
import MyPostedJobs from './Pages/MyPostedJobs/MyPostedJobs';
import ViewApplications from './Pages/ViewApplications/ViewApplications';
import About from './Pages/About/About';
function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Nested app routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="jobApply/:id" element={<JobApply />} />  {/* ✅ Fixed */}        </Route>
          <Route path="myapplications" element={<MyApplications></MyApplications>}> </Route>
            <Route path="/add-job" element={<AddJobs />} />
            <Route path="/myPostedJobs" element={<MyPostedJobs></MyPostedJobs>}></Route>
            <Route path="/view-applications/:jobId" element={<ViewApplications />} />
          <Route path="/about" element={<About></About>} />

          
          </Routes>
    </>
  );
}

export default App;



