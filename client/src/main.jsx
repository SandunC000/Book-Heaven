import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

import App from "./App.jsx"
import BookEdit from "./components/BookEdit.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>/</div>,
  },
  {
    path: "/bookedit/:bookId",
    element: <BookEdit />,
    errorElement: <div>book error</div>,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
