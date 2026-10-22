"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import Header from "../../../components/Header.js";
import Footer from "../../../components/Footer.js";
import SharedBackground from "../../components/SharedBackground.js";
import CaseStudyMarkdown, {
  PULL_IN,
  STAGGER,
} from "../../components/CaseStudyMarkdown.js";
import { BackLink, MAIN } from "../../components/CaseStudyLayout.js";
import { useLeaveTo } from "../../components/leave.js";
import { AFTER_HOURS } from "@/lib/content";
import { PROJECTS } from "@/lib/projects";

// The other half of the exit in after-hours/components/leave.js: while the
// projects screen's elements are still sliding off to the left, this page's
// pull in from the right one at a time, top first. Going back, they slide off to
// the right and the projects screen comes back to this project.
export default function ProjectPage() {
  const params = useParams();
  const reduceMotion = useReducedMotion();

  // Resolved during render, so there's no first frame without the project.
  // A bare number is an old /portfolio/project/<index> link (redirected here
  // by next.config.mjs), so it still finds the project at that position.
  // An item without a case study has no page, only its timeline stop.
  const project = useMemo(() => {
    const found =
      PROJECTS.find((p) => p.slug === params.slug) ??
      (/^\d+$/.test(params.slug) ? PROJECTS[Number(params.slug)] : undefined);
    return found?.caseStudy ? found : undefined;
  }, [params.slug]);

  // A plain click plays the way back; a modified click (new tab) is left to
  // the browser.
  const { leaveTo } = useLeaveTo();
  const back = useCallback(
    (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      event.preventDefault();
      leaveTo(event.currentTarget.getAttribute("href"), {
        direction: 1,
        from: project?.id,
      });
    },
    [leaveTo, project],
  );

  return (
    <SharedBackground glow={false}>
      {/* Same nav as the projects screen; it stays put while the page arrives. */}
      <Header variant="after-hours" />
      <motion.div
        initial={reduceMotion ? false : "out"}
        animate="in"
        variants={STAGGER}
        className="flex min-h-screen w-full flex-col"
      >
        <BackLink onClick={back} />

        <motion.main variants={STAGGER} className={MAIN}>
          {project ? (
            <>
              <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                <motion.h1
                  data-exit
                  variants={PULL_IN}
                  className="text-4xl font-bold sm:text-5xl lg:text-6xl"
                >
                  {project.title}
                </motion.h1>
                <motion.span
                  data-exit
                  variants={PULL_IN}
                  className="text-xl italic sm:text-2xl"
                >
                  (&apos;{project.year})
                </motion.span>
              </div>

              <div className="flex flex-col gap-12">
                <motion.div data-exit variants={PULL_IN} className="flex gap-4">
                  <div className="w-[2px] shrink-0 rounded-[1px] bg-[#CB0000]" />
                  <p className="flex-1 text-lg leading-relaxed sm:text-xl">
                    {project.description}
                  </p>
                </motion.div>

                <CaseStudyMarkdown source={project.caseStudy} />
              </div>
            </>
          ) : (
            <motion.p data-exit variants={PULL_IN} className="text-xl">
              {AFTER_HOURS.notFound}
            </motion.p>
          )}
        </motion.main>
      </motion.div>
      <Footer />
    </SharedBackground>
  );
}
