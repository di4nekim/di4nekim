import Header from "../../../components/Header.js";
import Footer from "../../../components/Footer.js";
import SharedBackground from "../../components/SharedBackground.js";
import CaseStudySkeleton from "../../components/CaseStudySkeleton.js";

// Shown while a case study's route is on its way (a slow connection or a
// cold chunk), in the same frame as the page itself.
export default function Loading() {
  return (
    <SharedBackground glow={false}>
      <Header variant="after-hours" />
      <CaseStudySkeleton />
      <Footer />
    </SharedBackground>
  );
}
