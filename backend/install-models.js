const { exec } = require('child_process');
const { promisify } = require('util');
const axios = require('axios');

const execAsync = promisify(exec);

const RECOMMENDED_MODELS = [
  'llama3.1:8b',    // Best balance for your hardware
  'mistral:7b',     // Good for reasoning
  'phi3:mini'       // Lightweight fallback
];

const OLLAMA_URL = 'http://localhost:11434';

class ModelInstaller {
  constructor() {
    this.isOllamaRunning = false;
  }

  async checkOllama() {
    try {
      await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 5000 });
      this.isOllamaRunning = true;
      console.log('✅ Ollama is running');
      return true;
    } catch (error) {
      console.log('❌ Ollama is not running');
      return false;
    }
  }

  async startOllama() {
    console.log('🚀 Starting Ollama...');
    
    try {
      // Try to start Ollama service
      const startCommands = [
        'ollama serve',
        'start "" "ollama" serve'
      ];

      for (const command of startCommands) {
        try {
          console.log(`Trying: ${command}`);
          exec(command, { detached: true, stdio: 'ignore' });
          
          // Wait and check
          await new Promise(resolve => setTimeout(resolve, 5000));
          
          if (await this.checkOllama()) {
            console.log('✅ Ollama started successfully!');
            return true;
          }
        } catch (err) {
          console.log(`Failed: ${command}`);
        }
      }
      
      console.log('⚠️  Please start Ollama manually: ollama serve');
      return false;
    } catch (error) {
      console.error('Error starting Ollama:', error);
      return false;
    }
  }

  async installModel(modelName) {
    console.log(`📥 Installing model: ${modelName}`);
    
    try {
      const { stdout, stderr } = await execAsync(`ollama pull ${modelName}`, {
        timeout: 600000 // 10 minutes timeout
      });
      
      console.log(`✅ ${modelName} installed successfully!`);
      if (stdout) console.log(stdout);
      return true;
    } catch (error) {
      console.error(`❌ Failed to install ${modelName}:`, error.message);
      if (error.stderr) console.error(error.stderr);
      return false;
    }
  }

  async installAll() {
    console.log('🔄 Installing recommended models for your IdeaPad Slim 3...\n');
    
    // Check if Ollama is running
    if (!await this.checkOllama()) {
      console.log('Starting Ollama first...');
      if (!await this.startOllama()) {
        console.log('❌ Could not start Ollama. Please run: ollama serve');
        return;
      }
    }

    // Install models one by one
    for (const model of RECOMMENDED_MODELS) {
      console.log(`\n📦 Installing ${model}...`);
      console.log('⏳ This may take several minutes depending on your internet speed...');
      
      const success = await this.installModel(model);
      if (!success) {
        console.log(`⚠️  Skipping ${model} - you can install it later with: ollama pull ${model}`);
      }
    }

    // List installed models
    try {
      const { stdout } = await execAsync('ollama list');
      console.log('\n📋 Installed models:');
      console.log(stdout);
    } catch (error) {
      console.log('Could not list models:', error.message);
    }

    console.log('\n🎉 Model installation complete!');
    console.log('🚀 You can now start the GraphoraX AI backend with: npm start');
  }

  async quickInstall() {
    console.log('⚡ Quick install for IdeaPad Slim 3...');
    
    if (!await this.checkOllama()) {
      await this.startOllama();
    }

    // Install just the essential model
    await this.installModel('llama3.1:8b');
    
    console.log('\n✅ Quick install complete!');
  }
}

// Run installer
const installer = new ModelInstaller();

const args = process.argv.slice(2);
if (args.includes('--quick')) {
  installer.quickInstall();
} else {
  installer.installAll();
}

module.exports = ModelInstaller;