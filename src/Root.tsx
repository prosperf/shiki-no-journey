import { useState } from "react";
import { Outlet } from "react-router-dom";
import { GlitchDiv } from "./GlitchDiv";

function Root() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen font-mono flex items-center justify-center text-center p-8 text-white/[.9] bg-stone-900 bg-shikinocliff bg-cover max-w-full">
      <GlitchDiv />
      <Outlet />
    </div>
  );
}

export default Root;
