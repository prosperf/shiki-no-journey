import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../utils/firebase";
import dompurify from "dompurify";
import { StoryContainer } from "./StoryContainer";
import { StoryCreator } from "./StoryCreator";
import { getAuth, User } from "firebase/auth";
import { useIdToken } from "react-firebase-hooks/auth";

export const StoryIndex = () => {
  const [stories, setStories] = useState([""]);
  const [showEditor, setShowEditor] = useState(false);
  const { storyId } = useParams();

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
                setShowEditor(true);
              }
            })
            .catch((error) => {
              console.log(error);
            })
        : new Promise((resolve) => resolve());
    },
  });

  useEffect(() => {
    getDocs(
      collection(db, "stories", "two-lilies-entertwined", "entries")
    ).then((data) => {
      setStories(data.docs.map((story) => story.data().body));
    });
  }, []);

  return (
    <div>
      {stories.map((story) => (
        <StoryContainer>
          <div
            dangerouslySetInnerHTML={{ __html: dompurify.sanitize(story) }}
          ></div>
        </StoryContainer>
      ))}

      {showEditor && <StoryCreator />}
    </div>
  );
};
