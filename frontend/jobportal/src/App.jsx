import Navbar from "./components/navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import JobDetails from "./components/jobdetails"
import Application from "./pages/Application"
import Postjob from "./pages/postJob"
import Myjobs from "./pages/myjobs"
import Applicants from "./pages/applicants"
import ProtectedRoute from "./components/protectedroute"

function App() {
  
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/jobs/:id" element={<JobDetails/>}/>

        <Route path="/myapplication" element={
          <ProtectedRoute allowedRole="jobseeker">
            <Application/>
          </ProtectedRoute>
          
          }/>
        <Route path="/post-job" element={
          <ProtectedRoute allowedRole="recruiter">
            <Postjob/>
          </ProtectedRoute>
          }/>
        <Route path="/my-jobs" element={
          <ProtectedRoute allowedRole="recruiter">
            <Myjobs/>
          </ProtectedRoute>
          }/>
        <Route path="/applicants" element={
          <ProtectedRoute allowedRole="recruiter">
            <Applicants/>
          </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
