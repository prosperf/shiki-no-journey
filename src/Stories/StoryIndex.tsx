import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { app, auth, db } from "../../utils/firebase";
import dompurify from "dompurify";
import { StoryContainer } from "./StoryContainer";
import { StoryCreator } from "./StoryCreator";
import { getAuth, User } from "firebase/auth";
import { useIdToken } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { AnimatedPage } from "../AnimatedPage";

//NOTE: Need to catch when a story does not exist

export const StoryIndex = () => {
  //const [stories, setStories] = useState([""]);
  const [showEditor, setShowEditor] = useState(false);
  const { storyId } = useParams();
  const [stories, storiesLoading, storiesError] = useCollection(
    collection(db, "stories", storyId!, "entries")
  );

  useEffect(() => {
    if (stories && stories.empty)
      throw new Response("Not Found", { status: 404 });
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
    <div>
      {stories &&
        stories.docs.map((story, index) => (
          <StoryContainer key={index}>
            <div
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(story.data().body),
              }}
            ></div>
            {user && user.uid === story.data().users.owner && (
              <div className="text-right text-cold-red">
                REPLACE WITH EDIT BUTTON
              </div>
            )}
          </StoryContainer>
        ))}

      {showEditor && <StoryCreator />}
    </div>
  );
};
