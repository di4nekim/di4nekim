import Header from "./components/Header.js";
import { Landing } from "./components/Landing.js";
import Experience from "./components/Experience.js";
import Footer from './components/Footer.js';
import '@/app/globals.css';

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <Landing />
      <Experience />
      <Footer />
    </div>
  );
}
