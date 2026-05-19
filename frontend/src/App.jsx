import React from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="App">
      <Toaster position="top-center"/>
      <AppRoutes/>
    </div>
  )
}

export default App
