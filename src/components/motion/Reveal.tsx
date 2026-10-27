"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { dur, ease } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Entrada al aparecer en pantalla (una sola vez). */
export function Reveal({ delay = 0, y = 24, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: dur.reveal, ease: ease.reveal, delay }}
      {...props}
    />
  );
}
