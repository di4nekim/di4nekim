'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PortfolioMenuItem from './PortfolioMenuItem'
import clickToSee from '../../assets/click_to_see.svg'

// Default projects as fallback (module scope so its identity is stable —
// otherwise the snap effect below would treat a re-render as a projects
// change and never converge).
const DEFAULT_PROJECTS = [
  { title: 'Dead Sweet Potato', year: '24', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', id: 0 },
  { title: 'Hilltop Initiative', year: '24', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con', id: 1 },
  { title: 'Pavilion', year: '24', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es', id: 2 },
  { title: 'Digital Canvas', year: '24', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur', id: 3 },
  { title: 'Urban Collective', year: '24', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', id: 4 },
]

// Viewport-derived layout constants. Kept out of render so state updates only
// fire when the numbers actually change.
function computeViewport() {
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  const headerHeight = innerWidth >= 640 ? 65 : 50
  return {
    itemHeight: innerHeight * 0.33,
    itemSpacing: innerHeight * 0.4,
    headerHeight,
    centerX: innerWidth * 0.3,
    centerY: headerHeight + (innerHeight - headerHeight) / 3.5,
    ready: true,
  }
}

const INITIAL_VIEWPORT = {
  itemHeight: 300,
  itemSpacing: 320,
  headerHeight: 50,
  centerX: 400,
  centerY: 200,
  ready: false,
}

export default function PortfolioMenu({ projects: propProjects = null }) {
  const containerRef = useRef(null)
  const scrollY = useMotionValue(0)
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100 })
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT)

  const projects = propProjects && propProjects.length > 0 ? propProjects : DEFAULT_PROJECTS
  const { itemSpacing, itemHeight, centerX, centerY, ready } = viewport

  // Measure the viewport client-side and react to resize.
  useEffect(() => {
    setViewport(computeViewport())
    const onResize = () => setViewport(computeViewport())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleProjectClick = useCallback(
    (project) => {
      setIsNavigating(true)
      // Short delay to let the slide-out animation start before route change.
      setTimeout(() => {
        router.push(
          `/portfolio/project/${project.id ?? project.title.toLowerCase().replace(/\s+/g, '-')}`
        )
      }, 300)
    },
    [router]
  )

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()

      const delta = e.deltaY * 0.5
      const currentY = scrollY.get()
      const newY = currentY - delta

      const maxY = (projects.length - 1) * itemSpacing
      const minY = 0

      let constrainedY = newY
      if (newY > maxY) {
        constrainedY = maxY + (newY - maxY) * 0.1 // elastic
      } else if (newY < minY) {
        constrainedY = minY + (newY - minY) * 0.1 // elastic
      }

      scrollY.set(constrainedY)
    },
    [scrollY, itemSpacing, projects.length]
  )

  // Snap to nearest item when scrolling settles.
  useEffect(() => {
    let timeout
    const unsubscribe = scrollY.on('change', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const currentY = scrollY.get()
        const targetIndex = Math.round(currentY / itemSpacing)
        const clampedIndex = Math.max(0, Math.min(projects.length - 1, targetIndex))
        scrollY.set(clampedIndex * itemSpacing)
      }, 150)
    })

    return () => {
      unsubscribe()
      clearTimeout(timeout)
    }
  }, [scrollY, itemSpacing, projects.length])

  // Attach wheel listener with `{ passive: false }` so preventDefault works.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="absolute left-0 top-0 w-full h-full"
      >
        <div className="relative w-full h-full">
          {ready &&
            projects.map((project, index) => (
              <PortfolioMenuItem
                key={project.id ?? index}
                project={project}
                index={index}
                smoothScrollY={smoothScrollY}
                itemSpacing={itemSpacing}
                centerX={centerX}
                centerY={centerY}
                itemHeight={itemHeight}
                isNavigating={isNavigating}
                onProjectClick={handleProjectClick}
              />
            ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-10 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={isNavigating ? { x: -1200, opacity: 0 } : { opacity: 1, y: 0 }}
        transition={
          isNavigating
            ? { duration: 0.8, ease: 'easeInOut' }
            : { delay: 0.5, duration: 0.6 }
        }
      >
        <Image
          src={clickToSee}
          alt="Click to see the full visual story"
          width={350}
          className="max-w-[350px] w-auto h-auto opacity-100 transition-opacity duration-300"
        />
      </motion.div>
    </div>
  )
}
