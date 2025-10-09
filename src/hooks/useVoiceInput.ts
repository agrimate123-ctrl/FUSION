import { useState, useCallback, useRef } from 'react';
import { whisperAPI, WhisperResponse, WhisperAPI } from '../api/whisper';

export interface VoiceInputState {
  isRecording: boolean;
  isTranscribing: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
}

export const useVoiceInput = () => {
  const [state, setState] = useState<VoiceInputState>({
    isRecording: false,
    isTranscribing: false,
    transcript: '',
    error: null,
    isSupported: WhisperAPI.isSupported(),
  });

  const audioRef = useRef<Blob | null>(null);

  const startRecording = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null, isRecording: true }));
      await whisperAPI.startRecording();
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isRecording: false, 
        error: error instanceof Error ? error.message : 'Failed to start recording'
      }));
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isRecording: false, isTranscribing: true }));
      const audioBlob = await whisperAPI.stopRecording();
      audioRef.current = audioBlob;
      
      const result: WhisperResponse = await whisperAPI.transcribeAudio(audioBlob);
      
      setState(prev => ({ 
        ...prev, 
        isTranscribing: false, 
        transcript: result.text,
        error: null
      }));
      
      return result.text;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isRecording: false, 
        isTranscribing: false,
        error: error instanceof Error ? error.message : 'Failed to process recording'
      }));
      return null;
    }
  }, []);

  const clearTranscript = useCallback(() => {
    setState(prev => ({ ...prev, transcript: '', error: null }));
  }, []);

  const toggleRecording = useCallback(async () => {
    if (state.isRecording) {
      return await stopRecording();
    } else {
      await startRecording();
      return null;
    }
  }, [state.isRecording, startRecording, stopRecording]);

  return {
    ...state,
    startRecording,
    stopRecording, 
    toggleRecording,
    clearTranscript,
  };
};