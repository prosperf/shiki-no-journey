//Written with ChatGPT-3.5
//Modified by: @timothyheadrick12

import { motion, useAnimation, AnimationControls } from "framer-motion";
import React, { useEffect } from "react";

interface Props {
  size: number;
  gap: number;
  count: number;
}

//description: A glitchy loader component
//params: size: number, gap: number, count: number
const GlitchyLoader: React.FC<Props> = ({ size, gap, count }) => {
  const artifacts: JSX.Element[] = [];

  for (let i = 0; i < count; i++) {
    artifacts.push(
      <motion.div
        key={i}
        style={{
          width: size,
          height: size,
          margin: gap / 2,
          background: "#000",
          opacity: 1,
        }}
        animate={{
          x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
          y: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
        }}
        transition={{
          duration: Math.random() * 1.5 + 0.5,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    );
  }

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [1, 0.5, 0.7, 0.4, 0.5, 1],
      transition: { duration: 1.5, repeat: Infinity, repeatType: "mirror" },
    });
  }, [controls]);

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
      animate={controls}
    >
      {artifacts}
    </motion.div>
  );
};

export default GlitchyLoader;
