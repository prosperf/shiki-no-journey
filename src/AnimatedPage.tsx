//Broken attempt at animating page transitions. Not necessarily useful anyways with using router

import { AnimatePresence, motion } from "framer-motion";
import { gridGenerator } from "../utils/randomizers";

export const AnimatedPage = () => {
  const boxVariant = {
    initial: ({ x, y, delayMul }: any) => ({
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
          delay: delayMul * 0.01 + 0.6,
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
          delay: delayMul * 0.01 + 0.6,
          type: "linear",
          duration: 0.1,
        },
      },
    }),
  };

  const rootVariant = {
    animate: {
      width: "0rem",
      height: "0rem",
      transition: { type: "linear", duration: 5 },
    },
    initial: {
      width: "100vw",
      height: "100vh",
      transition: {
        duration: 0,
      },
    },
    exit: {
      width: "100vw",
      height: "100vh",
      transition: {
        duration: 0,
      },
    },
  };

  return (
    <motion.div
      className="absolute left-0 top-0 w-8 h-8 overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      key={Math.random()}
      variants={rootVariant}
    >
      {gridGenerator(20, 20, "corner").map(({ x, y }, i) => (
        <motion.div
          className="absolute w-[21vw] sm:w-14 aspect-square top-0 left-0 bg-black opacity-0 z-10"
          variants={boxVariant}
          key={i + Math.random()}
          custom={{ x: x, y: y, delayMul: i }}
        />
      ))}
    </motion.div>
  );
};
