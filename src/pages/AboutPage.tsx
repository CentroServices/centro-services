"use client"
import { motion } from "framer-motion"
import { Users, Target, Clock, Globe, CheckCircle } from "lucide-react"
import Breadcrumbs from '../components/Breadcrumbs';

const AboutPage = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const statsData = [
    { icon: Users, value: "200+", label: "Team Members" },
    { icon: Target, value: "500+", label: "Projects Completed" },
    { icon: Clock, value: "12+", label: "Years of Experience" },
    { icon: Globe, value: "20+", label: "Cities Served" },
  ]

  const values = ["Innovation Excellence", "Customer Focus", "Reliability", "Integrity"]

  const vision = ["Market Leadership", "Technological Innovation", "National Coverage", "Sustainable Growth"]

  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: "About Us" }]} />
          </div>

          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Centro Service</h1>
            <p className="text-xl text-gray-600">
              Leading the future of telecommunications in Turkey with innovative solutions and unparalleled service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                CENTRO is a global provider of Telecommunications and IT engineering services for project delivery,
                management of network operations, business support solutions, and industry-specific consultancy services
                with its globally located teams. We are passionate about helping our clients achieve their goals with
                the highest quality and cost efficiency.
              </p>
              <p className="text-lg text-gray-700">
                Our team is comprised of skilled professionals who bring a wealth of experience and expertise to the
                table. We are committed to providing exceptional services to our clients by working closely with them to
                understand their unique challenges and develop tailored solutions that address their specific needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#ff4136]/10 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.div
                className="absolute -top-6 -left-6 w-24 h-24 bg-[#ff4136]/5 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl relative">
                <img
                  src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Centro Service Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section with Enhanced Design */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 hover:border-[#ff4136]/20"
              >
                <div className="w-14 h-14 bg-[#ff4136]/10 rounded-full flex items-center justify-center text-[#ff4136] mb-5">
                  <stat.icon size={28} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Section with Enhanced Design */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1 bg-[#ff4136]/10 text-[#ff4136] rounded-full text-sm font-medium mb-4">
                OUR PURPOSE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                To empower businesses across Turkey with cutting-edge telecommunication solutions that drive growth,
                enhance connectivity, and enable digital transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#ff4136]/20"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-[#ff4136]/10 rounded-full flex items-center justify-center text-[#ff4136] mr-3">
                    <CheckCircle size={16} />
                  </span>
                  Our Values
                </h3>
                <ul className="space-y-4">
                  {values.map((value, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#ff4136] rounded-full mr-3"></span>
                      <span className="text-lg">{value}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#ff4136]/20"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-[#ff4136]/10 rounded-full flex items-center justify-center text-[#ff4136] mr-3">
                    <CheckCircle size={16} />
                  </span>
                  Our Vision
                </h3>
                <ul className="space-y-4">
                  {vision.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-[#ff4136] rounded-full mr-3"></span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
