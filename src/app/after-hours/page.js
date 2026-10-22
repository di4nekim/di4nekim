"use client";

import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import PortfolioLanding from "./components/PortfolioLanding.js";
import ProjectBlurbs from "./components/ProjectBlurbs.js";
import { DiagonalReveal } from "../components/DiagonalReveal.js";
import SharedBackground from "./components/SharedBackground.js";
import "@/app/globals.css";

export default function Portfolio() {
  return (
    <SharedBackground>
      <DiagonalReveal>
        <Header variant="after-hours" />
        <PortfolioLanding />
      </DiagonalReveal>
      <ProjectBlurbs />
      <Footer />
    </SharedBackground>
  );
}
