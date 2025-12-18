export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function smoothScrollTo(y: number, duration: number = 800) {
  if (typeof window === 'undefined') return;
  const startY = window.scrollY;
  const difference = y - startY;
  const startTime = performance.now();

  function step() {
    const progress = (performance.now() - startTime) / duration;
    const amount = (p: number) => {
      // easeOutCubic - starts fast, slows down at end
      return 1 - Math.pow(1 - p, 3);
    };

    if (progress < 1) {
      window.scrollTo(0, startY + difference * amount(progress));
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, y);
    }
  }

  step();
}
