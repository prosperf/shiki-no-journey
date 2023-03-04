import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebase";
import dompurify from "dompurify";

export const Story = () => {
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
      <h1>{story.date}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: dompurify.sanitize(story.body) }}
      />
    </div>
  );
};
