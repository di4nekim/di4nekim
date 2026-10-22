"use client";

import { useRef } from "react";
import Image from "next/image";
import { Reveal } from "../../components/DiagonalReveal.js";
import diagonalArrow from "../../assets/after-hours/diagonal-arrow.svg";
import ellipseLarge from "../../assets/after-hours/ellipse-large.svg";
import arrowButton from "../../assets/after-hours/arrow-button.svg";

// Figma: "portfolio – landing / design system — red field" (1659:290).
// Composed on the 1440 × 1024 frame. --u is one design pixel, scaled so the
// whole frame fits the section (container query units), so every value below
// is the Figma number as-is.
const u = (n) => `calc(var(--u) * ${n})`;
const box = (left, top, width, height) => ({
  left: u(left),
  top: u(top),
  width: width === undefined ? undefined : u(width),
  height: height === undefined ? undefined : u(height),
});

export default function PortfolioLanding() {
  const ref = useRef(null);

  const scrollPast = () =>
    window.scrollTo({ top: ref.current.offsetHeight, behavior: "smooth" });

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[var(--main-red)] text-[var(--main-beige)] [container-type:size] [font-family:var(--font-family-primary)]"
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [--u:min(100cqw/1440,100cqh/1024)]"
        style={{ width: u(1440), height: u(1024) }}
      >
        <Reveal className="absolute" style={box(373, 393, 376, 429)}>
          <Image
            src={diagonalArrow}
            alt=""
            priority
            className="size-full -scale-x-100"
          />
        </Reveal>

        {/* Soft bloom behind the type; the SVG carries its own 8px blur and
            overhangs the 600px circle by 16px on every side. */}
        <Reveal className="absolute" style={box(716, 291, 632, 632)}>
          <Image src={ellipseLarge} alt="" priority className="size-full" />
        </Reveal>

        <h1 className="m-0 text-[length:var(--title)] font-bold leading-[1.21] [--title:calc(var(--u)*128)]">
          <Reveal as="span" className="absolute block" style={box(591, 449)}>
            AFTER
          </Reveal>
          <Reveal as="span" className="absolute block" style={box(591, 604)}>
            HOURS
          </Reveal>
        </h1>

        {/* Frosted glass laid over the title. backdrop-filter has to sit on
            the animated element itself: an opacity on any ancestor would
            become the backdrop root and the glass would blur nothing. */}
        <Reveal
          aria-hidden
          className="absolute rounded-full bg-[rgba(245,239,232,0.18)] backdrop-blur-[calc(var(--u)*2)]"
          style={box(534, 307, 400, 400)}
        />

        <Reveal
          as="p"
          className="absolute m-0 whitespace-nowrap font-medium"
          style={{ ...box(901, 744), fontSize: u(24) }}
        >
          ( ‘19 - NOW )
        </Reveal>

        <Reveal
          as="p"
          className="absolute m-0 whitespace-nowrap font-medium italic"
          style={{ ...box(614, 419), fontSize: u(32) }}
        >
          <span className="opacity-65">IN THE</span>
        </Reveal>

        <Reveal className="absolute" style={box(1069, 658, 70, 70)}>
          <button
            type="button"
            onClick={scrollPast}
            aria-label="Scroll to projects"
            className="block size-full rounded-full transition-transform duration-300 hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            <Image src={arrowButton} alt="" className="size-full" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
