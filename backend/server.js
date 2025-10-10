const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { MongoClient, ObjectId } = require('mongodb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Use supported model

// MongoDB connection
let db;
const mongoClient = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/fusion-ai');

async function connectMongoDB() {
  try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGODB_DB_NAME || 'fusion-ai');
    console.log('✅ Connected to MongoDB');
    
    // Create collections if they don't exist
    await db.createCollection('conversations');
    await db.createCollection('analytics');
    console.log('📊 MongoDB collections ready');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed - continuing without database storage:', error.message);
    console.log('💡 To enable database storage, ensure MongoDB is running on localhost:27017');
  }
}

connectMongoDB();
const OLLAMA_URL = 'http://localhost:11434';
const execAsync = promisify(exec);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } });

// GraphoraX AI Models Configuration
const DOMAIN_MODELS = {
  agriculture: 'llama3.1:8b',
  health: 'mistral:7b',
  finance: 'llama3.1:8b',
  education: 'mistral:7b',
  transport: 'llama3.1:8b',
  universal: 'llama3.1:8b'
};

// ElevenLabs TTS Configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_URL = 'https://api.elevenlabs.io/v1';
const DEFAULT_VOICE_ID = process.env.DEFAULT_VOICE_ID || 'pNInz6obpgDQGcFmaJgB';

// AI Analysis Class
class GraphoraXAI {
  constructor() {
    this.ollamaUrl = `${OLLAMA_URL}/api/generate`;
    this.isOllamaRunning = false;
    this.useGemini = true; // Prefer Gemini API
    this.checkOllamaStatus();
  }

  async generateTTS(text, voiceId = DEFAULT_VOICE_ID) {
    try {
      if (!ELEVENLABS_API_KEY) {
        throw new Error('ElevenLabs API key not configured');
      }

      console.log(`🔊 Generating TTS for text: "${text.substring(0, 50)}..."`);
      
      const response = await fetch(`${ELEVENLABS_URL}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`TTS API error: ${response.statusText}`);
      }

      const audioBuffer = await response.buffer();
      return {
        success: true,
        audio: audioBuffer.toString('base64'),
        contentType: 'audio/mpeg'
      };
    } catch (error) {
      console.error('TTS Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async analyzeWithGemini(domain, query, inputType = 'text') {
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured');
      }

      console.log(`🧠 Analyzing with Gemini AI - Domain: ${domain}, Query: "${query.substring(0, 50)}..."`);
      
      const prompt = this.buildGeminiPrompt(domain, query, inputType);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('✅ Gemini AI analysis completed successfully');
      return this.parseAIResponse(text, domain, 'gemini');
    } catch (error) {
      console.error('❌ Gemini AI Error:', error);
      return this.getFallbackResponse(domain, query);
    }
  }

  buildGeminiPrompt(domain, query, inputType) {
    return `You are GraphoraX AI, a specialized ${domain} intelligence system with advanced causal reasoning capabilities.

Domain: ${domain.toUpperCase()}
Input Type: ${inputType}
Query: ${query}

Analyze this using your ${domain} expertise and provide a JSON response with the following structure:

{
  "domain": "${domain}",
  "insights": [
    "Key insight 1 with specific details",
    "Key insight 2 with causal reasoning", 
    "Key insight 3 with actionable information"
  ],
  "recommendations": [
    "Specific action 1 with timeline",
    "Specific action 2 with expected outcome",
    "Specific action 3 with risk assessment"
  ],
  "causal_relationships": [
    {"source": "factor1", "target": "outcome1", "strength": 0.8, "type": "positive"},
    {"source": "factor2", "target": "outcome2", "strength": 0.6, "type": "negative"}
  ],
  "risk_factors": [
    {"factor": "risk1", "probability": 0.3, "impact": "medium"},
    {"factor": "risk2", "probability": 0.2, "impact": "high"}
  ],
  "confidence_score": 85,
  "data_quality": "high",
  "summary": "Brief executive summary of the analysis",
  "voice_response": "A natural, conversational response suitable for text-to-speech that summarizes the key findings and recommendations",
  "next_steps": [
    "Immediate action required",
    "Monitor specific metrics", 
    "Schedule follow-up analysis"
  ]
}

Provide detailed, domain-specific analysis with clear causal reasoning and actionable insights. The voice_response should be natural and engaging for audio playback.`;
  }

  async checkOllamaStatus() {
    try {
      const response = await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 5000 });
      this.isOllamaRunning = true;
      console.log('🟢 Ollama is running!');
      console.log('📋 Available models:', response.data.models?.map(m => m.name) || 'None');
    } catch (error) {
      this.isOllamaRunning = false;
      console.log('🔴 Ollama is not running. Starting Ollama...');
      await this.startOllama();
    }
  }

  async startOllama() {
    try {
      console.log('🚀 Attempting to start Ollama...');
      
      // Try different methods to start Ollama
      const startCommands = [
        'ollama serve',
        'start ollama serve',
        `"${process.env.LOCALAPPDATA || 'C:\\Users\\' + process.env.USERNAME + '\\AppData\\Local'}\\Programs\\Ollama\\ollama.exe" serve`
      ];

      for (const command of startCommands) {
        try {
          console.log(`Trying: ${command}`);
          exec(command, { detached: true, stdio: 'ignore' });
          
          // Wait a bit and check if it started
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const response = await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 2000 });
          this.isOllamaRunning = true;
          console.log('✅ Ollama started successfully!');
          return;
        } catch (err) {
          console.log(`❌ Failed with: ${command}`);
          continue;
        }
      }
      
      console.log('⚠️ Could not start Ollama automatically. Please start manually with: ollama serve');
    } catch (error) {
      console.error('❌ Error starting Ollama:', error.message);
    }
  }

  async analyzeDomain(domain, query, inputType = 'text', fileData = null, req = null) {
    let result;
    
    // Try Gemini API first
    if (this.useGemini && process.env.GEMINI_API_KEY) {
      try {
        result = await this.analyzeWithGemini(domain, query, inputType);
        result.data.source = 'gemini';
      } catch (error) {
        console.error('Gemini analysis failed, trying Ollama:', error);
        result = await this.analyzeWithOllama(domain, query, inputType, fileData);
      }
    } else {
      result = await this.analyzeWithOllama(domain, query, inputType, fileData);
    }

    // Store conversation in MongoDB
    if (db && result.success) {
      try {
        const conversationDoc = {
          domain,
          query,
          inputType,
          response: result.data,
          timestamp: new Date(),
          source: result.data.source || 'unknown',
          userId: 'default', // Add user management later
          sessionId: req.headers['x-session-id'] || 'default',
          metadata: {
            processing_time: Date.now() - (req.startTime || Date.now()),
            confidence_score: result.data.confidence_score || 0,
            has_tts: !!result.data.audio
          }
        };
        
        await db.collection('conversations').insertOne(conversationDoc);
        console.log('💾 Conversation saved to MongoDB');
      } catch (error) {
        console.error('❌ MongoDB save error:', error);
      }
    }

    return result;
  }

  async analyzeWithOllama(domain, query, inputType = 'text', fileData = null) {
    if (!this.isOllamaRunning) {
      return this.getFallbackResponse(domain, query);
    }

    const model = DOMAIN_MODELS[domain] || 'llama3.1:8b';
    const prompt = this.buildPrompt(domain, query, inputType, fileData);

    try {
      const response = await axios.post(this.ollamaUrl, {
        model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 1500,
          stop: ['</analysis>']
        }
      }, { timeout: 30000 });

      return this.parseAIResponse(response.data.response, domain, 'ollama');
    } catch (error) {
      console.error(`Ollama AI Error for ${domain}:`, error.message);
      
      // Try to restart Ollama if connection failed
      if (error.code === 'ECONNREFUSED') {
        this.isOllamaRunning = false;
        await this.startOllama();
      }
      
      return this.getFallbackResponse(domain, query);
    }
  }

  buildPrompt(domain, query, inputType, fileData) {
    let basePrompt = `You are GraphoraX AI, a specialized ${domain} intelligence system with advanced causal reasoning capabilities.

Domain: ${domain.toUpperCase()}
Input Type: ${inputType}
Query: ${query}`;

    if (fileData) {
      basePrompt += `\nFile Data: ${fileData.substring(0, 1000)}...`;
    }

    return basePrompt + `

Analyze this using your ${domain} expertise and provide:

<analysis>
{
  "domain": "${domain}",
  "insights": [
    "Key insight 1 with specific details",
    "Key insight 2 with causal reasoning",
    "Key insight 3 with actionable information"
  ],
  "recommendations": [
    "Specific action 1 with timeline",
    "Specific action 2 with expected outcome",
    "Specific action 3 with risk assessment"
  ],
  "causal_relationships": [
    {"source": "factor1", "target": "outcome1", "strength": 0.8, "type": "positive"},
    {"source": "factor2", "target": "outcome2", "strength": 0.6, "type": "negative"}
  ],
  "risk_factors": [
    {"factor": "risk1", "probability": 0.3, "impact": "medium"},
    {"factor": "risk2", "probability": 0.2, "impact": "high"}
  ],
  "confidence_score": 85,
  "data_quality": "high",
  "next_steps": [
    "Immediate action required",
    "Monitor specific metrics",
    "Schedule follow-up analysis"
  ]
}
</analysis>

Provide detailed, domain-specific analysis with clear causal reasoning and actionable insights.`;
  }

  parseAIResponse(response, domain, source = 'unknown') {
    try {
      // For Gemini API, response should already be JSON-formatted
      if (source === 'gemini') {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          parsed.source = 'gemini';
          return { success: true, data: parsed };
        }
      }

      // For Ollama, extract JSON from between <analysis> tags
      const analysisMatch = response.match(/<analysis>([\s\S]*?)<\/analysis>/);
      if (analysisMatch) {
        const jsonStr = analysisMatch[1].trim();
        const parsed = JSON.parse(jsonStr);
        parsed.source = source;
        return { success: true, data: parsed };
      }

      // Try to find JSON in the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        parsed.source = source;
        return { success: true, data: parsed };
      }

      // Fallback: create structured response from plain text
      const fallbackData = {
        domain,
        insights: [response.substring(0, 200) + '...'],
        recommendations: ['Review detailed analysis', 'Consult domain expert'],
        causal_relationships: [],
        risk_factors: [],
        confidence_score: 70,
        summary: response.substring(0, 150) + '...',
        voice_response: `Based on the ${domain} analysis, here are the key findings: ${response.substring(0, 200)}`,
        next_steps: ['Review complete analysis', 'Take recommended actions'],
        source: 'text_parsing'
      };

      return { success: true, data: fallbackData };
    } catch (error) {
      console.error('Response parsing error:', error);
      return this.getFallbackResponse(domain, 'parsing_failed');
    }
  }

  getFallbackResponse(domain, query) {
    const fallbackData = {
      agriculture: {
        insights: ['Soil conditions appear normal', 'Weather patterns favorable', 'Crop growth on track'],
        recommendations: ['Continue current irrigation schedule', 'Monitor for pest activity', 'Plan harvest timing'],
        causal_relationships: [
          {source: 'soil_moisture', target: 'crop_health', strength: 0.8, type: 'positive'},
          {source: 'weather', target: 'yield', strength: 0.7, type: 'positive'}
        ],
        voice_response: 'Hello! Your agricultural analysis shows favorable conditions. Soil moisture levels are optimal and weather patterns support healthy crop growth. I recommend continuing your current irrigation schedule and monitoring for any pest activity.'
      },
      health: {
        insights: ['Vital signs within normal range', 'Activity levels adequate', 'Sleep patterns stable'],
        recommendations: ['Maintain current exercise routine', 'Continue healthy diet', 'Monitor stress levels'],
        causal_relationships: [
          {source: 'exercise', target: 'cardiovascular_health', strength: 0.9, type: 'positive'},
          {source: 'sleep', target: 'mental_health', strength: 0.8, type: 'positive'}
        ],
        voice_response: 'Your health analysis indicates everything is progressing well. Your vital signs are within normal range and your activity levels are adequate. Keep up your current exercise routine and maintain that healthy diet!'
      },
      finance: {
        insights: ['Portfolio balanced', 'Risk levels appropriate', 'Growth trajectory positive'],
        recommendations: ['Diversify investments', 'Monitor market trends', 'Review quarterly performance'],
        causal_relationships: [
          {source: 'market_volatility', target: 'portfolio_risk', strength: 0.6, type: 'positive'},
          {source: 'diversification', target: 'stability', strength: 0.8, type: 'positive'}
        ],
        voice_response: 'Your financial portfolio shows a positive growth trajectory with balanced risk levels. Consider diversifying your investments further and keep monitoring market trends for optimal performance.'
      },
      education: {
        insights: ['Learning progress on track', 'Engagement levels high', 'Knowledge retention good'],
        recommendations: ['Continue current study methods', 'Add more practice exercises', 'Review weak areas'],
        causal_relationships: [
          {source: 'study_time', target: 'performance', strength: 0.8, type: 'positive'},
          {source: 'practice', target: 'retention', strength: 0.9, type: 'positive'}
        ],
        voice_response: 'Your educational progress looks excellent! Learning is on track with high engagement levels. Keep up your current study methods and consider adding more practice exercises to strengthen your knowledge.'
      },
      transport: {
        insights: ['Route efficiency optimized', 'Fuel consumption normal', 'Traffic patterns predictable'],
        recommendations: ['Monitor route alternatives', 'Track fuel efficiency', 'Plan for peak hours'],
        causal_relationships: [
          {source: 'traffic_density', target: 'travel_time', strength: 0.7, type: 'positive'},
          {source: 'route_optimization', target: 'fuel_efficiency', strength: 0.8, type: 'positive'}
        ],
        voice_response: 'Your transportation analysis shows optimized routes with normal fuel consumption. Traffic patterns are predictable, so continue monitoring alternative routes and planning around peak hours.'
      },
      universal: {
        insights: ['System performance stable', 'Resource utilization optimal', 'User engagement high'],
        recommendations: ['Continue monitoring metrics', 'Optimize performance further', 'Gather user feedback'],
        causal_relationships: [
          {source: 'user_engagement', target: 'system_usage', strength: 0.9, type: 'positive'},
          {source: 'performance', target: 'satisfaction', strength: 0.8, type: 'positive'}
        ],
        voice_response: 'Universal analysis indicates excellent system performance with high user engagement. All metrics are stable and resource utilization is optimal. Continue monitoring and gathering user feedback for continuous improvement.'
      }
    };

    const domainData = fallbackData[domain] || fallbackData.universal;

    return {
      success: true,
      data: {
        domain,
        insights: domainData.insights,
        recommendations: domainData.recommendations,
        causal_relationships: domainData.causal_relationships,
        risk_factors: [
          {factor: 'data_availability', probability: 0.3, impact: 'medium'},
          {factor: 'external_factors', probability: 0.2, impact: 'low'}
        ],
        confidence_score: 60,
        summary: `${domain.charAt(0).toUpperCase() + domain.slice(1)} analysis complete with demo data`,
        voice_response: domainData.voice_response,
        next_steps: ['Review detailed analysis', 'Implement recommendations', 'Monitor progress'],
        source: 'fallback_demo_data',
        note: 'AI services unavailable - using intelligent demo data'
      }
    };
  }
}

// Initialize AI
const graphoraXAI = new GraphoraXAI();

// Routes
app.get('/api/health', async (req, res) => {
  const healthStatus = {
    status: 'healthy',
    services: {},
    timestamp: new Date().toISOString()
  };

  // Check Ollama
  try {
    const ollamaHealth = await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 5000 });
    healthStatus.services.ollama = {
      status: 'running',
      models: ollamaHealth.data.models?.map(m => m.name) || []
    };
  } catch (error) {
    healthStatus.services.ollama = {
      status: 'not_running',
      error: error.message
    };
    healthStatus.status = 'degraded';
  }

  // Check Gemini API
  healthStatus.services.gemini = {
    status: process.env.GEMINI_API_KEY ? 'configured' : 'not_configured',
    available: !!process.env.GEMINI_API_KEY
  };

  // Check ElevenLabs API
  healthStatus.services.elevenlabs = {
    status: process.env.ELEVENLABS_API_KEY ? 'configured' : 'not_configured',
    available: !!process.env.ELEVENLABS_API_KEY
  };

  // Check MongoDB
  healthStatus.services.mongodb = {
    status: db ? 'connected' : 'disconnected',
    available: !!db
  };

  // Overall status
  const allServicesHealthy = Object.values(healthStatus.services).every(
    service => service.status === 'running' || service.status === 'configured' || service.status === 'connected'
  );

  if (!allServicesHealthy && healthStatus.status === 'healthy') {
    healthStatus.status = 'degraded';
  }

  res.json(healthStatus);
});

app.post('/api/analyze', async (req, res) => {
  try {
    req.startTime = Date.now(); // Track processing time
    const { domain, query, inputType = 'text', generateTTS = true } = req.body; // Default TTS to true
    
    if (!domain || !query) {
      return res.status(400).json({ error: 'Domain and query are required' });
    }

    console.log(`🔍 Analyzing ${domain} query: ${query.substring(0, 100)}...`);
    
    const result = await graphoraXAI.analyzeDomain(domain, query, inputType, null, req);
    
    // Generate TTS if requested and analysis was successful
    if (generateTTS && result.success && result.data.voice_response) {
      console.log('🔊 Generating TTS for response...');
      const ttsResult = await graphoraXAI.generateTTS(result.data.voice_response);
      if (ttsResult.success) {
        result.data.audio = ttsResult.audio;
        result.data.audioContentType = ttsResult.contentType;
        console.log('✅ TTS audio generated successfully');
      } else {
        console.log('⚠️ TTS generation failed, proceeding without audio');
      }
    }
    
    res.json(result);
  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message,
      fallback: true
    });
  }
});

// New TTS endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    console.log(`🔊 Generating TTS for: ${text.substring(0, 50)}...`);
    
    const result = await graphoraXAI.generateTTS(text, voiceId);
    
    if (result.success) {
      res.json({
        success: true,
        audio: result.audio,
        contentType: result.contentType
      });
    } else {
      res.status(500).json({
        error: 'TTS generation failed',
        message: result.error
      });
    }
  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({
      error: 'TTS generation failed',
      message: error.message
    });
  }
});

// Get conversation history
app.get('/api/conversations/:domain?', async (req, res) => {
  try {
    const { domain } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;

    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const filter = domain ? { domain } : {};
    const conversations = await db.collection('conversations')
      .find(filter)
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .toArray();

    res.json({
      success: true,
      conversations,
      total: await db.collection('conversations').countDocuments(filter)
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Failed to retrieve conversations',
      message: error.message
    });
  }
});

app.post('/api/analyze/multimodal', upload.single('file'), async (req, res) => {
  try {
    const { domain, query, inputType } = req.body;
    const file = req.file;
    
    let fileData = null;
    if (file) {
      fileData = file.buffer.toString('base64');
    }
    
    console.log(`🎯 Multimodal analysis for ${domain}: ${inputType}`);
    
    const result = await graphoraXAI.analyzeDomain(domain, query, inputType, fileData);
    
    res.json(result);
  } catch (error) {
    console.error('Multimodal analysis error:', error);
    res.status(500).json({
      error: 'Multimodal analysis failed',
      message: error.message
    });
  }
});

app.get('/api/models', async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);
    res.json({
      installed: response.data.models || [],
      recommended: DOMAIN_MODELS,
      status: 'available'
    });
  } catch (error) {
    res.json({
      installed: [],
      recommended: DOMAIN_MODELS,
      status: 'ollama_not_running',
      error: error.message
    });
  }
});

app.post('/api/install-model', async (req, res) => {
  try {
    const { model } = req.body;
    
    console.log(`📥 Installing model: ${model}`);
    
    // This would typically be handled by a separate process
    // For now, we'll return instructions
    res.json({
      message: `To install ${model}, run: ollama pull ${model}`,
      command: `ollama pull ${model}`,
      status: 'instructions_provided'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Model installation failed',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 GraphoraX AI Backend running on port ${PORT}
🔗 API URL: http://localhost:${PORT}
🧠 Ollama URL: ${OLLAMA_URL}
📊 Health Check: http://localhost:${PORT}/api/health

Available endpoints:
- POST /api/analyze - Domain analysis
- POST /api/analyze/multimodal - File analysis
- GET /api/models - List models
- GET /api/health - System status
`);
});

module.exports = app;