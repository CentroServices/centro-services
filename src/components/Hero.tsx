"use client"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [nodes, setNodes] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const animationRef = useRef(null)
  const containerRef = useRef(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Network background animation
  useEffect(() => {
    if (!containerRef.current) return

    // Create nodes
    const createNodes = () => {
      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight
      const nodeCount = isMobile ? 15 : 30

      const newNodes = []
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * containerWidth,
          y: Math.random() * containerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
        })
      }
      setNodes(newNodes)

      // Set loaded state after a small delay to ensure animations are ready
      setTimeout(() => {
        setIsLoaded(true)
      }, 100)
    }

    createNodes()

    // Animation loop
    const animate = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight

      setNodes((prevNodes) => {
        return prevNodes.map((node) => {
          // Update position
          let x = node.x + node.vx
          let y = node.y + node.vy

          // Bounce off edges
          if (x < 0 || x > containerWidth) {
            node.vx *= -1
            x = Math.max(0, Math.min(x, containerWidth))
          }
          if (y < 0 || y > containerHeight) {
            node.vy *= -1
            y = Math.max(0, Math.min(y, containerHeight))
          }

          return {
            ...node,
            x,
            y,
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    // Handle resize
    const handleResize = () => {
      createNodes()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobile])

  // Calculate connections between nodes
  const getConnections = () => {
    const connections = []
    const connectionDistance = isMobile ? 100 : 150

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - distance / connectionDistance
          connections.push({
            id: `${i}-${j}`,
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            opacity: opacity * 0.2, // Keep connections subtle
          })
        }
      }
    }

    return connections
  }

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  }

  // Cell tower animation variants
  const towerBaseVariants = {
    hidden: { scaleY: 0, originY: 1 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  }

  const towerStructureVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1.2,
        delay: 0.4,
        ease: "easeInOut",
      },
    },
  }

  const towerSectionVariants = {
    hidden: { pathLength: 0 },
    visible: (i) => ({
      pathLength: 1,
      transition: {
        duration: 0.5,
        delay: 0.6 + i * 0.1,
        ease: "easeInOut",
      },
    }),
  }

  const antennaVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 1.5 + i * 0.15,
        ease: "easeOut",
      },
    }),
  }

  const signalVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: [0, 0.7, 0],
      scale: [0.8, 1.2, 1.5],
      transition: {
        duration: 2,
        delay: 2 + i * 0.2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    }),
  }

  const deviceVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 2.2 + i * 0.2,
      },
    }),
  }

  const pulseVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: [0, 0.5, 0],
      scale: [1, 1.8, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

  const connectionVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i) => ({
      opacity: [0, 0.7, 0.3],
      pathLength: 1,
      transition: {
        opacity: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.5, 1],
          delay: 2.4 + i * 0.2,
        },
        pathLength: {
          duration: 1,
          delay: 2.4 + i * 0.2,
        },
      },
    }),
  }

  const dataPacketVariants = {
    hidden: { opacity: 0, pathOffset: 0 },
    visible: (i) => ({
      opacity: [0, 1, 0],
      pathOffset: [0, 1, 1],
      transition: {
        opacity: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: i * 0.5,
        },
        pathOffset: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: i * 0.5,
        },
      },
    }),
  }

  const devices = [
    { x: 70, y: 200, icon: "phone" },
    { x: 230, y: 220, icon: "wifi" },
    { x: 90, y: 350, icon: "phone" },
    { x: 210, y: 380, icon: "building" },
  ]

  const mobileDevices = [
    { x: 90, y: 200, icon: "phone" },
    { x: 210, y: 220, icon: "wifi" },
  ]

  // Get connections for the network background
  const connections = getConnections()

  function scrollToNextSection() {
    const nextSection = document.getElementById("next-section")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    } else {
      // If no specific section is found, just scroll down one viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative pt-16 min-h-screen bg-white overflow-hidden" ref={containerRef}>
      {/* Network background animation - Only show when loaded */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <svg className="w-full h-full">
          {/* Connections between nodes */}
          {isLoaded &&
            connections.map((connection) => (
              <line
                key={connection.id}
                x1={connection.x1}
                y1={connection.y1}
                x2={connection.x2}
                y2={connection.y2}
                stroke="#ff4136"
                strokeWidth="1"
                strokeOpacity={connection.opacity}
              />
            ))}

          {/* Nodes */}
          {isLoaded &&
            nodes.map((node) => (
              <circle key={node.id} cx={node.x} cy={node.y} r={node.size} fill="#ff4136" opacity={0.5} />
            ))}
        </svg>
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Subtle glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ff4136]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#ff4136]/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Cell Tower as background on mobile */}
      <div className="md:hidden absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none z-0">
        <svg
          viewBox="0 0 300 600"
          className="w-full h-full max-w-[250px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Tower Base */}
          <motion.path
            d="M120 550 H180 V540 H120 Z"
            fill="#555555"
            initial="hidden"
            animate="visible"
            variants={towerBaseVariants}
          />
          {/* Tower Main Structure - Outer Frame */}
          <motion.path
            d="M130 540 L170 540 L160 100 L140 100 Z"
            fill="none"
            stroke="#555555"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            variants={towerStructureVariants}
          />
          {/* Tower Cross Sections - Horizontal */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
            const y = 540 - i * 35
            const width = 40 - i * 2.5
            const x = 150 - width / 2
            return (
              <motion.path
                key={`horizontal-${i}`}
                d={`M${x} ${y} H${x + width}`}
                stroke="#555555"
                strokeWidth="2.5"
                initial="hidden"
                animate="visible"
                custom={i}
                variants={towerSectionVariants}
              />
            )
          })}
          {/* Tower Cross Bracing - X patterns */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            const y1 = 540 - i * 35
            const y2 = y1 - 35
            const width1 = 40 - i * 2.5
            const width2 = 40 - (i + 1) * 2.5
            const x1 = 150 - width1 / 2
            const x2 = 150 - width2 / 2
            return (
              <motion.path
                key={`cross-${i}`}
                d={`M${x1} ${y1} L${x2 + width2} ${y2} M${x1 + width1} ${y1} L${x2} ${y2}`}
                stroke="#555555"
                strokeWidth="2"
                initial="hidden"
                animate="visible"
                custom={i}
                variants={towerSectionVariants}
              />
            )
          })}
          {/* Antenna Dishes */}
          <motion.circle
            cx="135"
            cy="110"
            r="15"
            fill="none"
            stroke="#555555"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={antennaVariants}
          />
          <motion.circle
            cx="165"
            cy="120"
            r="15"
            fill="none"
            stroke="#555555"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={antennaVariants}
          />
          <motion.circle
            cx="140"
            cy="90"
            r="12"
            fill="none"
            stroke="#555555"
            strokeWidth="3"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={antennaVariants}
          />
          {/* Signal Waves - Reduced to just one per antenna */}
          <motion.circle
            key="signal-1"
            cx="135"
            cy="110"
            r="25"
            stroke="#ff4136"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            fill="none"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={signalVariants}
          />
          <motion.circle
            key="signal-2"
            cx="165"
            cy="120"
            r="25"
            stroke="#ff4136"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            fill="none"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={signalVariants}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 min-h-[calc(100vh-64px)] flex flex-col justify-center pt-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              className="mb-4"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <img 
                src="/assets/centrologo.png" 
                alt="Centro Logo" 
                width={400} 
                height={120} 
                className="mx-auto lg:mx-0"
                priority
              />
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-gray-700 mb-4 max-w-2xl mx-auto lg:mx-0"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Empowering businesses with reliable and scalable network infrastructure.
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-[#ff4136] mb-8 font-medium italic max-w-2xl mx-auto lg:mx-0"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              We ease the challenges and optimize the costs for ICT World
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button
                size="lg"
                className="bg-[#ff4136] hover:bg-[#ff4136]/90 text-white text-lg px-8 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-[#ff4136] border-[#ff4136] hover:bg-[#ff4136]/10 text-lg px-8 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Right content - Cell Tower Illustration - Hidden on mobile */}
          <div className="hidden md:flex order-1 lg:order-2 justify-center items-center h-[300px] md:h-[400px] lg:h-[600px]">
            {/* Cell Tower SVG based on the reference image */}
            <svg
              viewBox="0 0 300 600"
              className="w-full h-full max-w-[250px] md:max-w-[300px] lg:max-w-[400px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Tower Base */}
              <motion.path
                d="M120 550 H180 V540 H120 Z"
                fill="#555555"
                initial="hidden"
                animate="visible"
                variants={towerBaseVariants}
              />
              {/* Tower Main Structure - Outer Frame */}
              <motion.path
                d="M130 540 L170 540 L160 100 L140 100 Z"
                fill="none"
                stroke="#555555"
                strokeWidth="3"
                initial="hidden"
                animate="visible"
                variants={towerStructureVariants}
              />
              {/* Tower Cross Sections - Horizontal */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
                const y = 540 - i * 35
                const width = 40 - i * 2.5
                const x = 150 - width / 2
                return (
                  <motion.path
                    key={`horizontal-${i}`}
                    d={`M${x} ${y} H${x + width}`}
                    stroke="#555555"
                    strokeWidth="2.5"
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    variants={towerSectionVariants}
                  />
                )
              })}
              {/* Tower Cross Bracing - X patterns */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                const y1 = 540 - i * 35
                const y2 = y1 - 35
                const width1 = 40 - i * 2.5
                const width2 = 40 - (i + 1) * 2.5
                const x1 = 150 - width1 / 2
                const x2 = 150 - width2 / 2
                return (
                  <motion.path
                    key={`cross-${i}`}
                    d={`M${x1} ${y1} L${x2 + width2} ${y2} M${x1 + width1} ${y1} L${x2} ${y2}`}
                    stroke="#555555"
                    strokeWidth="2"
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    variants={towerSectionVariants}
                  />
                )
              })}
              {/* Antenna Dishes */}
              <motion.circle
                cx="135"
                cy="110"
                r="15"
                fill="none"
                stroke="#555555"
                strokeWidth="3"
                initial="hidden"
                animate="visible"
                custom={0}
                variants={antennaVariants}
              />
              <motion.circle
                cx="165"
                cy="120"
                r="15"
                fill="none"
                stroke="#555555"
                strokeWidth="3"
                initial="hidden"
                animate="visible"
                custom={1}
                variants={antennaVariants}
              />
              <motion.circle
                cx="140"
                cy="90"
                r="12"
                fill="none"
                stroke="#555555"
                strokeWidth="3"
                initial="hidden"
                animate="visible"
                custom={2}
                variants={antennaVariants}
              />
              {/* Signal Waves - Reduced to just one per antenna */}
              <motion.circle
                key="signal-1"
                cx="135"
                cy="110"
                r="25"
                stroke="#ff4136"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                fill="none"
                initial="hidden"
                animate="visible"
                custom={1}
                variants={signalVariants}
              />
              <motion.circle
                key="signal-2"
                cx="165"
                cy="120"
                r="25"
                stroke="#ff4136"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                fill="none"
                initial="hidden"
                animate="visible"
                custom={2}
                variants={signalVariants}
              />
              {/* Connected Devices - Adjusted for mobile */}
              {(isMobile ? mobileDevices : devices).map((device, i) => (
                <g key={`device-${i}`}>
                  {/* Connection Line */}
                  <motion.path
                    d={`M 150 110 L ${device.x} ${device.y}`}
                    stroke="#ff4136"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    variants={connectionVariants}
                    id={`path-${i}`}
                  />

                  {/* Data Packets */}
                  {[0, 1].map((packetIndex) => (
                    <motion.circle
                      key={`packet-${i}-${packetIndex}`}
                      r="3"
                      fill="#ff4136"
                      initial="hidden"
                      animate="visible"
                      custom={packetIndex}
                      variants={dataPacketVariants}
                    >
                      <motion.mpath href={`#path-${i}`} />
                    </motion.circle>
                  ))}

                  {/* Device Circle */}
                  <motion.circle
                    cx={device.x}
                    cy={device.y}
                    r="15"
                    fill="white"
                    stroke="#ff4136"
                    strokeWidth="1"
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    variants={deviceVariants}
                  />

                  {/* Device Icon */}
                  <motion.g initial="hidden" animate="visible" custom={i} variants={deviceVariants}>
                    {device.icon === "phone" && (
                      <path
                        d={`M ${device.x - 5} ${device.y - 7} v14 h10 v-14 h-10 M ${device.x} ${device.y + 4} v1`}
                        stroke="#ff4136"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    )}
                    {device.icon === "wifi" && (
                      <g>
                        <path
                          d={`M ${device.x - 7} ${device.y + 2} q7 -10 14 0`}
                          stroke="#ff4136"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <path
                          d={`M ${device.x - 4} ${device.y + 0} q4 -6 8 0`}
                          stroke="#ff4136"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <circle cx={device.x} cy={device.y + 4} r="1.5" fill="#ff4136" />
                      </g>
                    )}
                    {device.icon === "building" && (
                      <path
                        d={`M ${device.x - 6} ${device.y + 7} v-12 h12 v12 M ${device.x - 3} ${
                          device.y - 2
                        } v3 h2 v-3 M ${device.x + 1} ${device.y - 2} v3 h2 v-3 M ${device.x - 3} ${
                          device.y + 3
                        } v3 h2 v-3 M ${device.x + 1} ${device.y + 3} v3 h2 v-3`}
                        stroke="#ff4136"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    )}
                  </motion.g>

                  {/* Pulse Effect */}
                  <motion.circle
                    cx={device.x}
                    cy={device.y}
                    r="15"
                    stroke="#ff4136"
                    strokeWidth="1"
                    fill="none"
                    initial="hidden"
                    animate="visible"
                    variants={pulseVariants}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
        
        {/* Explore More Button - Simple downward arrow - Fixed positioning for better centering */}
        <motion.div 
          className="absolute bottom-8 left-0 right-0 mx-auto w-10 flex justify-center cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={scrollToNextSection}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <ChevronDown className="h-10 w-10 text-[#ff4136]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero
