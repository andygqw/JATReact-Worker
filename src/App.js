import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
// import Register from './components/Register';
import Dashboard from './components/Dashboard';
// import UserDetail from './components/UserDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" component={Login} />
          {/* <Route path="/register" component={Register} /> */}
          <Route path="/dashboard" component={Dashboard} />
          {/* <Route path="/user-detail" component={UserDetail} /> */}
          <Route path="/" component={Login} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;