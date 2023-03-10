import { animate, delay, motion, Variant } from "framer-motion";
import { useState } from "react";
import menuGlitchImage from "./assets/menuglitch.png";
import menuGlitchGif from "./assets/glitchmenu.gif";
import { ReactComponent as Close } from "./assets/close.svg";
import { useIsMd } from "./hooks/utils";
import { useNavigate } from "react-router-dom";
import { gridGenerator, scrambleArray } from "../utils/randomizers";
import { GlitchDiv } from "./GltichDiv";

export const SideBar = () => {
  const [animateState, setAnimateState] = useState<"closed" | "opened">(
    "closed"
  );
  const [window3, setWindow3] = useState<"closed" | "opened">("closed");
  const navigate = useNavigate();
  const isMedium = useIsMd();

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

  const tapShake = {
    translateX: isMedium ? "0.5rem" : 0,
    translateY: isMedium ? 0 : "0.5rem",
    rotate: 0.25,
    transition: {
      type: "spring",
      damping: 1,
      mass: 0.1,
      stiffness: 1000,
    },
  };

  //NOTE: NOT RESPONSIVE ENOUGH WORKS POORLY AT LOW ZOOM IE 4k
  return (
    <div>
      <GlitchDiv animateState={animateState} width={5} baseDelay={0.6}>
        <motion.div
          className="relative w-full h-full overflow-hidden justify-center text-center"
          variants={itemParentVariant}
        >
          <motion.button
            variants={itemVariant}
            className="mt-20 m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
            whileTap={{ scale: 1.1, transition: { type: "spring" } }}
            onClick={() => {
              navigate("/");
              setAnimateState("closed");
            }}
          >
            Hello Dog
          </motion.button>
          <motion.button
            variants={itemVariant}
            className="m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
            onClick={() => {
              navigate("stories/two-lilies-entertwined");
              setAnimateState("closed");
            }}
          >
            Hello Dog
          </motion.button>
          <motion.button
            variants={itemVariant}
            whileTap={tapShake}
            className="m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
            onClick={() =>
              setWindow3(window3 === "opened" ? "closed" : "opened")
            }
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
            }}
          />
        </motion.div>
      </GlitchDiv>
      {isMedium && (
        <GlitchDiv
          width={10}
          height={10}
          left={5}
          top={3.5}
          animateState={window3}
        >
          <></>
        </GlitchDiv>
      )}
    </div>
  );
};
