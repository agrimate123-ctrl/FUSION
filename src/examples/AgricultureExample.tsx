import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AnimatedLayout from '../components/AnimatedLayout';
import Orb from '../components/Orb';

interface AgricultureExampleProps {
  onBack: () => void;
}

export default function AgricultureExample({ onBack }: AgricultureExampleProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (prompt: string) => {
    console.log('Submitted prompt:', prompt);
    // Here you would typically send the prompt to your AI service
    // and update your graph data accordingly
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Domains</span>
      </motion.button>

      {/* AI Orb (optional - you can keep your existing orb) */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed top-20 right-8 z-40"
      >
        <div className="scale-50 origin-center">
          <Orb isActive={isAnalyzing} color="green" image="/agriculture-orb.png" />
        </div>
      </motion.div>

      {/* Main Animated Layout */}
      <AnimatedLayout onSubmit={handleSubmit} />
    </motion.div>
  );
}