import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('token'));

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={<Dashboard setIsLoggedIn={setIsLoggedIn}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;