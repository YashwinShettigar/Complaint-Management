import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './components/admin/HomePage';
import Complaints from './components/admin/Complaints';
import UserHome from './components/user/UserHome';
import ViewComplaint from './components/user/ViewComplaint';
import FileComplaint from './components/user/FileComplaint';

const App = () => {
  return (
    <Router>
        <div className='App'>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />..
           <Route path="/" element={<Register />} /> 
           <Route path="/complaints" element={<Complaints />} />
           <Route path="/home" element={<UserHome />} />
           <Route path="/complaint" element={<ViewComplaint/>}/>
           <Route path="file-complaint" element={<FileComplaint/>}/>
           <Route path="/home1" element={<HomePage />} /> 
        </Routes>
        </div>
    </Router>
  );
}

export default App;
