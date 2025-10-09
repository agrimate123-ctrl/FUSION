import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
        className="relative"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 40px rgba(59, 130, 246, 0.5)',
              '0 0 80px rgba(147, 51, 234, 0.8)',
              '0 0 40px rgba(59, 130, 246, 0.5)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-blue-500 p-8 rounded-full">
            <Zap className="w-24 h-24 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl -z-10"
        />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 text-6xl font-bold tracking-wider"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
          GraphoraX
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-4 text-xl text-gray-400 tracking-wide"
      >
        AI That Understands Why.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 flex space-x-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-3 h-3 bg-blue-500 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
