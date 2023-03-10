import { animate, delay, motion, Variant } from "framer-motion";
import { useState } from "react";
import menuGlitchImage from "./assets/menuglitch.png";
import menuGlitchGif from "./assets/glitchmenu.gif";
import { ReactComponent as Close } from "./assets/close.svg";
import { useIsMd } from "./hooks/utils";
import { useNavigate } from "react-router-dom";
import { gridGenerator, scrambleArray } from "../utils/randomizers";

export const GlitchDiv = ({
  children,
  animateState,
  width,
  height,
  left,
  top,
  baseDelay,
}: {
  children: React.ReactNode;
  animateState: "opened" | "closed";
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  baseDelay?: number;
}) => {
  const isMedium = useIsMd();

  const boxVariant = isMedium
    ? {
        closed: {
          opacity: 0,
          transition: { duration: 0.1 },
        },
        opened: ({ x, y, delayMul }: any) => ({
          translateX: `${3.5 * x}rem`,
          translateY: `${3.5 * y}rem`,
          opacity: Math.floor(
            (((width ? width : 20) * (height ? height : 20)) /
              ((x + 1) * (y + 1))) *
              10 *
              Math.random()
          ),
          transition: {
            opacity: {
              repeat: Infinity,
              duration: Math.floor(
                Math.pow(
                  (((x + 1) * (y + 1)) /
                    ((width ? width : 20) * (height ? height : 20))) *
                    5,
                  2
                ) * Math.random()
              ),
              delay: delayMul * 0.01 + (baseDelay ? baseDelay : 0),
              type: "linear",
            },
            default: {
              delay: 0,
              type: "linear",
              duration: 0,
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
          opacity: Math.floor((25 / ((x + 1) * (y + 1))) * Math.random() * 20),
          transition: {
            opacity: {
              repeat: Infinity,
              duration: Math.floor(
                Math.pow(((x + 1) * (y + 1)) / 20, 2) * Math.random()
              ),
              delay: delayMul * 0.01 + (baseDelay ? baseDelay : 0),
              type: "linear",
            },
            default: {
              delay: 0,
              type: "linear",
              duration: 0,
            },
          },
        }),
      };

  const rootVariant = isMedium
    ? {
        closed: {
          width: "2rem",
          height: "2rem",
          translateX: left ? `${left * 3.5}rem` : "0rem",
          translateY: top ? `${top * 3.5}rem` : "0rem",
          transition: { type: "linear" },
        },
        opened: {
          width: width ? `${width * 3.5}rem` : "100vw",
          height: height ? `${height * 3.5}rem` : "100vh",
          translateX: left ? `${left * 3.5}rem` : "0rem",
          translateY: top ? `${top * 3.5}rem` : "0rem",
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

  return (
    <motion.div
      className="fixed left-0 top-0 w-8 h-8"
      animate={animateState}
      variants={rootVariant}
    >
      {gridGenerator(width ? width : 20, height ? height : 20, "corner").map(
        ({ x, y }, i) => (
          <motion.div
            className="absolute w-[21vw] sm:w-14 aspect-square left-0 top-0  bg-black opacity-0"
            variants={boxVariant}
            key={i}
            custom={{ x: x, y: y, delayMul: i }}
          />
        )
      )}
      {children}
    </motion.div>
  );
};
