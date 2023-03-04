import { animate, delay, motion, Variant } from "framer-motion";
import { useState } from "react";
import menuGlitchImage from "./assets/menuglitch.png";
import menuGlitchGif from "./assets/glitchmenu.gif";
import { ReactComponent as Close } from "./assets/close.svg";
import { useIsMd } from "./hooks/utils";

export const GlitchDiv = () => {
  const [animateState, setAnimateState] = useState("closed");
  const isMedium = useIsMd();
  const positions = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 2 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
    { x: 0, y: 2 },
    { x: 3, y: 1 },
    { x: 0, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
    { x: 1, y: 3 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 4, y: 2 },
    { x: 1, y: 4 },
    { x: 4, y: 4 },
    { x: 3, y: 4 },
    { x: 4, y: 1 },
    { x: 0, y: 4 },
    { x: 2, y: 4 },
    { x: 4, y: 3 },
    { x: 0, y: 5 },
    { x: 3, y: 5 },
    { x: 1, y: 6 },
    { x: 4, y: 5 },
    { x: 2, y: 6 },
    { x: 0, y: 6 },
    { x: 4, y: 6 },
    { x: 2, y: 5 },
    { x: 3, y: 6 },
    { x: 1, y: 5 },
    { x: 4, y: 8 },
    { x: 2, y: 7 },
    { x: 3, y: 8 },
    { x: 0, y: 7 },
    { x: 3, y: 7 },
    { x: 1, y: 8 },
    { x: 4, y: 7 },
    { x: 2, y: 8 },
    { x: 1, y: 7 },
    { x: 0, y: 8 },

    { x: 0, y: 9 },
    { x: 3, y: 9 },
    { x: 1, y: 10 },
    { x: 4, y: 9 },
    { x: 2, y: 10 },
    { x: 0, y: 10 },
    { x: 4, y: 10 },
    { x: 2, y: 9 },
    { x: 3, y: 10 },
    { x: 1, y: 9 },

    { x: 4, y: 12 },
    { x: 2, y: 11 },
    { x: 3, y: 12 },
    { x: 0, y: 11 },
    { x: 3, y: 11 },
    { x: 1, y: 12 },
    { x: 4, y: 11 },
    { x: 2, y: 12 },
    { x: 1, y: 11 },
    { x: 0, y: 12 },

    { x: 0, y: 14 },
    { x: 3, y: 14 },
    { x: 1, y: 13 },
    { x: 4, y: 14 },
    { x: 2, y: 13 },
    { x: 0, y: 13 },
    { x: 4, y: 13 },
    { x: 2, y: 14 },
    { x: 3, y: 13 },
    { x: 1, y: 14 },

    { x: 0, y: 15 },
    { x: 3, y: 15 },
    { x: 1, y: 16 },
    { x: 4, y: 15 },
    { x: 2, y: 16 },
    { x: 0, y: 16 },
    { x: 4, y: 16 },
    { x: 2, y: 15 },
    { x: 3, y: 16 },
    { x: 1, y: 15 },
  ];

  const boxVariant = isMedium
    ? {
        closed: {
          opacity: 0,
          transition: { duration: 0.1 },
        },
        opened: ({ x, y, delayMul }: any) => ({
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
      }
    : {
        closed: {
          opacity: 0,
          transition: { duration: 0.1 },
        },
        opened: ({ x, y, delayMul, blink }: any) => ({
          translateX: `${20 * x}vw`,
          translateY: `${20 * y}vw`,
          opacity: 1,
          transition: {
            opacity: {
              repeat: Infinity,
              duration: x * 0.005 * Math.random(),
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

  const rootVariant = isMedium
    ? {
        closed: {
          width: "2rem",
          height: "2rem",
          transition: { type: "linear" },
        },
        opened: {
          width: "17.5rem",
          height: "100vh",
          transition: {
            duration: 0,
          },
        },
      }
    : {
        closed: {
          width: "2rem",
          height: "2rem",
          transition: { type: "linear" },
        },
        opened: {
          width: "100vw",
          height: "100vh",
          transition: {
            duration: 0,
          },
        },
      };

  const closeVariant = {
    closed: {
      opacity: 0,
      pathLength: 0,
      strokeWidth: 0,
    },
    opened: {
      opacity: 1,
      pathLength: 1,
      strokeWidth: 1,
      transition: {
        opacity: { duration: 0, delay: 0.64 },
        pathLength: { delay: 0.64, duration: 0.5, ease: "easeInOut" },
        fill: { delay: 1.14 },
      },
    },
  };

  const itemParentVariant = {
    opened: {
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
    opened: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="absolute left-0 top-0 w-8 h-8 overflow-hidden"
      animate={animateState}
      variants={rootVariant}
    >
      {positions.map(({ x, y }, i) => (
        <motion.div
          className="absolute w-[21vw] sm:w-14 aspect-square top-0 left-0 bg-black opacity-0"
          variants={boxVariant}
          key={i}
          custom={{ x: x, y: y, delayMul: i }}
        />
      ))}
      <motion.div
        className="relative w-full h-full overflow-hidden"
        variants={itemParentVariant}
      >
        <motion.button
          variants={itemVariant}
          className="mt-20 m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
        >
          Hello Dog
        </motion.button>
        <motion.button
          variants={itemVariant}
          className="m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
        >
          Hello Dog
        </motion.button>
        <motion.button
          variants={itemVariant}
          className="m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
        >
          Hello Dog
        </motion.button>
      </motion.div>
      <motion.div className="absolute left-0 top-0 w-8 h-8 cursor-pointer">
        <img
          className="absolute left-0 top-0 w-8 h-8 cursor-pointer"
          src={animateState == "closed" ? menuGlitchImage : menuGlitchGif}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-white"
          width="100%"
          viewBox="0 0 48 48"
        >
          <motion.path
            variants={closeVariant}
            d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
          />
        </svg>
        <button
          className="absolute left-0 top-0 w-8 h-8 cursor-pointer"
          onClick={() => {
            setAnimateState(animateState == "closed" ? "opened" : "closed");
            console.log(animateState);
          }}
        />
      </motion.div>
    </motion.div>
  );
};
