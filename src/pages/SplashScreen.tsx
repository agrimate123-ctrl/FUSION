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
        {/* Advanced Dynamic gradient mesh */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(147, 51, 234, 0.2) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 50% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 40%)",
              "radial-gradient(ellipse 60% 80% at 40% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 90% 60%, rgba(59, 130, 246, 0.2) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 40%)",
              "radial-gradient(ellipse 80% 50% at 60% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 30% 30%, rgba(147, 51, 234, 0.2) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 40%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        />

        {/* Advanced morphing background overlay */}
        <motion.div
          animate={{
            background: [
              "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(59, 130, 246, 0.03) 60deg, transparent 120deg, rgba(147, 51, 234, 0.03) 180deg, transparent 240deg, rgba(6, 182, 212, 0.03) 300deg, transparent 360deg)",
              "conic-gradient(from 120deg at 50% 50%, transparent 0deg, rgba(147, 51, 234, 0.03) 60deg, transparent 120deg, rgba(6, 182, 212, 0.03) 180deg, transparent 240deg, rgba(59, 130, 246, 0.03) 300deg, transparent 360deg)",
              "conic-gradient(from 240deg at 50% 50%, transparent 0deg, rgba(6, 182, 212, 0.03) 60deg, transparent 120deg, rgba(59, 130, 246, 0.03) 180deg, transparent 240deg, rgba(147, 51, 234, 0.03) 300deg, transparent 360deg)",
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />
        
        {/* Advanced floating holographic elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 8}%`,
              top: `${5 + i * 8}%`,
            }}
            animate={{
              y: [0, -60, 20, 0],
              x: [0, 30, -15, 0],
              rotate: [0, 180, 270, 360],
              opacity: [0.02, 0.15, 0.08, 0.02],
              scale: [0.6, 1.4, 0.9, 0.6],
              rotateX: [0, 45, -45, 0],
              rotateY: [0, 90, -90, 0],
            }}
            transition={{
              duration: 12 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <motion.div
              animate={{
                borderColor: [
                  "rgba(59, 130, 246, 0.2)",
                  "rgba(147, 51, 234, 0.2)",
                  "rgba(6, 182, 212, 0.2)",
                  "rgba(59, 130, 246, 0.2)",
                ],
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(147, 51, 234, 0.3)",
                  "0 0 15px rgba(6, 182, 212, 0.2)",
                  "0 0 0px rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className="w-16 h-16 border-2 bg-gradient-to-br from-blue-500/5 via-purple-500/8 to-cyan-500/5 backdrop-blur-sm"
              style={{
                clipPath: i % 4 === 0 
                  ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                  : i % 4 === 1 
                  ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
                  : i % 4 === 2
                  ? 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                  : 'polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)',
              }}
            />
          </motion.div>
        ))}

        {/* Floating data streams */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: '100%',
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              opacity: [0, 0.6, 0.8, 0.4, 0],
              scale: [0.5, 1, 1.2, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.5,
            }}
          >
            <div className="flex flex-col space-y-2">
              {[...Array(5)].map((_, j) => (
                <motion.div
                  key={j}
                  animate={{
                    width: [2, 8, 4, 2],
                    opacity: [0.3, 1, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: j * 0.2,
                    ease: "easeInOut",
                  }}
                  className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full"
                />
              ))}
            </div>
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
        {/* Advanced multi-layered energy field */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1.1, 1],
            opacity: [0.1, 0.6, 0.3, 0.1],
            rotate: [0, 120, 240, 360],
            filter: [
              "blur(20px) hue-rotate(0deg)",
              "blur(25px) hue-rotate(90deg)",
              "blur(22px) hue-rotate(180deg)",
              "blur(20px) hue-rotate(360deg)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-20 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/25 via-cyan-500/20 to-blue-500/20"
        />

        {/* Secondary pulsing energy ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.3, 0.8, 0.5, 0.3],
            rotate: [0, -180, -360],
            background: [
              "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(6, 182, 212, 0.3) 100%)",
              "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(6, 182, 212, 0.3) 50%, rgba(59, 130, 246, 0.3) 100%)",
              "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(147, 51, 234, 0.3) 100%)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-12 rounded-full blur-xl"
        />

        {/* Tertiary oscillating field */}
        <motion.div
          animate={{
            scale: [0.8, 1.15, 0.95, 0.8],
            opacity: [0.2, 0.6, 0.4, 0.2],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-8 rounded-full bg-gradient-conic from-blue-400/20 via-purple-400/30 via-cyan-400/20 to-blue-400/20 blur-lg"
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

      {/* Advanced Quantum Loading System */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2, duration: 1, type: "spring", stiffness: 100 }}
        className="relative"
      >
        {/* Enhanced loading matrix with morphing effects */}
        <div className="flex space-x-4 mb-8 relative">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0.6, 1.6, 1, 0.6],
                opacity: [0.3, 1, 0.7, 0.3],
                rotate: [0, 180, 360],
                boxShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.2)',
                  '0 0 40px rgba(147, 51, 234, 1)',
                  '0 0 25px rgba(6, 182, 212, 0.6)',
                  '0 0 10px rgba(59, 130, 246, 0.2)',
                ],
                background: [
                  "radial-gradient(circle, rgba(59, 130, 246, 1) 0%, rgba(59, 130, 246, 0.8) 100%)",
                  "radial-gradient(circle, rgba(147, 51, 234, 1) 0%, rgba(147, 51, 234, 0.8) 100%)",
                  "radial-gradient(circle, rgba(6, 182, 212, 1) 0%, rgba(6, 182, 212, 0.8) 100%)",
                  "radial-gradient(circle, rgba(59, 130, 246, 1) 0%, rgba(59, 130, 246, 0.8) 100%)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-5 h-5 rounded-full relative"
            >
              {/* Inner pulsing core */}
              <motion.div
                animate={{
                  scale: [0.4, 0.8, 0.4],
                  opacity: [1, 0.6, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
                className="absolute inset-1 bg-white rounded-full"
              />
            </motion.div>
          ))}
          
          {/* Connecting energy lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute top-1/2 h-0.5 bg-gradient-to-r from-blue-400/0 via-purple-400/60 to-blue-400/0"
              style={{
                left: `${(i + 1) * 14.28}%`,
                width: '14.28%',
                transform: 'translateY(-50%)',
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Advanced system status with dynamic text */}
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-center"
        >
          <motion.p
            animate={{
              color: [
                "rgb(147 197 253)",
                "rgb(196 181 253)", 
                "rgb(103 232 249)",
                "rgb(147 197 253)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-sm tracking-[0.4em] font-light mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            QUANTUM NEURAL INITIALIZATION
          </motion.p>
          
          {/* Enhanced visualization bars */}
          <div className="flex justify-center space-x-1 mb-3">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [3, 12, 6, 3],
                  opacity: [0.4, 1, 0.7, 0.4],
                  backgroundColor: [
                    "rgb(59 130 246)",
                    "rgb(147 51 234)",
                    "rgb(6 182 212)",
                    "rgb(59 130 246)",
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.03,
                  ease: "easeInOut",
                }}
                className="w-1 rounded-full"
              />
            ))}
          </div>

          {/* Progress indicator */}
          <motion.div
            className="w-48 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <motion.div
              animate={{
                x: ["-100%", "100%"],
                background: [
                  "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)",
                  "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.8), transparent)",
                  "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)",
                ],
              }}
              transition={{
                x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                background: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="w-full h-full"
            />
          </motion.div>
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
