// src/components/StudentMainLayout.jsx
import React from 'react';
import StudentNavbar from './studentNavbar';
import StudentFooter from './studentFooter';

const StudentMainLayout = ({ children, setIsAuthenticated }) => {
  return (
    <div>
      <StudentNavbar setIsAuthenticated={setIsAuthenticated} />
      <main>{children}</main>
      <StudentFooter />
    </div>
  );
};

export default StudentMainLayout;
