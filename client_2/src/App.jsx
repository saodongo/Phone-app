import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PhoneList from './components/PhoneList';
import FeaturesList from './components/FeaturesList';
import Profile from './components/Profile';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pt-[13vh]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phones" element={<PhoneList />} />
          <Route path="/features" element={<FeaturesList />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;