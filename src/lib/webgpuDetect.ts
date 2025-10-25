/**
 * WebGPU feature detection and capability checking
 */

export interface WebGPUCapabilities {
  supported: boolean;
  available: boolean;
  estimatedMemory: number; // in MB
  reason?: string;
}

export async function checkWebGPUSupport(): Promise<WebGPUCapabilities> {
  // Check if WebGPU is available in the browser
  if (!('gpu' in navigator)) {
    return {
      supported: false,
      available: false,
      estimatedMemory: 0,
      reason: 'WebGPU not supported in this browser',
    };
  }

  try {
    const gpu = (navigator as any).gpu;
    const adapter = await gpu.requestAdapter();
    if (!adapter) {
      return {
        supported: true,
        available: false,
        estimatedMemory: 0,
        reason: 'No WebGPU adapter available',
      };
    }

    // Estimate available memory (conservative estimate)
    const memory = (performance as any).memory;
    const estimatedMemory = memory 
      ? Math.floor((memory.jsHeapSizeLimit / 1024 / 1024) * 0.4) // 40% of heap limit
      : 2048; // Default to 2GB if unavailable

    return {
      supported: true,
      available: true,
      estimatedMemory,
    };
  } catch (error) {
    return {
      supported: true,
      available: false,
      estimatedMemory: 0,
      reason: `WebGPU error: ${error instanceof Error ? error.message : 'Unknown'}`,
    };
  }
}

export function isMeteredConnection(): boolean {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (!connection) return false;
  
  return connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
}

export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    cores: navigator.hardwareConcurrency || 4,
    memory: (performance as any).memory?.jsHeapSizeLimit || 0,
  };
}
