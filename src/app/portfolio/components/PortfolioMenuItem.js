'use client'

import { motion, useTransform } from 'framer-motion'
import ProjectItem from './ProjectItem'

// One project row in the diagonal portfolio menu.
//
// This exists as its own component (extracted from PortfolioMenu's `.map()`)
// so that the useTransform hooks below are called in a fixed order per
// instance rather than in a variable-length loop — which would violate
// React's rules-of-hooks the moment `projects` ever changed length.
export default function PortfolioMenuItem({
  project,
  index,
  smoothScrollY,
  itemSpacing,
  centerX,
  centerY,
  itemHeight,
  isNavigating,
  onProjectClick,
}) {
  // Item's scroll-space offset from the "current" position.
  const diagonalPosition = useTransform(
    smoothScrollY,
    (v) => v - index * itemSpacing
  )

  // 45° diagonal projection of that offset.
  const x = useTransform(
    diagonalPosition,
    (pos) => centerX + pos * Math.cos(Math.PI / 4) * 0.8
  )
  const y = useTransform(
    diagonalPosition,
    (pos) => centerY + pos * Math.sin(Math.PI / 4) * 0.8
  )

  const distanceFromCenter = useTransform(diagonalPosition, (pos) => Math.abs(pos))

  const zIndex = useTransform(distanceFromCenter, (d) =>
    Math.max(1, 100 - Math.round(d / 10))
  )

  const opacity = useTransform(
    distanceFromCenter,
    [0, itemSpacing * 0.8, itemSpacing * 1.5, itemSpacing * 2.5],
    [1, 0.9, 0.4, 0]
  )

  const scale = useTransform(
    distanceFromCenter,
    [0, itemSpacing * 0.8, itemSpacing * 1.5, itemSpacing * 2.5],
    [1, 0.95, 0.8, 0.6]
  )

  const blur = useTransform(
    distanceFromCenter,
    [0, itemSpacing * 0.6, itemSpacing * 1.2, itemSpacing * 2.0],
    [0, 0.5, 3, 6]
  )
  const filter = useTransform(blur, (b) => `blur(${b}px)`)

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{
        x,
        y,
        opacity,
        scale,
        filter,
        zIndex,
        width: '50vw',
        height: `${itemHeight}px`,
        transformOrigin: 'center center',
      }}
      animate={isNavigating ? { x: -1200, opacity: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <ProjectItem
        title={project.title}
        year={project.year}
        description={project.description}
        onProjectClick={() => onProjectClick(project)}
        isNavigating={isNavigating}
      />
    </motion.div>
  )
}
