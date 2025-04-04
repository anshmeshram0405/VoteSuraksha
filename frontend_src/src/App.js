import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import VotingPage from './pages/VotingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import './App.css';
import WelcomeHome from './pages/WelcomeHome';
import AddNewPartyAdmin from './pages/AddNewPartyAdmin';
import SuccessfulVote from './pages/SuccessfulVote';
import AdminLogin from './pages/AdminLogin';

const App = () => {
    return (
        <Router>
          
            <Routes>
                <Route path="/" element={<WelcomeHome />} />
                <Route path="/face-login" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/give-vote" element={<VotingPage />} />
                <Route path="/successfull-vote" element={<SuccessfulVote />} />

                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/add-party" element={<AddNewPartyAdmin />} />
                <Route path="/admin-login" element={<AdminLogin />} />
            </Routes>
        </Router>
    );
};

export default App;
