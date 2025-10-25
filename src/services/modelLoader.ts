import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";
import { pipeline } from "@huggingface/transformers";
import { checkWebGPUSupport, isMeteredConnection } from "@/lib/webgpuDetect";
import posthog from "posthog-js";

export interface ModelLoadProgress {
  progress: number; // 0-100
  text: string;
  timeElapsed: number;
}

export interface LoadedModels {
  llm: MLCEngine | null;
  embeddings: any | null;
}

class ModelLoaderService {
  private llmEngine: MLCEngine | null = null;
  private embeddingPipeline: any | null = null;
  private loadingPromises: Map<string, Promise<any>> = new Map();

  async loadLLM(
    modelName: string = "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    onProgress?: (progress: ModelLoadProgress) => void
  ): Promise<MLCEngine> {
    // Return cached instance if already loaded
    if (this.llmEngine) {
      return this.llmEngine;
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has('llm')) {
      return this.loadingPromises.get('llm')!;
    }

    const startTime = Date.now();
    
    const loadPromise = (async () => {
      try {
        const capabilities = await checkWebGPUSupport();
        if (!capabilities.available) {
          throw new Error(capabilities.reason || 'WebGPU not available');
        }

        const initProgressCallback = (report: any) => {
          if (onProgress) {
            onProgress({
              progress: report.progress || 0,
              text: report.text || 'Initializing...',
              timeElapsed: Date.now() - startTime,
            });
          }
        };

        this.llmEngine = await CreateMLCEngine(modelName, {
          initProgressCallback,
        });

        posthog.capture('local_model_loaded', {
          model_name: modelName,
          load_time_ms: Date.now() - startTime,
          success: true,
        });

        return this.llmEngine;
      } catch (error) {
        posthog.capture('model_download_failed', {
          model_name: modelName,
          error: error instanceof Error ? error.message : 'Unknown error',
          load_time_ms: Date.now() - startTime,
        });
        throw error;
      } finally {
        this.loadingPromises.delete('llm');
      }
    })();

    this.loadingPromises.set('llm', loadPromise);
    return loadPromise;
  }

  async loadEmbeddings(
    modelName: string = "Xenova/all-MiniLM-L6-v2"
  ): Promise<any> {
    // Return cached instance if already loaded
    if (this.embeddingPipeline) {
      return this.embeddingPipeline;
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has('embeddings')) {
      return this.loadingPromises.get('embeddings')!;
    }

    const startTime = Date.now();

    const loadPromise = (async () => {
      try {
        this.embeddingPipeline = await pipeline('feature-extraction', modelName);

        posthog.capture('embedding_model_loaded', {
          model_name: modelName,
          load_time_ms: Date.now() - startTime,
        });

        return this.embeddingPipeline;
      } catch (error) {
        posthog.capture('embedding_model_failed', {
          model_name: modelName,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        throw error;
      } finally {
        this.loadingPromises.delete('embeddings');
      }
    })();

    this.loadingPromises.set('embeddings', loadPromise);
    return loadPromise;
  }

  async unloadLLM(): Promise<void> {
    if (this.llmEngine) {
      this.llmEngine = null;
      posthog.capture('local_model_unloaded', { model_type: 'llm' });
    }
  }

  async unloadEmbeddings(): Promise<void> {
    if (this.embeddingPipeline) {
      this.embeddingPipeline = null;
      posthog.capture('local_model_unloaded', { model_type: 'embeddings' });
    }
  }

  getLoadedModels(): LoadedModels {
    return {
      llm: this.llmEngine,
      embeddings: this.embeddingPipeline,
    };
  }

  isLLMLoaded(): boolean {
    return this.llmEngine !== null;
  }

  isEmbeddingsLoaded(): boolean {
    return this.embeddingPipeline !== null;
  }
}

// Singleton instance
export const modelLoader = new ModelLoaderService();

// Prefetch models during idle time
export function prefetchAIModels() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(async () => {
      const capabilities = await checkWebGPUSupport();
      if (capabilities.available && !isMeteredConnection()) {
        // Don't await - let it load in background
        modelLoader.loadLLM().catch(console.error);
        modelLoader.loadEmbeddings().catch(console.error);
      }
    }, { timeout: 10000 });
  }
}
