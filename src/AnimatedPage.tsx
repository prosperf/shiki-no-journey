import { motion } from "framer-motion";
import { gridGenerator } from "../utils/randomizers";

export const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  const boxVariant = {
    initial: ({ x, y, delayMul }: any) => ({
      x: `${3.5 * x}rem`,
      y: `${3.5 * y}rem`,
      opacity: 1,
      transition: {
        opacity: {
          repeat: Infinity,
          duration: x * 0.012 * Math.random(),
          delay: 0.6,
        },
        default: {
          delay: x * 0.01 + 0.6,
          type: "linear",
          duration: 0.1,
        },
      },
    }),
    animate: ({ x, y, delayMul }: any) => ({
      opacity: 0,
      transition: {
        delay: (20 - delayMul / 20) * 0.1 + 0.6,
        type: "linear",
        duration: 0,
      },
    }),
    exit: ({ x, y, delayMul }: any) => ({
      translateX: `${3.5 * x}rem`,
      translateY: `${3.5 * y}rem`,
      opacity: 1,
      transition: {
        opacity: {
          repeat: Infinity,
          duration: x * 0.012 * Math.random(),
          delay: 0.6,
        },
        default: {
          delay: delayMul * 0.1 + 0.6,
          type: "linear",
          duration: 0.1,
        },
      },
    }),
  };

  return (
    <motion.div
      className="w-screen h-screen"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {gridGenerator(20, 20, "corner").map(({ x, y }, i) => (
        <motion.div
          className="absolute w-[21vw] sm:w-14 aspect-square top-0 left-0 bg-black opacity-0 z-10"
          variants={boxVariant}
          key={i}
          custom={{ x: x, y: y, delayMul: i }}
        />
      ))}
      {children}
    </motion.div>
  );
};
