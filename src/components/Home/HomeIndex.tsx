import {
  addDoc,
  collection,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../utils/firebase";
import useClosedPullRequests, { PullRequest } from "../../hooks/utils";
import GlitchyLoader from "../Glitch";

export const HomeIndex = () => {
  const [dailyQuotes, dailyQuotesLoading, dailyQuotesError] = useCollection(
    query(collection(db, "daily-quotes"), where("active", "==", true))
  );
  const [dailyQuote, setDailyQuote] = useState("");
  const [pullRequests, pullRequestsLoading] = useClosedPullRequests(
    "timothyheadrick12",
    "shiki-no-journey"
  );

  useEffect(() => {
    if (dailyQuotes) {
      setDailyQuote(dailyQuotes.docs[0].data().entry);
    }
  }, [dailyQuotes]);

  return (
    <div className="w-full max-w-full min-h-screen p-4 pt-10 2xl:pl-[21.75rem] grid lg:grid-cols-home crt">
      <div className="text-center col-span-1 max-w-full bg-neutral-900/75 border-2 p-4 text-left border-blue-900/75 ring ring-red-900/50">
        {dailyQuotesLoading ? (
          <GlitchyLoader size={50} gap={5} count={5} />
        ) : (
          <>
            <h2 className="text-left">{dailyQuote}</h2>
            <hr />
          </>
        )}
      </div>
      <div className="grid-cols-none max-w-full sm:grid-cols-2 lg:grid-cols-none lg:col-start-2 col-span-1 lg:ml-4 grid grid-rows-2">
        <div className="sm:col-span-1 row-span-1 mt-4 lg:mt-0 mb-4 max-w-full bg-neutral-900/75 border-2 p-4 text-left  border-blue-900/75 ring ring-red-900/50">
          <h4>Rememberances</h4>
          <hr />
          {pullRequestsLoading ? (
            <GlitchyLoader size={25} gap={5} count={5} />
          ) : (
            pullRequests.map((pr, index) => {
              console.log(pr.title);
              return (
                <p key={index}>{`>(${pr.date.split("T")[0]}) ${pr.title}`}</p>
              );
            })
          )}
        </div>
        <div className="sm:col-span-1 row-span-1 ml-0 sm:ml-4 lg:ml-0  mt-0 sm:mt-4 lg:mt-0 mb-0 sm:mb-4 lg:mb-0 max-w-full bg-neutral-900/75 border-2 p-4 text-left  border-blue-900/75 ring ring-red-900/50">
          <h4>Visions</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};
