//This should be mostly refactored as it is in a messy state currently.

import { animate, delay, motion, Variant } from "framer-motion";
import { useEffect, useState } from "react";
import menuGlitchImage from "./assets/menuglitch.png";
import menuGlitchGif from "./assets/glitchmenu.gif";
import { useIsMd } from "./hooks/utils";
import { useNavigate } from "react-router-dom";
import { GlitchDiv } from "./GltichDiv";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { AiOutlinePlus } from "react-icons/ai";
import { useIdToken } from "react-firebase-hooks/auth";

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

export const SideBar = () => {
  const [animateState, setAnimateState] = useState<"closed" | "opened">(
    "closed"
  );
  const [navMenuStoriesOn, setNavMenuStoriesOn] = useState(false);
  const [showAddStoryButton, setShowAddStoryButton] = useState(false);
  const [stories, storiesLoading, storiesError] = useCollection(
    collection(db, "stories")
  );

  const isMedium = useIsMd();

  const navigate = useNavigate();

  //Tracks user sign in status and if user is an admin or not
  useIdToken(auth, {
    onUserChanged: (user) => {
      return user
        ? user
            .getIdTokenResult()
            .then((idTokenResult) => {
              // Confirm the user is an Admin.
              if (!!idTokenResult.claims.admin) {
                // Show admin UI.
                setShowAddStoryButton(true);
              }
            })
            .catch((error) => {
              console.log(error);
            })
        : new Promise((resolve) => resolve());
    },
  });

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

  const itemParentVariant = {
    opened: {
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const closeAllNavMenus = () => {
    setNavMenuStoriesOn(false);
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
            whileTap={tapShake}
            className="mt-20 m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
            onClick={() => {
              closeAllNavMenus();
              navigate("/");
            }}
          >
            Home
          </motion.button>
          <>
            <motion.button
              variants={itemVariant}
              whileTap={tapShake}
              className="m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
              onClick={() => setNavMenuStoriesOn(!navMenuStoriesOn)}
            >
              Stories
            </motion.button>
            {stories && (
              <NavMenu
                links={stories.docs.map((story) => ({
                  route: `/stories/${story.id}`,
                  name: story.data().title,
                }))}
                enabled={navMenuStoriesOn}
                setEnabled={setNavMenuStoriesOn}
                tailElement={
                  showAddStoryButton && (
                    <motion.button
                      variants={itemVariant}
                      whileTap={tapShake}
                      className="m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
                    >
                      <div className="flex justify-center">
                        <AiOutlinePlus className="m-2" />
                      </div>
                    </motion.button>
                  )
                }
              />
            )}
          </>
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
            className="fixed left-0 top-0 w-8 h-8 cursor-pointer"
            onClick={() => {
              setAnimateState(animateState == "closed" ? "opened" : "closed");
              closeAllNavMenus();
            }}
          />
        </motion.div>
      </GlitchDiv>
    </div>
  );
};

export const NavMenu = ({
  links,
  enabled,
  setEnabled,
  tailElement,
}: {
  links: { route: string; name?: string }[];
  enabled: boolean;
  setEnabled: (x: boolean) => void;
  tailElement?: React.ReactNode;
}) => {
  const isMedium = useIsMd();

  const navigate = useNavigate();

  const itemParentVariant = {
    opened: {
      transition: {
        delayChildren: 0,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      {isMedium && (
        <GlitchDiv
          width={5}
          height={10}
          left={5}
          top={2.25}
          animateState={enabled ? "opened" : "closed"}
        >
          <motion.div
            className="relative w-full h-full overflow-hidden justify-center text-center"
            variants={itemParentVariant}
          >
            {links.map((link, index) => {
              return (
                <motion.button
                  variants={itemVariant}
                  className="m-4 bg-black/10 hover:bg-gray-300/10 w-4/6 border-solid border-white border-2"
                  onClick={() => {
                    setEnabled(false);
                    navigate(link.route);
                  }}
                  key={`NavMenu-${index}`}
                >
                  {link.name ?? link.route}
                </motion.button>
              );
            })}
            {tailElement}
          </motion.div>
        </GlitchDiv>
      )}
    </div>
  );
};
