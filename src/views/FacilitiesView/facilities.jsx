import { div } from "framer-motion/client";
import FacilitesHeroSection from "./FacilityHeroSection";
import LibrarySection from "./librarySection";
import CompLabSection from "./computerLab";

export default function Facilities() {
    return (
        <div>
            <FacilitesHeroSection />
            <LibrarySection/>
            <CompLabSection/>
        </div>
    )
}