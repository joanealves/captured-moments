import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { SignUp } from "./pages/Auth/SignUp";

export function App() {

  return (
    <>
        
        <Router >
          <Routes >
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
        </Router>
      
    </>
  )
}


