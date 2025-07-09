'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ProjectItem from './ProjectItem'

export default function PortfolioMenu({ projects: propProjects = null }) {
  const containerRef = useRef(null)
  const scrollY = useMotionValue(0)
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100 })

  // Default projects as fallback
  const defaultProjects = [
    { title: 'Dead Sweet Potato', year: '24', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore', id: 0 },
    { title: 'Hilltop Initiative', year: '24', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con', id: 1 },
    { title: 'Pavilion', year: '24', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es', id: 2 },
    { title: 'Digital Canvas', year: '24', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur', id: 3 },
    { title: 'Urban Collective', year: '24', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', id: 4 },
  ]

  // Use provided projects or fall back to defaults
  const projects = propProjects && propProjects.length > 0 ? propProjects : defaultProjects

  const itemHeight = typeof window !== 'undefined' ? window.innerHeight * 0.33 : 300
  const itemSpacing = typeof window !== 'undefined' ? window.innerHeight * 0.4 : 320
  const headerHeight = typeof window !== 'undefined' ? (window.innerWidth >= 640 ? 65 : 50) : 50

  // Calculate diagonal movement - for 45 degrees, x and y move equally
  const diagonalSpacing = itemSpacing / Math.sqrt(2) // Convert vertical spacing to diagonal distance

  // Calculate current active project based on scroll position
  const currentProject = useTransform(smoothScrollY, (y) => {
    const index = Math.round(y / itemSpacing)
    return Math.max(0, Math.min(projects.length - 1, index))
  })

  const handleWheel = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Natural scroll accumulation
    const delta = e.deltaY * 0.5 // Reduce sensitivity
    const currentY = scrollY.get()
    const newY = currentY - delta
    
    // Allow some overflow but with resistance
    const maxY = (projects.length - 1) * itemSpacing 
    const minY = 0 // Starting position is 0
    
    let constrainedY = newY
    if (newY > maxY) {
      constrainedY = maxY + (newY - maxY) * 0.1 // Elastic resistance
    } else if (newY < minY) {
      constrainedY = minY + (newY - minY) * 0.1 // Elastic resistance
    }
    
    scrollY.set(constrainedY)
  }

  // Snap to nearest item when scrolling stops
  useEffect(() => {
    let timeout
    const unsubscribe = scrollY.on('change', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const currentY = scrollY.get()
        const targetIndex = Math.round(currentY / itemSpacing)
        const clampedIndex = Math.max(0, Math.min(projects.length - 1, targetIndex))
        const targetY = clampedIndex * itemSpacing
        
        // Smooth snap to nearest item
        scrollY.set(targetY)
      }, 150) // Snap after 150ms of no movement
    })

    return () => {
      unsubscribe()
      clearTimeout(timeout)
    }
  }, [scrollY, itemSpacing, projects.length])

  // Properly attach wheel event listener
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [projects.length])

  return (
    <div className="relative w-full h-screen bg-[var(--main-beige)] overflow-hidden">
      <div 
        ref={containerRef}
        className="absolute left-0 top-0 w-full h-full"
      >
        <div className="relative w-full h-full">
          {projects.map((project, index) => {
            // Calculate diagonal position (45-degree angle from top-left to bottom-right)
            const diagonalPosition = useTransform(
              smoothScrollY,
              (scrollValue) => scrollValue - (index * itemSpacing)
            )

            // Define consistent center points for both positioning and effects
            const centerX = window.innerWidth * 0.3 // Affects left-right position
            const centerY = headerHeight + (window.innerHeight - headerHeight) / 3.5 // Affects top-bottom position

            // Calculate X and Y positions for 45-degree diagonal
            const x = useTransform(
              diagonalPosition,
              (pos) => {
                const diagonalOffset = pos * Math.cos(Math.PI / 4) * 0.8
                return centerX + diagonalOffset
              }
            )

            const y = useTransform(
              diagonalPosition,
              (pos) => {
                const diagonalOffset = pos * Math.sin(Math.PI / 4) * 0.8
                return centerY + diagonalOffset
              }
            )

            // Distance from center for effects calculation
            const distanceFromCenter = useTransform(
              diagonalPosition,
              (pos) => Math.abs(pos) // Use absolute value to ensure symmetric behavior
            )

            // Calculate z-index based on distance from center (closer items on top)
            const zIndex = useTransform(
              distanceFromCenter,
              (distance) => Math.max(1, 100 - Math.round(distance / 10))
            )

            // Calculate opacity based on distance from center
            const opacity = useTransform(
              distanceFromCenter,
              [0, itemSpacing * 0.8, itemSpacing * 1.5, itemSpacing * 2.5],
              [1, 0.9, 0.4, 0]
            )

            // Calculate scale based on distance from center
            const scale = useTransform(
              distanceFromCenter,
              [0, itemSpacing * 0.8, itemSpacing * 1.5, itemSpacing * 2.5],
              [1, 0.95, 0.8, 0.6]
            )

            // Calculate blur based on distance from center
            const blur = useTransform(
              distanceFromCenter,
              [0, itemSpacing * 0.6, itemSpacing * 1.2, itemSpacing * 2.0],
              [0, 0.5, 3, 6]
            )

            return (
              <motion.div
                key={project.id || index}
                className="absolute flex items-center justify-center"
                style={{
                  x,
                  y,
                  opacity,
                  scale,
                  filter: useTransform(blur, (b) => `blur(${b}px)`),
                  zIndex,
                  width: '50vw',
                  height: `${itemHeight}px`,
                  transformOrigin: 'center center',
                }}
              >
                <ProjectItem 
                  title={project.title}
                  year={project.year}
                  description={project.description}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
