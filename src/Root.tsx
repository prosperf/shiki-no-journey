import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatedPage } from "./AnimatedPage";
import { CommandPrompt } from "./CommandPrompt";
import { SideBar } from "./SideBar";

function Root() {
  const [showCommandPompt, setShowCommandPrompt] = useState(false);
  const [on, setOn] = useState(false);
  const location = useLocation();

  //listen for ctrl + alt + t
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      // on purpose (only one key in condition)
      if (e.ctrlKey && e.altKey && e.key === "t") {
        setShowCommandPrompt(true);
      }
    };
    document.addEventListener("keyup", onKeyUp);
    return () => {
      // document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div className="min-h-screen font-mono flex justify-center p-8  bg-stone-900 bg-shikinocliff bg-cover bg-fixed max-w-full">
      {showCommandPompt && (
        <CommandPrompt killFunction={() => setShowCommandPrompt(false)} />
      )}
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Root;
