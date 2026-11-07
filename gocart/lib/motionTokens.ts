export const motionTokens = {
  duration: {
    fast: 0.12,
    normal: 0.2,
    slow: 0.32,
    deliberate: 0.5,
  },
  ease: {
    entrance: [0.22, 1, 0.36, 1],
    exit: [0.65, 0, 0.35, 1],
    smooth: [0.16, 1, 0.3, 1],
  },
  spring: {
    snappy: { type: 'spring', stiffness: 400, damping: 30 },
    gentle: { type: 'spring', stiffness: 200, damping: 25 },
    bouncy: { type: 'spring', stiffness: 300, damping: 15 },
  },
} as const;

export const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.slow, ease: motionTokens.ease.entrance },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: motionTokens.duration.fast, ease: motionTokens.ease.exit },
  },
};

export const staggerContainer = (staggerChildren = 0.08) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: 0.05,
    },
  },
});

