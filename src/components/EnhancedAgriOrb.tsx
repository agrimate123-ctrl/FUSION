import { motion } from 'framer-motion';
import { Sprout, Droplets, Sun, Zap, Leaf, TreePine } from 'lucide-react';

interface EnhancedAgriOrbProps {
  isActive?: boolean;
  image?: string;
}

export default function EnhancedAgriOrb({ isActive = false, image }: EnhancedAgriOrbProps) {
  const agriculturalIcons = [Sprout, Droplets, Sun, Leaf, TreePine, Zap];

  return (
    <div className="relative flex items-center justify-center w-80 h-80 mx-auto">
      {/* Quantum Field Effect */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.3), rgba(34, 197, 94, 0.3))',
          filter: 'blur(20px)',
        }}
      />

      {/* Outer Glow Ring */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-green-300 via-emerald-400 to-cyan-300 blur-3xl opacity-50"
      />

      {/* Rotating Particle Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-8"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translateY(-120px) translateX(-50%)`,
              transformOrigin: '50% 120px',
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Hexagonal Energy Grid */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-12"
      >
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {[...Array(3)].map((_, ring) => (
            <g key={ring}>
              {[...Array(6)].map((_, i) => (
                <motion.polygon
                  key={i}
                  points={`${100 + (40 + ring * 20) * Math.cos((i * 60 - 30) * Math.PI / 180)},${100 + (40 + ring * 20) * Math.sin((i * 60 - 30) * Math.PI / 180)} ${100 + (30 + ring * 15) * Math.cos((i * 60) * Math.PI / 180)},${100 + (30 + ring * 15) * Math.sin((i * 60) * Math.PI / 180)} ${100 + (40 + ring * 20) * Math.cos((i * 60 + 30) * Math.PI / 180)},${100 + (40 + ring * 20) * Math.sin((i * 60 + 30) * Math.PI / 180)}`}
                  fill="rgba(34, 197, 94, 0.2)"
                  stroke="rgba(34, 197, 94, 0.6)"
                  strokeWidth="1"
                  animate={{
                    fill: [
                      "rgba(34, 197, 94, 0.1)",
                      "rgba(34, 197, 94, 0.4)",
                      "rgba(34, 197, 94, 0.1)"
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: (ring * 6 + i) * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Floating Agricultural Icons */}
      <motion.div className="absolute inset-16">
        {agriculturalIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 60}deg) translateY(-80px) translateX(-50%)`,
              transformOrigin: '50% 80px',
            }}
            animate={{
              rotate: [0, 360],
              y: [-5, 5, -5],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              y: { duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div
              animate={{
                scale: isActive ? [1, 1.3, 1] : [1, 1.1, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 rounded-lg shadow-lg backdrop-blur-sm border border-green-300/30"
            >
              <Icon className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Orb Core */}
      <motion.div
        animate={{
          boxShadow: [
            `0 0 60px rgba(34, 197, 94, 0.8)`,
            `0 0 120px rgba(34, 197, 94, 1)`,
            `0 0 60px rgba(34, 197, 94, 0.8)`,
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-20"
      >
        <motion.div
          animate={{
            scale: isActive ? [1, 1.05, 1] : [1, 1.02, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: {
              duration: isActive ? 2 : 4,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="w-56 h-56 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 relative overflow-hidden shadow-2xl"
        >
          {/* Inner Energy Rings */}
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-4"
          >
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 22.5}deg) translateX(-50%)`,
                  transformOrigin: 'left center',
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>

          {/* DNA Helix Pattern */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-8"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <motion.path
                d="M20,50 Q30,20 40,50 Q50,80 60,50 Q70,20 80,50"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                fill="none"
                animate={{
                  pathLength: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.path
                d="M20,50 Q30,80 40,50 Q50,20 60,50 Q70,80 80,50"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                fill="none"
                animate={{
                  pathLength: [1, 0, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </motion.div>

          {/* Central Image Container with Enhanced Effects */}
          <motion.div
            animate={{
              scale: [0.9, 1.1, 0.9],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-12 rounded-full bg-gradient-to-br from-white/20 to-green-100/30 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center overflow-hidden shadow-inner"
          >
            {image && (
              <motion.img
                src={image}
                alt="Agricultural Intelligence"
                initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  rotate: 0,
                  filter: [
                    'brightness(1) contrast(1) saturate(1)',
                    'brightness(1.2) contrast(1.1) saturate(1.2)',
                    'brightness(1) contrast(1) saturate(1)'
                  ]
                }}
                transition={{ 
                  scale: { duration: 1 },
                  opacity: { duration: 1 },
                  rotate: { duration: 1.5 },
                  filter: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-full h-full object-cover rounded-full"
              />
            )}
            
            {/* Holographic Overlay */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  'linear-gradient(225deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full"
            />
          </motion.div>

          {/* Pulsing Energy Waves when Active */}
          {isActive && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: [0.5, 2.5, 3],
                    opacity: [0.8, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 rounded-full border-2 border-green-300/60"
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Data Stream Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-8 bg-gradient-to-b from-green-400 to-transparent"
            style={{
              top: '10%',
              left: `${20 + i * 12}%`,
            }}
            animate={{
              y: [0, 300],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Environmental Sensors Indicators */}
      <div className="absolute inset-0">
        {[
          { name: 'Temperature', value: '24°C', color: 'from-orange-400 to-red-400' },
          { name: 'Humidity', value: '68%', color: 'from-blue-400 to-cyan-400' },
          { name: 'pH Level', value: '6.5', color: 'from-purple-400 to-pink-400' },
          { name: 'Nutrients', value: 'Optimal', color: 'from-green-400 to-emerald-400' }
        ].map((sensor, i) => (
          <motion.div
            key={sensor.name}
            className="absolute"
            style={{
              top: `${25 + i * 12}%`,
              right: i % 2 === 0 ? '5px' : 'auto',
              left: i % 2 === 1 ? '5px' : 'auto',
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.9, 1.05, 0.9],
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          >
            <div className="bg-gray-900/90 backdrop-blur-md border border-green-400/60 rounded-xl px-3 py-2 shadow-lg">
              <span className="text-xs text-green-300 font-mono block">{sensor.name}</span>
              <span className={`text-sm font-bold bg-gradient-to-r ${sensor.color} bg-clip-text text-transparent`}>
                {sensor.value}
              </span>
              <div className="w-12 h-1 bg-green-400/20 rounded mt-1">
                <motion.div
                  className={`h-full bg-gradient-to-r ${sensor.color} rounded shadow-sm`}
                  animate={{
                    width: ['30%', '85%', '30%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Growth Progress Indicators */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-gradient-to-r from-green-900/90 to-emerald-900/90 backdrop-blur-md border border-green-400/50 rounded-2xl px-4 py-2 shadow-xl"
        >
          <div className="text-center">
            <span className="text-xs text-green-300 font-mono">Growth Status</span>
            <div className="flex items-center gap-2 mt-1">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sprout className="w-4 h-4 text-green-400" />
              </motion.div>
              <span className="text-sm font-bold text-green-400">87% Optimal</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Processing Status */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{
            opacity: isActive ? [0.8, 1, 0.8] : [0.5, 0.7, 0.5],
            scale: isActive ? [0.98, 1.02, 0.98] : [1, 1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-md border border-blue-400/50 rounded-2xl px-4 py-2 shadow-xl"
        >
          <div className="text-center">
            <span className="text-xs text-blue-300 font-mono">
              {isActive ? 'AI Processing...' : 'AI Ready'}
            </span>
            <div className="flex items-center gap-2 mt-1 justify-center">
              <motion.div
                animate={isActive ? { 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-4 h-4 text-blue-400" />
              </motion.div>
              <span className={`text-sm font-bold ${isActive ? 'text-blue-400' : 'text-blue-500'}`}>
                {isActive ? 'Active' : 'Standby'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}