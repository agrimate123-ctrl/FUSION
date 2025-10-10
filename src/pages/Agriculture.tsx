import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, CloudRain, Sprout, Droplets, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import EnhancedAgriOrb from '../components/EnhancedAgriOrb';
import InputPanel from '../components/InputPanel';
import GraphView from '../components/GraphView';
import WeatherClimate from './agriculture/WeatherClimate';
import CropGrowthYield from './agriculture/CropGrowthYield';
import WaterIrrigation from './agriculture/WaterIrrigation';
import SoilHealth from './agriculture/SoilHealth';
import DiseaseManagement from './agriculture/DiseaseManagement';
import MarketEconomics from './agriculture/MarketEconomics';
import { localAI } from '../services/localAI';

interface AgricultureProps {
  onBack: () => void;
}



type CurrentView = 'main' | 'weather' | 'crop' | 'water' | 'soil' | 'disease' | 'market';

export default function Agriculture({ onBack }: AgricultureProps) {
  const [currentView, setCurrentView] = useState<CurrentView>('main');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const sections = [
    {
      id: 'weather',
      title: 'Weather & Climate',
      icon: CloudRain,
      content: 'Real-time weather monitoring and climate analysis for optimal farming decisions.',
    },
    {
      id: 'crop',
      title: 'Crop Growth & Yield',
      icon: Sprout,
      content: 'Track crop development stages and predict yield with advanced AI analytics.',
    },
    {
      id: 'water',
      title: 'Water & Irrigation',
      icon: Droplets,
      content: 'Smart water management and precision irrigation control systems.',
    },
    {
      id: 'soil',
      title: 'Soil Health',
      icon: TrendingUp,
      content: 'Comprehensive soil analysis and fertility management solutions.',
    },
    {
      id: 'disease',
      title: 'Disease Management',
      icon: AlertTriangle,
      content: 'Advanced crop protection and integrated pest management strategies.',
    },
    {
      id: 'market',
      title: 'Market & Economics',
      icon: DollarSign,
      content: 'Financial analysis and market intelligence for agricultural operations.',
    },
  ];

  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: [],
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisSteps] = useState([
    "Initializing agricultural data analysis...",
    "Identifying primary factors affecting crop yield...",
    "Analyzing soil composition and pH levels...",
    "Evaluating climate and weather patterns...",
    "Assessing irrigation and water management...",
    "Examining pest and disease correlations...",
    "Connecting market demand influences...",
    "Building causal relationship network...",
    "Finalizing comprehensive analysis model..."
  ]);

  const toggleSection = (id: string) => {
    setCurrentView(id as CurrentView);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  const handleSubmit = async (data: any) => {
    setIsAnalyzing(true);
    setShowResults(true); // Show graph container immediately
    setCurrentStep(0);

    console.log('🌾 Agriculture analysis started:', data);

    // Check if we have AI response from InputPanel
    if (data.aiResponse && data.aiResponse.success) {
      console.log('✅ Using AI-generated analysis');
      
      // Generate graph data from AI response
      const aiGraphData = localAI.generateGraphData(data.aiResponse);
      setGraphData(aiGraphData);
      
      // Simulate progressive loading for better UX
      const steps = [
        "Analyzing soil conditions...",
        "Processing weather data...",
        "Evaluating crop health indicators...",
        "Assessing irrigation needs...",
        "Calculating yield predictions...",
        "Generating recommendations..."
      ];

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setIsAnalyzing(false);

      // Play TTS audio if available
      if (data.aiResponse.analysis.audio) {
        console.log('🔊 Playing TTS audio for agriculture analysis...');
        try {
          await localAI.playResponseAudio(
            data.aiResponse,
            () => {
              console.log('🎙️ Agriculture orb started speaking');
              setIsSpeaking(true);
            },
            () => {
              console.log('🤐 Agriculture orb finished speaking');
              setIsSpeaking(false);
              setAudioLevel(0);
            },
            (level: number) => {
              setAudioLevel(level);
            }
          );
        } catch (error) {
          console.warn('Failed to play TTS audio:', error);
          setIsSpeaking(false);
          setAudioLevel(0);
        }
      }

      return;
    }

    // Fallback to demo data if no AI response
    console.log('⚠️ Using fallback demo data');
    const allNodes = [
      { id: 'weather', label: 'Weather', group: 0 },
      { id: 'soil', label: 'Soil Quality', group: 1 },
      { id: 'water', label: 'Water', group: 2 },
      { id: 'crop', label: 'Crop Health', group: 3 },
      { id: 'yield', label: 'Yield', group: 4 },
      { id: 'disease', label: 'Disease Risk', group: 5 },
      { id: 'market', label: 'Market Price', group: 6 },
      { id: 'nutrients', label: 'Nutrients', group: 7 },
      { id: 'pests', label: 'Pest Control', group: 8 },
    ];

    const allLinks = [
      { source: 'weather', target: 'soil', value: 3 },
      { source: 'weather', target: 'water', value: 2 },
      { source: 'soil', target: 'crop', value: 4 },
      { source: 'water', target: 'crop', value: 4 },
      { source: 'crop', target: 'yield', value: 5 },
      { source: 'weather', target: 'disease', value: 2 },
      { source: 'disease', target: 'crop', value: 3 },
      { source: 'nutrients', target: 'soil', value: 4 },
      { source: 'nutrients', target: 'crop', value: 3 },
      { source: 'pests', target: 'crop', value: 2 },
      { source: 'yield', target: 'market', value: 4 },
      { source: 'weather', target: 'pests', value: 2 },
    ];

    // Set final data immediately for progressive rendering
    setGraphData({ nodes: allNodes, links: allLinks });

    // Step through analysis phases
    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsAnalyzing(false);
  };

  // Render dedicated pages based on current view
  if (currentView === 'weather') {
    return <WeatherClimate onBack={handleBackToMain} />;
  }
  if (currentView === 'crop') {
    return <CropGrowthYield onBack={handleBackToMain} />;
  }
  if (currentView === 'water') {
    return <WaterIrrigation onBack={handleBackToMain} />;
  }
  if (currentView === 'soil') {
    return <SoilHealth onBack={handleBackToMain} />;
  }
  if (currentView === 'disease') {
    return <DiseaseManagement onBack={handleBackToMain} />;
  }
  if (currentView === 'market') {
    return <MarketEconomics onBack={handleBackToMain} />;
  }

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
          <EnhancedAgriOrb 
            isActive={isAnalyzing} 
            image="/agriculture-orb.png" 
            isSpeaking={isSpeaking}
            audioLevel={audioLevel}
          />
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

        {/* Responsive Layout Container */}
        <motion.div
          layout
          className={`transition-all duration-700 ease-in-out ${
            showResults 
              ? 'flex flex-col lg:flex-row gap-6 items-start' 
              : 'block'
          }`}
        >
          {/* Input Panel - Shrinks and moves left when results show */}
          <motion.div
            layout
            className={`transition-all duration-700 ease-in-out ${
              showResults 
                ? 'w-full lg:w-1/3 lg:sticky lg:top-8' 
                : 'w-full'
            }`}
          >
            <InputPanel onSubmit={handleSubmit} isLoading={isAnalyzing} domain="agriculture" />
          </motion.div>

          {/* Graph View - Appears on the right when results show */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              className="w-full lg:w-2/3"
            >
              <GraphView 
                nodes={graphData.nodes} 
                links={graphData.links} 
                isProgressive={isAnalyzing}
                currentStep={currentStep}
                analysisSteps={analysisSteps}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Agriculture Features - Below input box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Agriculture Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl overflow-hidden hover:border-green-400/70 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300 cursor-pointer group"
                onClick={() => toggleSection(section.id)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    >
                      <section.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors duration-300">{section.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                    {section.content}
                  </p>
                  <div className="flex items-center justify-end">
                    <span className="text-green-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Explore
                      <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
