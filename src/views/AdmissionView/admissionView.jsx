import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdmissionHeroSection from "./admissionHeroSection";
import AdmissionSection from "./Admission";
import AdmissionFormSection from "./Admissionform";
import AdmissionPoliciesSection from "./admissionPolicies";
import AdmissionCriteriaSection from "./AdmssionCriteria";
import AllAdmissionsSection from "./allAdmissions";
import AllAdmissionPoliciesSection from "./allAdmissionPolicies";
import AllAdmissionCriteriaSection from "./allAdmissionCritreia";

export default function AdmissionView() {
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
                <AdmissionHeroSection />
            </div>
            <div id="admission">
                <AdmissionSection />
            </div>
            <div id="admission-form">
                <AdmissionFormSection />
            </div>
            <div id="admission-policies">
                <AdmissionPoliciesSection />
            </div>
            <div id="admission-criteria">
                <AdmissionCriteriaSection />
            </div>
            <div id="all-admissions">
                <AllAdmissionsSection />
            </div>
            <div id="all-policies">
                <AllAdmissionPoliciesSection />
            </div>
            <div id="all-criteria">
                <AllAdmissionCriteriaSection />
            </div>
        </div>
    );
}