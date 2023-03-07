import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CommandPrompt } from "./CommandPrompt";
import { GlitchDiv } from "./GlitchDiv";

function Root() {
  const [showCommandPompt, setShowCommandPrompt] = useState(false);

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
    <div className="h-screen font-mono flex items-center justify-center text-center p-8  bg-stone-900 bg-shikinocliff bg-cover max-w-full">
      {showCommandPompt && (
        <CommandPrompt killFunction={() => setShowCommandPrompt(false)} />
      )}
      <GlitchDiv />
      <Outlet />
    </div>
  );
}

export default Root;
