import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;
