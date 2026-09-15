"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BlurredElipse from "@/app/assets/blurred_elipse.svg";

export default function SharedBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--main-beige)]">
      <div className="pointer-events-none fixed inset-0 z-0">
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

      {/* Content area */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
