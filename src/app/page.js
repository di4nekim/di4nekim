import Header from "./components/Header.js";
import { Landing } from "./components/Landing.js";
import Experience from "./components/Experience.js";
import ExpSection from './components/ExpSection.js';
import Footer from './components/Footer.js';
import MobileBlocker from './components/MobileBlocker.js';
import '@/app/globals.css';

export default function Home() {
  return (
    <>
      <MobileBlocker />
      <div className="relative hidden md:block">
        <Header />
        <Landing />
        <Experience />
        <ExpSection />
        <Footer />
      </div>
    </>
  );
}
