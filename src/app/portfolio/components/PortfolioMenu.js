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
  const itemSpacing = typeof window !== 'undefined' ? window.innerHeight * 0.25 : 200 // Tighter spacing
  const headerHeight = typeof window !== 'undefined' ? (window.innerWidth >= 640 ? 65 : 50) : 50

  // Calculate current active project based on scroll position
  const currentProject = useTransform(smoothScrollY, (y) => {
    const index = Math.round(-y / itemSpacing)
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
    const maxY = 0
    const minY = -(projects.length - 1) * itemSpacing
    
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
        const targetIndex = Math.round(-currentY / itemSpacing)
        const clampedIndex = Math.max(0, Math.min(projects.length - 1, targetIndex))
        const targetY = -clampedIndex * itemSpacing
        
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
        className="absolute left-1/2 top-0 transform -translate-x-1/2 w-[50vw] h-full max-w-2xl"
      >
        <div className="relative w-full h-full">
          {projects.map((project, index) => {
            // Calculate position relative to smooth scroll
            const y = useTransform(
              smoothScrollY,
              (scrollValue) => {
                const baseY = headerHeight + (window.innerHeight - headerHeight) / 2 - itemHeight / 2
                return baseY + scrollValue + (index * itemSpacing)
              }
            )

            // Calculate opacity and scale based on distance from center
            const centerY = headerHeight + (window.innerHeight - headerHeight) / 2 - itemHeight / 2
            
            const opacity = useTransform(
              y,
              [
                centerY - itemSpacing * 2,
                centerY - itemSpacing * 0.5,
                centerY + itemSpacing * 0.5,
                centerY + itemSpacing * 2
              ],
              [0, 1, 1, 0]
            )

            const scale = useTransform(
              y,
              [
                centerY - itemSpacing * 2,
                centerY - itemSpacing * 0.5,
                centerY + itemSpacing * 0.5,
                centerY + itemSpacing * 2
              ],
              [0.8, 1, 1, 0.8]
            )

            // Symmetric blur - same blur for items at same distance above/below center
            const blur = useTransform(
              y,
              [
                centerY - itemSpacing * 2,     // Far above center
                centerY - itemSpacing,         // One item above center
                centerY,                       // Perfect center
                centerY + itemSpacing,         // One item below center  
                centerY + itemSpacing * 2      // Far below center
              ],
              [6, 3, 0, 3, 6] // Symmetric blur values
            )

            return (
              <motion.div
                key={project.id || index}
                className="absolute w-full flex items-center justify-center"
                style={{
                  y,
                  opacity,
                  scale,
                  filter: useTransform(blur, (b) => `blur(${b}px)`),
                  height: `${itemHeight}px`,
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
