'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ProjectItem from './ProjectItem'
import clickToSee from '../../assets/click_to_see.svg'

function AnimatedProjectItem({ project, index, smoothScrollY, itemSpacing, itemHeight, centerX, centerY, isNavigating, onProjectClick }) {
  const diagonalPosition = useTransform(
    smoothScrollY,
    (scrollValue) => scrollValue - (index * itemSpacing)
  )

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

  const distanceFromCenter = useTransform(
    diagonalPosition,
    (pos) => Math.abs(pos)
  )

  const zIndex = useTransform(
    distanceFromCenter,
    (distance) => Math.max(1, 100 - Math.round(distance / 10))
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
      key={project.id || index}
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
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <ProjectItem 
        title={project.title}
        year={project.year}
        description={project.description}
        id={project.id}
        onProjectClick={() => onProjectClick(project)}
        isNavigating={isNavigating}
      />
    </motion.div>
  )
}

export default function PortfolioMenu({ projects: propProjects = null }) {
  const containerRef = useRef(null)
  const scrollY = useMotionValue(0)
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100 })
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [dimensions, setDimensions] = useState({
    itemHeight: 300,
    itemSpacing: 320,
    headerHeight: 50,
    centerX: 300,
    centerY: 200
  })

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

  // Calculate dimensions on client side only
  useEffect(() => {
    const updateDimensions = () => {
      const itemHeight = window.innerHeight * 0.33
      const itemSpacing = window.innerHeight * 0.4
      const headerHeight = window.innerWidth >= 640 ? 65 : 50
      const centerX = window.innerWidth * 0.3
      const centerY = headerHeight + (window.innerHeight - headerHeight) / 3.5
      
      setDimensions({
        itemHeight,
        itemSpacing,
        headerHeight,
        centerX,
        centerY
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const handleProjectClick = (project) => {
    setIsNavigating(true)
    setTimeout(() => {
      router.push(`/portfolio/project/${project.id || project.title.toLowerCase().replace(/\s+/g, '-')}`)
    }, 300)
  }

  const { itemHeight, itemSpacing, headerHeight, centerX, centerY } = dimensions

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Natural scroll accumulation
    const delta = e.deltaY * 0.5
    const currentY = scrollY.get()
    const newY = currentY - delta
    
    // Allow some overflow but with resistance
    const maxY = (projects.length - 1) * itemSpacing 
    const minY = 0
    
    let constrainedY = newY
    if (newY > maxY) {
      constrainedY = maxY + (newY - maxY) * 0.1
    } else if (newY < minY) {
      constrainedY = minY + (newY - minY) * 0.1
    }
    
    scrollY.set(constrainedY)
  }, [scrollY, projects.length, itemSpacing])

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
  }, [projects.length, handleWheel])

  return (
    <div className="relative w-full h-screen overflow-hidden">

      <div 
        ref={containerRef}
        className="absolute left-0 top-0 w-full h-full"
      >
        <div className="relative w-full h-full">
          {projects.map((project, index) => (
            <AnimatedProjectItem
              key={project.id || index}
              project={project}
              index={index}
              smoothScrollY={smoothScrollY}
              itemSpacing={itemSpacing}
              itemHeight={itemHeight}
              centerX={centerX}
              centerY={centerY}
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
        transition={isNavigating ? { duration: 0.8, ease: "easeInOut" } : { delay: 0.5, duration: 0.6 }}
      >
        <Image
          src={clickToSee}
          alt="Click to see the full visual story"
          width={350}
          // height={304}
          className="max-w-[350px] w-auto h-auto opacity-100 transition-opacity duration-300"
        />
      </motion.div>
    </div>
  )
}
