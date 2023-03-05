import { useState } from "react";
import ReactQuill from "react-quill";
import { StoryContainer } from "./StoryContainer";
import "../styles/quill_override.css";

export const StoryCreator = () => {
  const [value, setValue] = useState("");

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

  return (
    <StoryContainer>
      <ReactQuill
        value={value}
        onChange={setValue}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </StoryContainer>
  );
};
