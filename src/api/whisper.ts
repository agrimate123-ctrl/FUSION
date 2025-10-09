// Voice transcription service using Web Speech API and Whisper
export interface VoiceTranscriptionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
}

export interface VoiceTranscriptionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export class VoiceTranscriptionService {
  private recognition: SpeechRecognition | null = null;
  private isSupported: boolean = false;

  constructor() {
    // Check if Speech Recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.isSupported = true;
      this.setupRecognition();
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;
  }

  public isVoiceSupported(): boolean {
    return this.isSupported;
  }

  public async startListening(
    onResult: (result: VoiceTranscriptionResult) => void,
    onError?: (error: string) => void,
    options?: VoiceTranscriptionOptions
  ): Promise<void> {
    if (!this.recognition) {
      onError?.('Speech recognition not supported');
      return;
    }

    // Apply options
    if (options) {
      if (options.continuous !== undefined) {
        this.recognition.continuous = options.continuous;
      }
      if (options.interimResults !== undefined) {
        this.recognition.interimResults = options.interimResults;
      }
      if (options.language) {
        this.recognition.lang = options.language;
      }
    }

    // Set up event handlers
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;
        
        onResult({
          transcript,
          confidence,
          isFinal: result.isFinal
        });
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      onError?.(event.error);
    };

    this.recognition.onend = () => {
      // Recognition ended
    };

    try {
      this.recognition.start();
    } catch (error) {
      onError?.('Failed to start speech recognition');
    }
  }

  public stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  public abort(): void {
    if (this.recognition) {
      this.recognition.abort();
    }
  }
}

// Alternative Whisper API integration (for future use with backend)
export class WhisperAPIService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openai.com/v1/audio/transcriptions';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_OPENAI_API_KEY || '';
  }

  public async transcribeAudio(audioBlob: Blob): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    formData.append('model', 'whisper-1');

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Whisper API error:', error);
      throw error;
    }
  }

  public async recordAndTranscribe(duration: number = 5000): Promise<string> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const audioChunks: Blob[] = [];

          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            try {
              const transcript = await this.transcribeAudio(audioBlob);
              resolve(transcript);
            } catch (error) {
              reject(error);
            }
            
            // Stop all tracks
            stream.getTracks().forEach(track => track.stop());
          };

          mediaRecorder.start();
          setTimeout(() => mediaRecorder.stop(), duration);
        })
        .catch(reject);
    });
  }
}

// Singleton instances
export const voiceService = new VoiceTranscriptionService();
export const whisperAPI = new WhisperAPIService();