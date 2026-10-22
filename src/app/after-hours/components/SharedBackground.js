"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BlurredElipse from "@/app/assets/blurred_elipse.svg";

// `glow` is the blurred ellipse in the top right. The case study goes without.
// It is marked for the case-study exit to hide along with the scene, as the
// page's sections cover it and hiding them would otherwise uncover it.
export default function SharedBackground({ children, glow = true }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--main-beige)]">
      {glow && (
        <div data-exit-glow className="pointer-events-none fixed inset-0 z-0">
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            style={{
              position: "absolute",
              top: "-35%",
              right: "-30%",
              width: "70vw",
              height: "auto",
            }}
          >
            <Image
              src={BlurredElipse}
              alt="Blurred Elipse"
              className="w-full object-cover opacity-50"
            />
          </motion.div>
        </div>
      )}

      {/* Content area. The scene the case-study exit copies; see leave.js. */}
      <div data-exit-scene className="relative z-10">
        {children}
      </div>
    </div>
  );
}
