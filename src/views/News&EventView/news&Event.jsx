import CulturalSection from "./Cultural"
import EventSection from "./Eventview"
import NewsEventsHeroSection from "./news&EventHeroSection"
import NewsSection from "./newsView"

export default function NewsEvents(){
    return(
        <>
        <NewsEventsHeroSection/>
        <EventSection/>
<NewsSection/>
<CulturalSection/>
        </>
    )

}