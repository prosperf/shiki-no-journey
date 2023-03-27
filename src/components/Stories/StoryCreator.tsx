import { useState } from "react";
import ReactQuill from "react-quill";
import { StoryContainer } from "./StoryContainer";
import "../../styles/quill_override.css";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { auth, db } from "../../../utils/firebase";
import dompurify from "dompurify";
import { useAuthState } from "react-firebase-hooks/auth";

export const StoryCreator = () => {
  const [quillText, setQuillText] = useState("");
  const [storyDate, setStoryDate] = useState({ month: 0, day: 0, year: 0 });
  const [releaseDate, setReleaseDate] = useState({ month: 0, day: 0, year: 0 });
  const [releaseNow, setReleaseNow] = useState(true);
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
      date:
        storyDate.month !== 0 && storyDate.day !== 0
          ? new Date(storyDate.year, storyDate.month - 1, storyDate.day)
          : null,
      timestamp: serverTimestamp(),
      releaseDate:
        !releaseNow && releaseDate.month !== 0 && releaseDate.day !== 0
          ? new Date(releaseDate.year, releaseDate.month - 1, releaseDate.day)
          : Date.now(),
      users: {
        owner: user!.uid,
      },
    })
      .then((response) => {
        console.log(response);
        setQuillText("");
        setStoryDate({ month: 0, day: 0, year: 0 });
        setReleaseDate({ month: 0, day: 0, year: 0 });
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
        <label>Story Date:</label>
        <label className="m-5">
          month
          <select
            className="bg-black"
            value={storyDate.month}
            onChange={(e) =>
              setStoryDate({ ...storyDate, month: Number(e.target.value) })
            }
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
            value={storyDate.day}
            onChange={(e) =>
              setStoryDate({ ...storyDate, day: Number(e.target.value) })
            }
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
            className="bg-transparent w-[4rem]"
            name="year"
            type="number"
            value={storyDate.year}
            onChange={(e) =>
              setStoryDate({ ...storyDate, year: Number(e.target.value) })
            }
          />
        </label>
        <br />

        <label>Release Date:</label>
        <label className="m-5">
          month
          <select
            className="bg-black"
            value={releaseDate.month}
            disabled={releaseNow}
            onChange={(e) =>
              setReleaseDate({ ...releaseDate, month: Number(e.target.value) })
            }
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
            value={releaseDate.day}
            disabled={releaseNow}
            onChange={(e) =>
              setReleaseDate({ ...releaseDate, day: Number(e.target.value) })
            }
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
            className="bg-transparent w-[4rem]"
            name="year"
            type="number"
            disabled={releaseNow}
            value={releaseDate.year}
            onChange={(e) =>
              setReleaseDate({ ...releaseDate, year: Number(e.target.value) })
            }
          />
        </label>
        <label className="m-5">
          {"release now "}
          <input
            className="accent-cold-red"
            name="release now"
            type="checkbox"
            checked={releaseNow}
            onChange={(e) => setReleaseNow(!releaseNow)}
          />
        </label>
        <button className="hover:text-cold-red" type="submit">
          Submit
        </button>
      </form>
    </StoryContainer>
  );
};
