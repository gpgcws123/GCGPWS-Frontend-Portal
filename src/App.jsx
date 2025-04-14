import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './views/HomeView/home';
import './index.css';
import Facilities from './views/FacilitiesView/facilities';
import NewsEvents from './views/News&EventView/news&Event';
import Academic from './views/AcademicView/academicView';
import Admission from './views/AdmissionView/admissionView';
import AdmissionForm from './views/AdmissionView/Admissionform';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import ProtectedRoute from './components/protectedRuotes';
import StudentPortalView from './views/StudentPortal/Studentportal';

const isAuthenticated = false; 
const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={ <Layout><Home /></Layout>} />
                    <Route path="/facilities" element={ <Layout><Facilities /></Layout>} />
                    <Route path="/admission" element={ <Layout><Admission /></Layout>} />
                    <Route path="/news" element={<Layout><NewsEvents /></Layout>} />
                    <Route path="/admission/admissionform" element={<Layout><AdmissionForm /></Layout>} />
                    <Route path="/academic" element={<Layout><Academic/></Layout>} />
                    
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    
                    <Route path="/studentportal" element={ <ProtectedRoute isAuthenticated={isAuthenticated}><StudentPortalView/>  </ProtectedRoute> } />
                    
                </Routes>
            
        </Router>
    );
};

export default App;
