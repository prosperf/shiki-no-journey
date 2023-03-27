import { collection, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../../utils/firebase";
import dompurify from "dompurify";
import { StoryContainer } from "./StoryContainer";
import { StoryCreator } from "./StoryCreator";
import { useIdToken } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { StoryReleaseCountdown } from "./StoryReleaseCountdown";

export const StoryIndex = () => {
  const currentDateRef = useRef(new Date());
  const [showEditor, setShowEditor] = useState(false);
  const { storyId } = useParams();
  const [entries, entriessLoading, entriesError] = useCollection(
    query(
      collection(db, "stories", storyId!, "entries"),
      where("releaseDate", "<=", currentDateRef.current)
    )
  );
  const [stories, storiesLoading, storiesError] = useCollection(
    collection(db, "stories")
  );
  const [upcomingReleaseDate, setUpcomingReleaseDate] = useState<Date>();

  useEffect(() => {
    if (stories && stories.docs.findIndex((doc) => doc.id === storyId) === -1)
      throw new Response("Story Not Found", { status: 404 });

    if (stories) {
      let releaseDates = stories.docs
        .find((doc) => doc.id === storyId)
        ?.data()
        .releaseDates.map((releaseDate: Timestamp) => releaseDate.toDate());
      if (releaseDates.length !== 0) {
        let upcomingReleaseDate = releaseDates.find(
          (date: Date) => date > currentDateRef.current
        );
        if (upcomingReleaseDate) setUpcomingReleaseDate(upcomingReleaseDate);
      }
    }
  }, [stories]);

  //Tracks user sign in status and if user is an admin or not
  const [user] = useIdToken(auth, {
    onUserChanged: (user) => {
      return user
        ? user
            .getIdTokenResult()
            .then((idTokenResult) => {
              // Confirm the user is an Admin.
              if (!!idTokenResult.claims.admin) {
                // Show admin UI.
                setShowEditor(true);
              }
            })
            .catch((error) => {
              console.log(error);
            })
        : new Promise((resolve) => resolve());
    },
  });

  return (
    <div className="flex flex-col items-center justify-center p-8 font-mono">
      {entries &&
        entries.docs.map((entry, index) => (
          <StoryContainer key={index}>
            <div
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(entry.data().body),
              }}
            ></div>
            {user && user.uid === entry.data().users.owner && (
              <div className="text-right text-cold-red">
                REPLACE WITH EDIT BUTTON
              </div>
            )}
          </StoryContainer>
        ))}

      {showEditor && <StoryCreator />}
      {upcomingReleaseDate && (
        <StoryReleaseCountdown
          secondsUntilRelease={Math.floor(
            (upcomingReleaseDate.getTime() - currentDateRef.current.getTime()) /
              1000
          )}
        />
      )}
    </div>
  );
};
