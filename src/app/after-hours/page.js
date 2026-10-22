"use client";

import { useCallback, useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import PortfolioLanding from "./components/PortfolioLanding.js";
import ProjectBlurbs from "./components/ProjectBlurbs.js";
import SoftSnap from "./components/SoftSnap.js";
import { DiagonalReveal } from "../components/DiagonalReveal.js";
import SharedBackground from "./components/SharedBackground.js";
import { returningFrom } from "./components/leave.js";
import "@/app/globals.css";

export default function Portfolio() {
  // The snap arms once the landing has finished arriving, so a scroll during
  // the entrance doesn't yank the page out from under it. Back from a case
  // study the page opens on the projects, past the landing, so it is armed
  // from the start.
  const [landed, setLanded] = useState(() => returningFrom() !== null);
  const land = useCallback(() => setLanded(true), []);

  return (
    <SharedBackground>
      <DiagonalReveal onSettled={land}>
        <Header variant="after-hours" />
        <PortfolioLanding />
      </DiagonalReveal>
      <ProjectBlurbs />
      <Footer />
      <SoftSnap enabled={landed} />
    </SharedBackground>
  );
}
