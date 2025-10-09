import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, CloudRain, Sprout, Droplets, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import Orb from '../components/Orb';
import InputPanel from '../components/InputPanel';
import GraphView from '../components/GraphView';

interface AgricultureProps {
  onBack: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: any;
  content: string;
  expanded: boolean;
}

export default function Agriculture({ onBack }: AgricultureProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'weather',
      title: 'Weather & Climate',
      icon: CloudRain,
      content: 'Current conditions optimal for growth. Expected rainfall in 48 hours may benefit soil moisture levels.',
      expanded: false,
    },
    {
      id: 'crop',
      title: 'Crop Growth & Yield',
      icon: Sprout,
      content: 'Crop development is progressing at expected rate. Projected yield: 15% above seasonal average based on current conditions.',
      expanded: false,
    },
    {
      id: 'water',
      title: 'Water & Irrigation',
      icon: Droplets,
      content: 'Soil moisture at 65%. Irrigation recommended in 3 days if no rainfall occurs. Optimize water usage by scheduling morning irrigation.',
      expanded: false,
    },
    {
      id: 'soil',
      title: 'Soil Health',
      icon: TrendingUp,
      content: 'Nitrogen levels adequate. pH balance optimal at 6.5. Consider adding organic matter to enhance microbial activity.',
      expanded: false,
    },
    {
      id: 'disease',
      title: 'Disease Management',
      icon: AlertTriangle,
      content: 'Low risk detected. Monitor for early blight symptoms. Preventive fungicide application recommended in humid conditions.',
      expanded: false,
    },
    {
      id: 'market',
      title: 'Market & Economics',
      icon: DollarSign,
      content: 'Current market prices trending upward. Optimal harvest window in 14-21 days for maximum profit potential.',
      expanded: false,
    },
  ]);

  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: [],
  });

  const toggleSection = (id: string) => {
    setSections(sections.map(s =>
      s.id === id ? { ...s, expanded: !s.expanded } : s
    ));
  };

  const handleSubmit = async (_data: any) => {
    setIsAnalyzing(true);
    setShowResults(false);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const sampleNodes = [
      { id: 'weather', label: 'Weather', group: 0 },
      { id: 'soil', label: 'Soil Quality', group: 1 },
      { id: 'water', label: 'Water', group: 2 },
      { id: 'crop', label: 'Crop Health', group: 3 },
      { id: 'yield', label: 'Yield', group: 4 },
      { id: 'disease', label: 'Disease Risk', group: 5 },
    ];

    const sampleLinks = [
      { source: 'weather', target: 'soil', value: 3 },
      { source: 'weather', target: 'water', value: 2 },
      { source: 'soil', target: 'crop', value: 4 },
      { source: 'water', target: 'crop', value: 4 },
      { source: 'crop', target: 'yield', value: 5 },
      { source: 'weather', target: 'disease', value: 2 },
      { source: 'disease', target: 'crop', value: 3 },
    ];

    setGraphData({ nodes: sampleNodes, links: sampleLinks });
    setIsAnalyzing(false);
    setShowResults(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-8"
    >
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Domains</span>
      </motion.button>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Agriculture Intelligence
          </h1>
          <p className="text-gray-400 text-lg">Multimodal AI for precision farming</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Orb isActive={isAnalyzing} color="green" />
        </motion.div>

        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-blue-500/20 border border-blue-500/50 rounded-full px-6 py-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"
              />
              <span className="text-blue-400 font-semibold">Analyzing with GraphoraX Intelligence...</span>
            </div>
          </motion.div>
        )}

        <InputPanel onSubmit={handleSubmit} isLoading={isAnalyzing} />

        {showResults && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 mb-8"
            >
              <GraphView nodes={graphData.nodes} links={graphData.links} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-white">{section.title}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: section.expanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: section.expanded ? 'auto' : 0,
                      opacity: section.expanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-300 leading-relaxed">
                      {section.content}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
