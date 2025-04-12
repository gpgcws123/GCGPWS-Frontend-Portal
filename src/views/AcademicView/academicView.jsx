import AcademicHeroSection from "./academicHeroSection";
import DepartmentSection from "./department";
import ProgramSection from "./program";
import TeacherFacultyCard from "./teacherFaculty";

 export default function Academic(){
    return(
        <>
        <AcademicHeroSection/>
    
        <ProgramSection/>
        <TeacherFacultyCard/>
        <DepartmentSection/>
        </>
    )
 }