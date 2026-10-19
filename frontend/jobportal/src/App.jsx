import Navbar from "./components/navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import JobDetails from "./components/jobdetails"
import Application from "./pages/Application"
import Postjob from "./pages/postJob"
import Myjobs from "./pages/myjobs"

function App() {
  
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/jobs/:id" element={<JobDetails/>}/>
        <Route path="/myapplication" element={<Application/>}/>
        <Route path="/post-job" element={<Postjob/>}/>
        <Route path="/my-jobs" element={<Myjobs/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
