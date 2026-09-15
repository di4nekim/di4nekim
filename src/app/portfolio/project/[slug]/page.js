"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SharedBackground from "../../components/SharedBackground.js";

// Module-scope so identity is stable across renders — otherwise the useEffect
// below would need it in deps, and re-lint would flag it. Matches the pattern
// in PortfolioMenu.js.
const DEFAULT_PROJECTS = [
  {
    title: "Dead Sweet Potato",
    year: "'24",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    id: 0,
  },
  {
    title: "Hilltop Initiative",
    year: "'24",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con",
    id: 1,
  },
  {
    title: "Pavilion",
    year: "'24",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es",
    id: 2,
  },
  {
    title: "Digital Canvas",
    year: "'24",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    id: 3,
  },
  {
    title: "Urban Collective",
    year: "'24",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    id: 4,
  },
];

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const slug = params.slug;
    // Find project by id or slug
    const foundProject = DEFAULT_PROJECTS.find(
      (p) =>
        p.id.toString() === slug ||
        p.title.toLowerCase().replace(/\s+/g, "-") === slug,
    );
    setProject(foundProject);
  }, [params.slug]);

  const handleBack = () => {
    router.push("/portfolio");
  };

  if (!project) {
    return (
      <SharedBackground>
        <div className="flex h-screen items-center justify-center">
          <div className="text-xl text-[#CB0000]">Project not found</div>
        </div>
      </SharedBackground>
    );
  }

  return (
    <SharedBackground>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }} // Faster to overlap with menu slide-out
        className="flex h-screen w-full flex-col"
      >
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }} // Reduced delay for faster appearance
          className="border-b border-[#CB0000] p-8"
        >
          <button
            onClick={handleBack}
            className="text-lg text-[#CB0000] transition-opacity hover:opacity-70"
          >
            ← Back to Portfolio
          </button>
        </motion.header>

        {/* Main content */}
        <motion.main
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }} // Reduced delay for faster appearance
          className="mx-auto max-w-4xl flex-1 p-8"
        >
          <div className="mb-8">
            <h1 className="mb-4 text-6xl font-bold text-[#CB0000]">
              {project.title}
            </h1>
            <span className="text-2xl italic text-[#CB0000]">
              ({project.year})
            </span>
          </div>

          <div className="prose prose-lg max-w-none text-[#CB0000]">
            <p className="mb-8 text-xl leading-relaxed">
              {project.description}
            </p>

            {/* Placeholder for additional project content */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-200">
                <span className="text-gray-500">Project Image</span>
              </div>
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-200">
                <span className="text-gray-500">Project Image</span>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-3xl font-bold">Project Details</h2>
              <p className="text-lg leading-relaxed">
                This is where you can add more detailed information about the
                project, including technologies used, challenges faced, and
                solutions implemented.
              </p>
            </div>
          </div>
        </motion.main>
      </motion.div>
    </SharedBackground>
  );
}
