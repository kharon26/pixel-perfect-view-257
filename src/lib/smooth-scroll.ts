/**
 * Ultra-refined, distance-aware, interruptible smooth scrolling engine.
 * Tailored for high-end editorial portfolios (Apple-grade fluid motion).
 *
 * Characteristics:
 * - Soft pickup (gentle initial slope, no sudden acceleration or jerk)
 * - Controlled continuous travel (readable page, moderate peak velocity)
 * - Gentle feathery landing (asymptotically settles into destination without snapping, bouncing, or correcting)
 * - Distance-aware duration scaling (short jumps ~580–620ms, long journeys ~980–1180ms, mobile ~520–950ms)
 * - Comprehensive user interruptibility (wheel, touch, pointer, keys)
 * - Zero layout thrashing (all target geometry evaluated once at start, pure write-only rAF loop)
 */

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  function sampleCurveX(t: number) {
    return ((ax * t + bx) * t + cx) * t;
  }
  function sampleCurveY(t: number) {
    return ((ay * t + by) * t + cy) * t;
  }
  function sampleCurveDerivativeX(t: number) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function solveCurveX(x: number) {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const x2 = sampleCurveX(t) - x;
      if (Math.abs(x2) < 1e-5) return t;
      const d2 = sampleCurveDerivativeX(t);
      if (Math.abs(d2) < 1e-5) break;
      t = t - x2 / d2;
    }
    return t;
  }

  return (x: number) => sampleCurveY(solveCurveX(x));
}

// Tuned Apple-grade easing:
// Soft pickup at start (first 10% ramps gently), continuous mid-flight, ultra-soft landing (y: 0.975 at t=0.8, settling smoothly into 1.0)
const easeApple = cubicBezier(0.24, 0.12, 0.22, 1.0);

let activeAnimationId: number | null = null;
let activeCleanup: (() => void) | null = null;
let isSmoothScrollingFlag = false;

export function isSmoothScrolling(): boolean {
  return isSmoothScrollingFlag;
}

export interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  onComplete?: () => void;
}

export function cancelSmoothScroll() {
  if (activeAnimationId !== null) {
    cancelAnimationFrame(activeAnimationId);
    activeAnimationId = null;
  }
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }
  isSmoothScrollingFlag = false;
}

/**
 * Distance-aware duration calculator:
 * Short jump (200–500px): ~540–640ms
 * Medium jump (1000–2500px): ~720–880ms
 * Long jump (3500–6000px): ~960–1180ms
 * Mobile: ~460–950ms (slightly snappier for thumb interaction)
 */
function calculateDuration(distance: number, isMobile: boolean): number {
  const absDist = Math.abs(distance);
  if (isMobile) {
    return Math.min(950, Math.max(460, Math.round(420 + Math.sqrt(absDist) * 6.8)));
  }
  return Math.min(1180, Math.max(520, Math.round(480 + Math.sqrt(absDist) * 8.2)));
}

export function smoothScrollToY(targetY: number, options: SmoothScrollOptions = {}) {
  if (typeof window === "undefined") return;

  // Immediately cancel any previous animation
  cancelSmoothScroll();

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const startY = window.scrollY;
  const clampedTargetY = Math.max(0, Math.round(targetY));
  const distance = clampedTargetY - startY;

  // If already at destination, complete immediately with zero movement
  if (Math.abs(distance) < 2) {
    options.onComplete?.();
    return;
  }

  // Instant positioning for users with reduced motion preferences
  if (prefersReducedMotion) {
    window.scrollTo(0, clampedTargetY);
    options.onComplete?.();
    return;
  }

  const isMobile = window.innerWidth < 768;
  const duration = options.duration ?? calculateDuration(distance, isMobile);
  const startTime = performance.now();
  isSmoothScrollingFlag = true;

  // User Interruptibility: wheel, touchstart, touchmove, pointerdown, or scroll keys cancel immediately
  const handleInterrupt = (e?: Event) => {
    // For keydown, only cancel on actual scroll keys
    if (e instanceof KeyboardEvent) {
      const scrollKeys = [
        "Space",
        "PageUp",
        "PageDown",
        "End",
        "Home",
        "ArrowUp",
        "ArrowDown",
        "Escape",
      ];
      if (!scrollKeys.includes(e.code) && !scrollKeys.includes(e.key)) {
        return;
      }
    }
    cancelSmoothScroll();
  };

  const cleanup = () => {
    window.removeEventListener("wheel", handleInterrupt, { passive: true } as any);
    window.removeEventListener("touchstart", handleInterrupt, { passive: true } as any);
    window.removeEventListener("touchmove", handleInterrupt, { passive: true } as any);
    window.removeEventListener("pointerdown", handleInterrupt, { passive: true } as any);
    window.removeEventListener("keydown", handleInterrupt, { passive: true } as any);
    activeCleanup = null;
  };

  window.addEventListener("wheel", handleInterrupt, { passive: true });
  window.addEventListener("touchstart", handleInterrupt, { passive: true });
  window.addEventListener("touchmove", handleInterrupt, { passive: true });
  window.addEventListener("pointerdown", handleInterrupt, { passive: true });
  window.addEventListener("keydown", handleInterrupt, { passive: true });
  activeCleanup = cleanup;

  // Pure write-only rAF loop (0 layout thrashing during scroll)
  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const easedProgress = easeApple(progress);

    const currentY = Math.round(startY + distance * easedProgress);
    window.scrollTo(0, currentY);

    if (progress < 1) {
      activeAnimationId = requestAnimationFrame(step);
    } else {
      activeAnimationId = null;
      isSmoothScrollingFlag = false;
      // Ensure landing matches exact coordinate with zero pixel error
      window.scrollTo(0, clampedTargetY);
      cleanup();
      options.onComplete?.();
    }
  };

  activeAnimationId = requestAnimationFrame(step);
}

export function smoothScrollToElement(
  target: HTMLElement | string,
  options: SmoothScrollOptions = {}
) {
  if (typeof window === "undefined") return;

  const el = typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;

  // Pre-calculate target destination once before animation begins
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  const scrollMarginTop = parseFloat(style.scrollMarginTop) || 0;
  const defaultNavOffset = window.innerWidth < 768 ? 64 : 80;
  const effectiveOffset =
    options.offset ?? (scrollMarginTop > 0 ? scrollMarginTop : defaultNavOffset);

  const targetY = Math.max(
    0,
    Math.round(window.scrollY + rect.top - effectiveOffset)
  );

  smoothScrollToY(targetY, options);
}
