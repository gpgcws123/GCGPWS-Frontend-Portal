import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FacilitiesHeroSection from "./FacilityHeroSection";
import LibrarySection from "./librarySection";
import CompLabSection from "./computerLab";
import HostelSection from "./hostelSection";
import TransportSection from "./transportSection";
import MasjidSection from "./masjidSection";
import DispensarySection from "./dispensarySection";
import CanteenSection from "./canteenSection";
import SportFitnessSection from "./sport&fitness";

export default function Facilities() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <div>
            <div>
                <FacilitiesHeroSection />
            </div>
            <div id="library">
                <LibrarySection />
            </div>
            <div id="computer-lab">
                <CompLabSection />
            </div>
            <div id="hostel">
                <HostelSection />
            </div>
            <div id="transport">
                <TransportSection />
            </div>
            <div id="masjid">
                <MasjidSection />
            </div>
            <div id="dispensary">
                <DispensarySection />
            </div>
            <div id="canteen">
                <CanteenSection />
            </div>
            <div id="sport-fitness">
                <SportFitnessSection />
            </div>
        </div>
    );
}
