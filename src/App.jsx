import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './views/HomeView/home';
import './index.css';
import Facilities from './views/FacilitiesView/facilities';
import NewsEvents from './views/News&EventView/news&Event';
import Academic from './views/AcademicView/academicView';
import Admission from './views/AdmissionView/admissionView';
const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/facilities" element={<Facilities />} />
                    <Route path="/admission" element={<Admission />} />
                    <Route path="/academic" element={<Academic />} />
                    <Route path="/news" element={<NewsEvents />} />
                    
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
