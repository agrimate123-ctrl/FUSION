import { motion } from 'framer-motion';
import EnhancedHomeOrb from '../components/EnhancedHomeOrb';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-blue-900 z-50 overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Enhanced Orb for SplashScreen */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, rotateY: 180 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotateY: 0,
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut"
        }}
        className="relative mb-8"
      >
        <EnhancedHomeOrb 
          isActive={true} 
          image="/logo1.png"
          title="Graphify"
          subtitle="Initializing System..."
        />
      </motion.div>

      {/* App name with futuristic styling */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-7xl font-bold tracking-wider mb-4 relative"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Graphify
        </span>
        <motion.div
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 text-7xl font-bold tracking-wider"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <span className="text-white opacity-10">
            Graphify
          </span>
        </motion.div>
      </motion.h1>

      {/* Tagline with typewriter effect */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-xl text-gray-300 tracking-wide mb-8 text-center max-w-md"
      >
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.5, duration: 2 }}
          className="inline-block overflow-hidden whitespace-nowrap"
        >
          Visualize Data, Discover Insights
        </motion.span>
      </motion.p>

      {/* Enhanced loading animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex space-x-3"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(147, 51, 234, 0.8)',
                'rgba(6, 182, 212, 0.8)',
                'rgba(59, 130, 246, 0.8)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-3 h-3 rounded-full"
          />
        ))}
      </motion.div>

      {/* Scanning line effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      />
    </motion.div>
  );
}
