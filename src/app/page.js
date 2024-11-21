import Header from "./components/Header.js";
import Sidebar from "./components/Sidebar.js";
import { Landing } from "./components/Landing.js";
import Footer from './components/Footer.js';
import '@/app/globals.css';

export default function Home() {
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <Landing />
      <Footer />
    </div>
  );
}
