import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { checkWebGPUSupport, WebGPUCapabilities } from '@/lib/webgpuDetect';
import { modelLoader, ModelLoadProgress } from '@/services/modelLoader';
import { vectorStore } from '@/services/localVectorStore';
import posthog from 'posthog-js';

export type AIMode = 'cloud' | 'local';

export interface ModelStatus {
  name: string;
  status: 'idle' | 'loading' | 'ready' | 'error';
  progress: number;
  error?: string;
}

export interface LocalAIState {
  mode: AIMode;
  webgpuCapabilities: WebGPUCapabilities | null;
  models: {
    llm: ModelStatus;
    embeddings: ModelStatus;
  };
  vectorStoreStats: {
    documentCount: number;
    estimatedSize: number;
  };
  analytics: {
    sessionsStarted: number;
    tokensGenerated: number;
    averageLatency: number;
  };
}

interface LocalAIContextType extends LocalAIState {
  setMode: (mode: AIMode) => void;
  loadLLM: () => Promise<void>;
  loadEmbeddings: () => Promise<void>;
  unloadLLM: () => Promise<void>;
  unloadEmbeddings: () => Promise<void>;
  refreshVectorStoreStats: () => Promise<void>;
  trackInference: (latency: number, tokens: number) => void;
}

const LocalAIContext = createContext<LocalAIContextType | undefined>(undefined);

export function LocalAIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LocalAIState>({
    mode: 'cloud',
    webgpuCapabilities: null,
    models: {
      llm: { name: 'Llama-3.2-1B-Instruct', status: 'idle', progress: 0 },
      embeddings: { name: 'MiniLM-L6-v2', status: 'idle', progress: 0 },
    },
    vectorStoreStats: {
      documentCount: 0,
      estimatedSize: 0,
    },
    analytics: {
      sessionsStarted: 0,
      tokensGenerated: 0,
      averageLatency: 0,
    },
  });

  // Check WebGPU support on mount
  useEffect(() => {
    checkWebGPUSupport().then(capabilities => {
      setState(prev => ({ ...prev, webgpuCapabilities: capabilities }));
    });
  }, []);

  // Load vector store stats on mount
  useEffect(() => {
    refreshVectorStoreStats();
  }, []);

  // Load mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('ai_mode') as AIMode;
    if (savedMode === 'local' || savedMode === 'cloud') {
      setState(prev => ({ ...prev, mode: savedMode }));
    }
  }, []);

  const setMode = (mode: AIMode) => {
    const previousMode = state.mode;
    setState(prev => ({ ...prev, mode }));
    localStorage.setItem('ai_mode', mode);
    
    posthog.capture('ai_mode_switched', {
      from: previousMode,
      to: mode,
      webgpu_support: state.webgpuCapabilities?.available || false,
    });
  };

  const loadLLM = async () => {
    setState(prev => ({
      ...prev,
      models: {
        ...prev.models,
        llm: { ...prev.models.llm, status: 'loading', progress: 0 },
      },
    }));

    try {
      await modelLoader.loadLLM('Llama-3.2-1B-Instruct-q4f16_1-MLC', (progress: ModelLoadProgress) => {
        setState(prev => ({
          ...prev,
          models: {
            ...prev.models,
            llm: { ...prev.models.llm, progress: progress.progress },
          },
        }));
      });

      setState(prev => ({
        ...prev,
        models: {
          ...prev.models,
          llm: { ...prev.models.llm, status: 'ready', progress: 100 },
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        models: {
          ...prev.models,
          llm: {
            ...prev.models.llm,
            status: 'error',
            error: error instanceof Error ? error.message : 'Failed to load model',
          },
        },
      }));
    }
  };

  const loadEmbeddings = async () => {
    setState(prev => ({
      ...prev,
      models: {
        ...prev.models,
        embeddings: { ...prev.models.embeddings, status: 'loading', progress: 0 },
      },
    }));

    try {
      await modelLoader.loadEmbeddings();

      setState(prev => ({
        ...prev,
        models: {
          ...prev.models,
          embeddings: { ...prev.models.embeddings, status: 'ready', progress: 100 },
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        models: {
          ...prev.models,
          embeddings: {
            ...prev.models.embeddings,
            status: 'error',
            error: error instanceof Error ? error.message : 'Failed to load model',
          },
        },
      }));
    }
  };

  const unloadLLM = async () => {
    await modelLoader.unloadLLM();
    setState(prev => ({
      ...prev,
      models: {
        ...prev.models,
        llm: { ...prev.models.llm, status: 'idle', progress: 0 },
      },
    }));
  };

  const unloadEmbeddings = async () => {
    await modelLoader.unloadEmbeddings();
    setState(prev => ({
      ...prev,
      models: {
        ...prev.models,
        embeddings: { ...prev.models.embeddings, status: 'idle', progress: 0 },
      },
    }));
  };

  const refreshVectorStoreStats = async () => {
    const stats = await vectorStore.getStats();
    setState(prev => ({
      ...prev,
      vectorStoreStats: stats,
    }));
  };

  const trackInference = (latency: number, tokens: number) => {
    setState(prev => {
      const newSessionCount = prev.analytics.sessionsStarted + 1;
      const newTokensGenerated = prev.analytics.tokensGenerated + tokens;
      const newAverageLatency = 
        (prev.analytics.averageLatency * prev.analytics.sessionsStarted + latency) / newSessionCount;

      return {
        ...prev,
        analytics: {
          sessionsStarted: newSessionCount,
          tokensGenerated: newTokensGenerated,
          averageLatency: Math.round(newAverageLatency),
        },
      };
    });

    posthog.capture('local_inference_completed', {
      latency_ms: latency,
      tokens_generated: tokens,
      tokens_per_second: Math.round((tokens / latency) * 1000),
    });
  };

  return (
    <LocalAIContext.Provider
      value={{
        ...state,
        setMode,
        loadLLM,
        loadEmbeddings,
        unloadLLM,
        unloadEmbeddings,
        refreshVectorStoreStats,
        trackInference,
      }}
    >
      {children}
    </LocalAIContext.Provider>
  );
}

export function useLocalAI() {
  const context = useContext(LocalAIContext);
  if (!context) {
    throw new Error('useLocalAI must be used within LocalAIProvider');
  }
  return context;
}
