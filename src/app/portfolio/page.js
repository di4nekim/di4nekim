'use client'

import Header from "../components/Header.js";
import Footer from '../components/Footer.js';
import PortfolioLanding from './components/PortfolioLanding.js';
import PortfolioMenu from './components/PortfolioMenu.js';
import SharedBackground from './components/SharedBackground.js';
import '@/app/globals.css';

export default function Portfolio() {
  return (
    <SharedBackground>
      <Header />
      <PortfolioLanding />
      <PortfolioMenu />
      <Footer />
    </SharedBackground>
  );
}
