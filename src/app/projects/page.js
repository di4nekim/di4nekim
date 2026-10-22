import Header from "../components/Header.js";
import MobileBlocker from "../components/MobileBlocker.js";
import ProjectsLanding from "./components/ProjectsLanding.js";
import "@/app/globals.css";

export const metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return (
    <>
      <MobileBlocker />
      <div className="relative hidden md:block">
        <Header />
        <ProjectsLanding />
      </div>
    </>
  );
}
