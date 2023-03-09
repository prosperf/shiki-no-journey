import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./styles/index.css";
import ErrorPage from "./ErrorPage";
import { StoryIndex } from "./Stories/StoryIndex";
import { store } from "./store";
import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";

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
    {/* <Provider store={store}> */}
    <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>
);
