import { useState } from "react";
import ReactQuill from "react-quill";
import { StoryContainer } from "./StoryContainer";
import "../styles/quill_override.css";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { auth, db } from "../../utils/firebase";
import dompurify from "dompurify";
import { useAuthState } from "react-firebase-hooks/auth";

export const StoryCreator = () => {
  const [quillText, setQuillText] = useState("");
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(0);
  const [year, setYear] = useState(0);
  const { storyId } = useParams();
  const [user] = useAuthState(auth);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
  ];

  const onFormSubmit = (e: any) => {
    addDoc(collection(db, "stories", storyId!, "entries"), {
      body: dompurify.sanitize(quillText),
      date: month !== 0 && day !== 0 ? new Date(year, month - 1, day) : null,
      timestamp: serverTimestamp(),
      users: {
        owner: user!.uid,
      },
    })
      .then((response) => {
        console.log(response);
        setQuillText("");
        setDay(0);
        setMonth(0);
        setYear(0);
      })
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
  };

  return (
    <StoryContainer>
      <ReactQuill
        value={quillText}
        onChange={setQuillText}
        theme="snow"
        modules={modules}
        formats={formats}
      />
      <form className="bg-transparent" onSubmit={onFormSubmit}>
        <label className="m-5">
          month
          <select
            className="bg-black"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
              <option key={`month-option-${value}`} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="m-5">
          day
          <select
            className="bg-black"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
          >
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ].map((value) => (
              <option key={`day-option-${value}`} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="m-5">
          {"year "}
          <input
            className="bg-transparent w-max-xs"
            name="year"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </label>
        <button className="hover:text-cold-red" type="submit">
          Submit
        </button>
      </form>
    </StoryContainer>
  );
};
