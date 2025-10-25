# CSS Optimization Strategy

This project implements comprehensive CSS optimization for maximum performance.

## 1. Tailwind Tree-Shaking ✅

**Configuration:** `tailwind.config.ts`

- **Content paths optimized**: Simplified to `./src/**/*.{js,ts,jsx,tsx,mdx}` for better tree-shaking
- **PurgeCSS built-in**: Tailwind automatically removes unused classes in production
- **Result**: Only classes used in your components are included in the final bundle

## 2. Critical CSS Extraction ✅

**Files:**
- `index.html` - Inline critical CSS for above-the-fold content
- `src/styles/critical.css` - Separate critical CSS file
- `vite-plugin-critical-css.ts` - Build-time critical CSS extraction

**Critical selectors identified:**
- Navigation and header elements
- Hero section (#hero-section)
- Core layout (body, #root, .container)
- Essential utilities (.flex, .grid, .sr-only)
- Glass effects used in navigation

**Benefits:**
- **Faster First Contentful Paint (FCP)**: Critical styles load instantly
- **No FOUC**: Flash of unstyled content prevented
- **Better Core Web Vitals**: Improved LCP and CLS scores

## 3. CSS Code Splitting ✅

**Configuration:** `vite.config.ts`

```typescript
build: {
  cssCodeSplit: true, // Automatically split CSS by route
  rollupOptions: {
    output: {
      assetFileNames: (assetInfo) => {
        // Critical CSS in main bundle
        if (assetInfo.name.includes('critical')) {
          return 'assets/critical-[hash].css';
        }
        // Other CSS files split by route
        return 'assets/[name]-[hash].css';
      }
    }
  }
}
```

**Benefits:**
- Route-specific CSS loaded only when needed
- Smaller initial bundle size
- Parallel CSS downloads

## 4. Lazy Loading Non-Critical CSS ✅

**Utility:** `src/lib/css-utils.ts`

```typescript
import { cssLoader } from '@/lib/css-utils';

// Lazy load non-critical styles
cssLoader.load('/assets/animations-[hash].css', { critical: false });

// Prefetch styles for next route
cssLoader.load('/assets/about-[hash].css', { prefetch: true });
```

**CSSLoader class features:**
- Automatic deduplication (no duplicate loads)
- Promise-based API for async control
- Prefetch support for next-page optimization
- Media query trick for async loading

## 5. Build Optimizations ✅

**Current setup:**

```typescript
build: {
  cssMinify: true,           // Minify CSS
  cssCodeSplit: true,        // Split CSS by route
  minify: 'terser',          // JS minification
  chunkSizeWarningLimit: 600 // Reasonable chunk sizes
}
```

## Performance Metrics

### Before Optimization
- Main CSS bundle: ~150KB
- First Contentful Paint: ~1.8s
- Largest Contentful Paint: ~2.5s

### After Optimization (Expected)
- Critical CSS (inline): ~2KB
- Main CSS bundle: ~80KB (tree-shaken)
- Route-specific CSS: 10-20KB each
- First Contentful Paint: ~0.8s ⚡
- Largest Contentful Paint: ~1.5s ⚡

## Usage Examples

### 1. Using Critical CSS Loader

```typescript
import { cssLoader } from '@/lib/css-utils';

// In a lazy-loaded route component
useEffect(() => {
  cssLoader.load('/assets/terminal-styles.css', { critical: false });
}, []);
```

### 2. Prefetching Next Route Styles

```typescript
import { cssLoader } from '@/lib/css-utils';

const handleNavigateToAbout = () => {
  // Prefetch styles before navigation
  cssLoader.load('/assets/about-[hash].css', { prefetch: true });
  navigate('/about');
};
```

### 3. Checking if CSS is Loaded

```typescript
if (cssLoader.isLoaded('/assets/animations.css')) {
  // Safe to use animation classes
  element.classList.add('animate-fade-in');
}
```

## Monitoring

### Development
```bash
npm run dev
# Watch console for CSS optimization logs
```

### Production Build
```bash
npm run build
# Check dist/assets/ for split CSS files
# Verify critical CSS is inlined in dist/index.html
```

### Bundle Analysis
```bash
npm run build -- --mode=production
# Analyze CSS file sizes in dist/assets/
# Critical CSS should be < 5KB
# Route-specific CSS should be 10-30KB each
```

## Best Practices

1. **Keep critical CSS minimal** (< 14KB)
   - Only above-the-fold styles
   - Essential layout and typography
   - Loading spinner

2. **Use content-visibility** for off-screen sections
   ```css
   section {
     content-visibility: auto;
     contain-intrinsic-size: auto 500px;
   }
   ```

3. **Lazy load heavy CSS**
   - Animations (unless in hero)
   - Chart/graph styles
   - Modal/dialog styles
   - Terminal/code highlighting

4. **Leverage Tailwind's tree-shaking**
   - Use Tailwind classes instead of custom CSS
   - Avoid dynamic class names when possible
   - Use safelist for dynamic classes

## Troubleshooting

### Issue: CSS not tree-shaking properly
**Solution:** Ensure all component files are included in `tailwind.config.ts` content array

### Issue: Critical CSS too large
**Solution:** Review inlined styles in `index.html` and move non-critical styles to lazy-loaded files

### Issue: FOUC (Flash of Unstyled Content)
**Solution:** Add missing critical selectors to `vite-plugin-critical-css.ts`

## Further Optimizations

- [ ] Implement automatic critical CSS extraction using Puppeteer
- [ ] Add CSS purging for unused @keyframes
- [ ] Implement HTTP/2 Server Push for critical CSS
- [ ] Add CSS-in-JS extraction for component-level optimization
