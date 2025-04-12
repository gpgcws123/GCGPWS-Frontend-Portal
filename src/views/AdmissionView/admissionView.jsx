import AdmissionSection from "./Admission";
import AdmissionHeroSection from "./admissionHeroSection";
import AdmissionPoliciesSection from "./admissionPolicies"
import AdmissionCariteriaSection from "./AdmssionCriteria";
 export default function Admission(){
    return(
        <>
        <AdmissionHeroSection/>
     <AdmissionSection/>
     <AdmissionPoliciesSection/>
     <AdmissionCariteriaSection/>

        </>
    )
 }