import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import dompurify from "dompurify";
import { StoryContainer } from "./StoryContainer";
import { StoryCreator } from "./StoryCreator";

export const StoryIndex = () => {
  const [story, setStory] = useState({ date: "", body: "" });

  useEffect(() => {
    getDocs(
      collection(db, "stories", "two-lilies-entertwined", "entries")
    ).then((data) => {
      setStory({
        date: data.docs[0].data().date,
        body: data.docs[0].data().body,
      });
    });
  }, []);
  const { storyId } = useParams();

  return (
    <div>
      <StoryContainer>
        <h1>{story.date}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: dompurify.sanitize(story.body) }}
        />
      </StoryContainer>
      <StoryCreator />
    </div>
  );
};
