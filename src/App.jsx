import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './views/HomeView/home';
import Facilities from './views/FacilitiesView/facilities';
import NewsEvents from './views/News&EventView/news&Event';
import Academic from './views/AcademicView/academicView';
import Admission from './views/AdmissionView/admissionView';
import AdmissionForm from './views/AdmissionView/Admissionform';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import ProtectedRoute from './components/protectedRuotes';
import StudentPortalView from './views/StudentPortal/Studentportal';
import StudentMainLayout from './components/mainlayout';
import AllBooks from './views/StudentPortal/AllBooks';
import AllNotes from './views/StudentPortal/Allnotes';
import Alllecture from './views/StudentPortal/Alllecture';
import AllLecture from './views/StudentPortal/Alllecture';
import DetailPage from './views/AcademicView/departmentDetail';
import AllAdmisson from './views/AdmissionView/allAdmissions';
import AllAdmissionPolicies from './views/AdmissionView/allAdmissionPolicies';
import AllAdmissionCritreia from './views/AdmissionView/allAdmissionCritreia';
import AllDepartment from './views/AcademicView/allDepartments';
import AllPrograms from './views/AcademicView/allprogramsDetail';
import AllTeacherFaculty from './views/AcademicView/allteacherfaculty';
import AllEventView from './views/News&EventView/allEventView';
import AllNewsView from './views/News&EventView/allNewView';
import AllCulturals from './views/News&EventView/allCultural';
import AdminPanel from './views/AdminDashboardView/adminPanel';
import EventDetail from './views/News&EventView/EventDetail';
import NewsDetail from './views/News&EventView/NewsDetail';
import CulturalDetail from './views/News&EventView/CulturalDetail';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated') === 'true');
  
  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');
    if (auth === 'false' || auth === null) {
      setIsAuthenticated(false); // Ensure we're not showing protected routes if not logged in
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/facilities" element={<Layout><Facilities /></Layout>} />
        <Route path="/admission" element={<Layout><Admission /></Layout>} />
        <Route path="/news" element={<Layout><NewsEvents /></Layout>} />
        <Route path="/admission/admissionform" element={<Layout><AdmissionForm /></Layout>} />
        <Route path="/academic" element={<Layout><Academic/></Layout>} />
        <Route path="/student-portal/All-Books" element={<StudentMainLayout><AllBooks/></StudentMainLayout>} />
        <Route path="/academic/Detailpage" element={<Layout><DetailPage/></Layout>} />
        <Route path="/admisson/alladmisson" element={<Layout><AllAdmisson/></Layout>} />
        <Route path="/admisson/alladmissonpolicies" element={<Layout><AllAdmissionPolicies/></Layout>} />
        <Route path="/admisson/alladmissoncritria" element={<Layout><AllAdmissionCritreia/></Layout>} />
        <Route path="/academic/alldepartment" element={<Layout><AllDepartment/></Layout>} />
        <Route path="/academic/allprograms" element={<Layout><AllPrograms/></Layout>} />
        <Route path="/academic/allteacherfaculty" element={<Layout><AllTeacherFaculty/></Layout>} />
        <Route path="/news/allevents" element={<Layout>  <AllEventView/></Layout>} />
        <Route path="/news/allnews" element={<Layout>  <AllNewsView/></Layout>} />
        <Route path="/news/allcultural" element={<Layout>  <AllCulturals/></Layout>} />
      
        <Route path="/student-portal/All-Notes" element={<StudentMainLayout><AllNotes/></StudentMainLayout>} />
        <Route path="/student-portal/All-Lecture" element={<StudentMainLayout><AllLecture/></StudentMainLayout>} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignupPage />} />
       <Route
  path="/admin"
  element={
      <AdminPanel />
    
  }
/>
        
        <Route
          path="/student-portal"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <StudentMainLayout setIsAuthenticated={setIsAuthenticated}>
                <StudentPortalView />
              </StudentMainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/events/:id" element={<Layout><EventDetail /></Layout>} />
        <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
        <Route path="/cultural/:id" element={<Layout><CulturalDetail /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
