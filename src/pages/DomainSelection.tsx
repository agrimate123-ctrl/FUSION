import { motion } from 'framer-motion';
import { Wheat, Heart, GraduationCap, DollarSign, Car, Globe, Cpu, Shield, MessageCircle, Lightbulb } from 'lucide-react';

interface DomainSelectionProps {
  onSelectDomain: (domain: string) => void;
}

const mainDomains = [
  { id: 'agriculture', name: 'Agriculture', icon: Wheat, color: 'from-green-400 to-emerald-600' },
  { id: 'health', name: 'Health', icon: Heart, color: 'from-red-400 to-pink-600' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: 'from-yellow-400 to-orange-600' },
  { id: 'finance', name: 'Finance', icon: DollarSign, color: 'from-blue-400 to-cyan-600' },
  { id: 'transport', name: 'Transport', icon: Car, color: 'from-purple-400 to-violet-600' },
  { id: 'universal', name: 'Universal AI', icon: Globe, color: 'from-indigo-400 to-blue-600' },
];

const techRealms = [
  { id: 'robotics', name: 'Robotics', icon: Cpu },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: Shield },
  { id: 'social', name: 'Social Media', icon: MessageCircle },
  { id: 'lab', name: 'Tech Lab', icon: Lightbulb },
];

export default function DomainSelection({ onSelectDomain }: DomainSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
            Choose Your World
          </span>
        </h1>
        <p className="text-gray-400 text-xl">Select a domain to begin your AI journey</p>
      </motion.div>

      <div className="max-w-7xl w-full relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {mainDomains.map((domain, index) => (
            <motion.button
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectDomain(domain.id)}
              className="relative group"
              disabled={!['agriculture', 'health'].includes(domain.id)}
            >
              <div className={`
                relative overflow-hidden rounded-2xl p-8
                bg-gradient-to-br ${domain.color}
                ${!['agriculture', 'health'].includes(domain.id) ? 'opacity-50 cursor-not-allowed' : ''}
                transition-all duration-300
              `}>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0)',
                      '0 0 40px rgba(147, 51, 234, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0)',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-2xl"
                />

                <domain.icon className="w-16 h-16 mb-4 mx-auto text-white" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-white mb-2">{domain.name}</h3>
                {!['agriculture', 'health'].includes(domain.id) && (
                  <span className="text-xs text-white/70">Coming Soon</span>
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Tech Realms</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techRealms.map((realm, index) => (
              <motion.button
                key={realm.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + 0.1 * index, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                disabled
                className="relative group cursor-not-allowed"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 opacity-50">
                  <realm.icon className="w-10 h-10 mx-auto mb-3 text-blue-400" strokeWidth={1.5} />
                  <p className="text-sm font-semibold text-gray-300">{realm.name}</p>
                  <span className="text-xs text-gray-500 mt-1 block">Coming Soon</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
