import Navbar from "./components/navbar"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"

function App() {
  
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<h1>Register page</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
