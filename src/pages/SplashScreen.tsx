import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 overflow-hidden"
    >
      {/* Ultra Futuristic Background */}
      <div className="absolute inset-0">
        {/* Dynamic gradient mesh */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse 60% 80% at 40% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%), radial-gradient(ellipse 80% 50% at 90% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse 80% 50% at 60% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 30% 30%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        />
        
        {/* Floating holographic elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 12}%`,
              top: `${8 + i * 10}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 25, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.2, 0.05],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 10 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          >
            <div
              className="w-20 h-20 border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-600/10 backdrop-blur-sm"
              style={{
                clipPath: i % 3 === 0 
                  ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                  : i % 3 === 1 
                  ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
                  : 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              }}
            />
          </motion.div>
        ))}

        {/* Neural network grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Animated particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Ultra Futuristic Logo Orb */}
      <motion.div
        initial={{ scale: 0, y: 100, rotateX: 90 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 1.5,
          type: "spring",
          stiffness: 80,
          damping: 12,
        }}
        className="relative mb-10"
      >
        {/* Outer energy field */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-16 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-2xl"
        />

        {/* Secondary energy ring */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-10 rounded-full bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-blue-400/30 blur-xl"
        />

        {/* Main holographic container */}
        <motion.div
          animate={{
            rotate: 360,
            boxShadow: [
              "0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(147, 51, 234, 0.1)",
              "0 0 60px rgba(147, 51, 234, 0.4), inset 0 0 60px rgba(59, 130, 246, 0.2)",
              "0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(147, 51, 234, 0.1)",
            ],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative w-56 h-56 rounded-full border-2 border-blue-400/40 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 backdrop-blur-lg flex items-center justify-center"
        >
          {/* Inner rotating holographic rings */}
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-6 rounded-full border-2 border-dashed border-purple-400/50"
          />
          
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-10 rounded-full border border-dotted border-blue-400/40"
          />

          {/* Logo with enhanced effects */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{
              delay: 0.3,
              duration: 1,
              type: "spring",
              stiffness: 150,
            }}
            className="relative z-10"
          >
            <motion.img
              src="/logo1.png"
              alt="Graphify Logo"
              animate={{
                filter: [
                  "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
                  "drop-shadow(0 0 30px rgba(147, 51, 234, 0.7))",
                  "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-28 h-28 object-contain"
            />
          </motion.div>

          {/* Orbiting energy nodes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10 - i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3,
              }}
              className="absolute inset-0"
            >
              <motion.div
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"
                style={{
                  top: `${15 + i * 5}px`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
            </motion.div>
          ))}

          {/* Scanning beam effect */}
          <motion.div
            animate={{
              rotate: [0, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.3) 60deg, transparent 120deg)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Futuristic App Title */}
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2, type: "spring", stiffness: 100 }}
        className="text-center mb-8 relative"
      >
        {/* Holographic title background */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-2xl rounded-lg"
        />

        <motion.h1
          className="relative text-7xl font-bold mb-4 tracking-wider"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              textShadow: [
                "0 0 30px rgba(59, 130, 246, 0.5)",
                "0 0 50px rgba(147, 51, 234, 0.7)",
                "0 0 30px rgba(59, 130, 246, 0.5)",
              ],
            }}
            transition={{
              backgroundPosition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent bg-[length:200%_100%]"
          >
            Graphify
          </motion.span>
          
          {/* Scanning line effect */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-12 blur-sm overflow-hidden"
          />
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-blue-300 text-xl tracking-widest font-light"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <motion.span
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            MULTIMODAL INTELLIGENCE PLATFORM
          </motion.span>
        </motion.p>
      </motion.div>

      {/* Quantum Loading System */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="relative"
      >
        {/* Main loading matrix */}
        <div className="flex space-x-3 mb-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0.8, 1.4, 0.8],
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  '0 0 15px rgba(59, 130, 246, 0.3)',
                  '0 0 30px rgba(147, 51, 234, 0.8)',
                  '0 0 15px rgba(59, 130, 246, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400"
            />
          ))}
        </div>

        {/* System status */}
        <motion.div
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-center"
        >
          <p className="text-blue-300 text-sm tracking-[0.3em] font-light mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            INITIALIZING NEURAL NETWORKS
          </p>
          <div className="flex justify-center space-x-1">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [2, 8, 2],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }}
                className="w-0.5 bg-gradient-to-t from-blue-500 to-purple-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Futuristic bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
      >
        <motion.div
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)",
              "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), transparent)",
              "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
}
