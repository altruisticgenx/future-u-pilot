/**
 * DOM utilities with RAF batching for optimal performance
 * Batches DOM reads and writes to prevent layout thrashing
 */

interface StyleUpdate {
  element: HTMLElement;
  properties: Partial<CSSStyleDeclaration>;
}

interface ClassUpdate {
  element: HTMLElement;
  add?: string[];
  remove?: string[];
  toggle?: string[];
}

/**
 * Batch style updates in a single RAF callback
 * Prevents layout thrashing by batching all writes together
 */
export const batchStyleUpdates = (updates: StyleUpdate[]): void => {
  requestAnimationFrame(() => {
    updates.forEach(({ element, properties }) => {
      Object.entries(properties).forEach(([key, value]) => {
        if (value !== undefined && typeof value === 'string') {
          (element.style as any)[key] = value;
        }
      });
    });
  });
};

/**
 * Batch class updates in a single RAF callback
 * More efficient than individual classList operations
 */
export const batchClassUpdates = (updates: ClassUpdate[]): void => {
  requestAnimationFrame(() => {
    updates.forEach(({ element, add, remove, toggle }) => {
      if (remove?.length) {
        element.classList.remove(...remove);
      }
      if (add?.length) {
        element.classList.add(...add);
      }
      if (toggle?.length) {
        toggle.forEach(className => element.classList.toggle(className));
      }
    });
  });
};

/**
 * Read layout properties in a batched RAF (read phase)
 * Prevents interleaving reads and writes
 */
export const batchLayoutReads = <T>(
  readFn: () => T
): Promise<T> => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      const result = readFn();
      resolve(result);
    });
  });
};

/**
 * Measure multiple elements in a single RAF
 * Useful for avoiding layout thrashing in loops
 */
export const measureElements = (
  elements: HTMLElement[]
): Promise<DOMRect[]> => {
  return batchLayoutReads(() => 
    elements.map(el => el.getBoundingClientRect())
  );
};

/**
 * Update multiple element styles after measuring
 * Separates read and write phases properly
 */
export const measureAndUpdate = async (
  elements: HTMLElement[],
  updateFn: (measurements: DOMRect[], element: HTMLElement, index: number) => Partial<CSSStyleDeclaration>
): Promise<void> => {
  // Read phase
  const measurements = await measureElements(elements);
  
  // Write phase
  const updates: StyleUpdate[] = elements.map((element, index) => ({
    element,
    properties: updateFn(measurements, element, index)
  }));
  
  batchStyleUpdates(updates);
};
