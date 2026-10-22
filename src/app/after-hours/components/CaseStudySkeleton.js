import { BackLink, MAIN } from "./CaseStudyLayout.js";

// Stands in for the case study while its route is still loading: the same
// column, with pulsing blocks where the title, description, images and
// details will land.
const bar = "rounded bg-[#CB0000]/10";

export default function CaseStudySkeleton() {
  return (
    <div aria-busy="true" className="flex min-h-screen w-full flex-col">
      <BackLink />
      <div className={`${MAIN} animate-pulse motion-reduce:animate-none`}>
        <span className="sr-only">Loading</span>
        <div className="flex items-end gap-4">
          <div className={`${bar} h-10 w-2/3 sm:h-[60px]`} />
          <div className={`${bar} h-6 w-12 sm:h-8`} />
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex gap-4">
            <div className="w-[2px] shrink-0 rounded-[1px] bg-[#CB0000]/20" />
            <div className="flex flex-1 flex-col gap-3 py-1">
              <div className={`${bar} h-5 w-full`} />
              <div className={`${bar} h-5 w-1/2`} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="h-64 rounded-lg bg-gray-200" />
            <div className="h-64 rounded-lg bg-gray-200" />
          </div>

          <div className="flex flex-col gap-6">
            <div className={`${bar} h-8 w-1/3 sm:h-9`} />
            <div className="flex flex-col gap-3">
              <div className={`${bar} h-4 w-full`} />
              <div className={`${bar} h-4 w-full`} />
              <div className={`${bar} h-4 w-2/3`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
