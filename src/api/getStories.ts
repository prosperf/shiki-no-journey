import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../utils/firebase";

export const getStories = async () => {
  setDoc(doc(db, "stories", ""), {});
};
