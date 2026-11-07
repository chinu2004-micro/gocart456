'use client';

import * as React from 'react';
import { motion } from 'motion/react';

interface AnimatedSectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AnimatedSectionHeading({
  subtitle,
  title,
  description,
  action,
}: AnimatedSectionHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#ECE8E0] dark:border-[#16363F] pb-4">
      <div>
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#1E8C9B] dark:bg-[#D9B65F]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1E8C9B] dark:text-[#D9B65F]">
              {subtitle}
            </span>
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl font-bold font-serif text-[#0E4A57] dark:text-white tracking-tight"
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-1 text-xs text-[#727B83] dark:text-[#A2AAB0]"
          >
            {description}
          </motion.p>
        )}
      </div>

      {action && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="shrink-0"
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}

