import Header from "./components/Header.js";
import { Landing } from "./components/Landing.js";
import Experience from "./components/Experience.js";
import ExpSection from './components/ExpSection.js';
import Footer from './components/Footer.js';
import PersonalProjects from './components/PersonalProjects.js';
import '@/app/globals.css';

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <Landing />
      <Experience />
      <ExpSection />
      {/* <PersonalProjects /> */}
      <Footer />
    </div>
  );
}
