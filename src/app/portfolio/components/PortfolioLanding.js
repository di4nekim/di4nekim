'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import LATEST_PROJECTS from '../../assets/LATEST_PROJECTS.svg'

export default function PortfolioLanding() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll()
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -400])
  const y = useTransform(scrollYProgress, [0, 1], [0, -400])
  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0])

  return (
    <div ref={ref} className="relative w-full h-[1500px] bg-[var(--main-red)]">
      <motion.div 
        initial={{ opacity: 0, x: -200, y: -200 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.5 }}
        style={{ x, y, opacity }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <Image src={LATEST_PROJECTS} alt="Latest Projects" width={600} height={500} />
      </motion.div>
    </div>
  )
}
