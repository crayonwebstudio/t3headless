import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initUxisMotion() {
  if (typeof window === 'undefined') return;

  // Clean up previous instances on Astro view transitions
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Initialize Lenis smooth scroll (UXIS smooth scroll feel)
  lenisInstance = new Lenis({
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Reveal elements with [data-uxis-reveal]
  const revealElements = document.querySelectorAll<HTMLElement>('[data-uxis-reveal]');
  revealElements.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // Animate SVG Hairline dividers [data-draw-line]
  const lines = document.querySelectorAll<SVGLineElement>('line[data-draw-line]');
  lines.forEach((line) => {
    gsap.fromTo(
      line,
      { strokeDashoffset: 1600 },
      {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 94%',
          once: true,
        },
      }
    );
  });
}
