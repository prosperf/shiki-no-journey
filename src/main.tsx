import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./styles/index.css";
import ErrorPage from "./ErrorPage";
import { StoryIndex } from "./Stories/StoryIndex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/stories/:storyId",
        element: <StoryIndex />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
