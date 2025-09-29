import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Pages/MainLayout/MainLayout';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import SignIn from './Pages/SignIn/SignIn';
import JobDetails from './Pages/JobDetails/JobDetails';
import JobApply from './Pages/JobApply/JobApply';
import MyApplications from './Pages/MyApplications/MyApplications';
import AddJobs from './Pages/AddJobs/AddJobs'; 
import MyPostedJobs from './Pages/MyPostedJobs/MyPostedJobs';
import ViewApplications from './Pages/ViewApplications/ViewApplications';
import About from './Pages/About/About';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Nested app routes with protection */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route 
            path="jobApply/:id" 
            element={
              <PrivateRoute>
                <JobApply />
              </PrivateRoute>
            } 
          />
          <Route 
            path="myapplications" 
            element={
              <PrivateRoute>
                <MyApplications />
              </PrivateRoute>
            } 
          />
          <Route 
            path="add-job" 
            element={
              <PrivateRoute>
                <AddJobs />
              </PrivateRoute>
            } 
          />
          <Route 
            path="myPostedJobs" 
            element={
              <PrivateRoute>
                <MyPostedJobs />
              </PrivateRoute>
            } 
          />
          <Route 
            path="view-applications/:jobId" 
            element={
              <PrivateRoute>
                <ViewApplications />
              </PrivateRoute>
            } 
          />
          <Route 
            path="about" 
            element={
              <About />
            } 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;




