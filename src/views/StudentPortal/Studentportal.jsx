import { LecternIcon, ReceiptEuro } from "lucide-react";
import StudentHeroSection from "./herosectionstudentportal";
import BookCollectionCard from "./books";
import NotesCollectionCard from "./notes";
import LectureSection from "./lecturesection";

export default function StudentPortalView(){


    return(<>
    <StudentHeroSection/>
    <BookCollectionCard/>
    <NotesCollectionCard/>
    <LectureSection/>
    </>)
}