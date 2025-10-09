import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Type, Mic, Image, Video, Rss, Upload, Send } from 'lucide-react';

type InputMode = 'text' | 'voice' | 'image' | 'video' | 'live';

interface InputPanelProps {
  onSubmit: (data: { mode: InputMode; content: string | File }) => void;
  isLoading?: boolean;
}

export default function InputPanel({ onSubmit, isLoading = false }: InputPanelProps) {
  const [activeMode, setActiveMode] = useState<InputMode>('text');
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modes = [
    { id: 'text' as InputMode, label: 'Text', icon: Type },
    { id: 'voice' as InputMode, label: 'Voice', icon: Mic },
    { id: 'image' as InputMode, label: 'Image', icon: Image },
    { id: 'video' as InputMode, label: 'Video', icon: Video },
    { id: 'live' as InputMode, label: 'Live Feed', icon: Rss },
  ];

  const handleSubmit = () => {
    if (activeMode === 'text' && textInput.trim()) {
      onSubmit({ mode: activeMode, content: textInput });
      setTextInput('');
    } else if (['image', 'video'].includes(activeMode) && selectedFile) {
      onSubmit({ mode: activeMode, content: selectedFile });
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-gray-800/50 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-wrap gap-2 mb-6">
          {modes.map((mode) => (
            <motion.button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                ${activeMode === mode.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              <mode.icon className="w-4 h-4" />
              <span className="text-sm">{mode.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="relative">
          {activeMode === 'text' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Describe your query or concern..."
                className="w-full h-32 bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSubmit}
                disabled={!textInput.trim() || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Query</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {activeMode === 'voice' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mx-auto w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50"
              >
                <Mic className="w-10 h-10 text-white" />
              </motion.button>
              <p className="mt-6 text-gray-400">Click to start recording</p>
              <p className="text-sm text-gray-500 mt-2">Voice input coming soon</p>
            </motion.div>
          )}

          {(activeMode === 'image' || activeMode === 'video') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={activeMode === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileSelect}
                className="hidden"
              />
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.02 }}
                className="w-full border-2 border-dashed border-gray-600 rounded-xl py-12 hover:border-blue-500 transition-colors"
              >
                <Upload className="w-12 h-12 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">
                  {selectedFile ? selectedFile.name : `Click to upload ${activeMode}`}
                </p>
              </motion.button>
              {selectedFile && (
                <motion.button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Analyze {activeMode}</span>
                </motion.button>
              )}
            </motion.div>
          )}

          {activeMode === 'live' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
                <Rss className="w-10 h-10 text-white" />
              </div>
              <p className="mt-6 text-gray-400">Live feed integration</p>
              <p className="text-sm text-gray-500 mt-2">Connect camera or stream (Coming soon)</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
