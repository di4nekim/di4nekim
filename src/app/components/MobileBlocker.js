import React from 'react';

// Shown on viewports narrower than md (< 768px). Uses tailwind's responsive
// utilities rather than a JS media query so it renders correctly on the
// server and never flashes during hydration.
const MobileBlocker = () => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--main-red)] px-8 text-center text-[var(--main-beige)]
                 md:hidden"
    >
      <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.3em] opacity-70">
        di4nekim
      </p>
      <h1 className="mb-4 text-[28px] font-semibold leading-tight">
        please view this page on a desktop screen.
      </h1>
      <p className="max-w-xs text-[14px] font-normal opacity-80">
        this site was made for a larger canvas — see you there :)
      </p>
    </div>
  );
};

export default MobileBlocker;
