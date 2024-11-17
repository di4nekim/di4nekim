import { Landing } from "./components/Landing.js";
import Header from "./components/Header.js";
import Footer from './components/Footer.js';
import '@/app/globals.css';

export default function Home() {
  return (
    <div>
      <Header />
      <Landing />
      <Footer />
    </div>
  );
}
