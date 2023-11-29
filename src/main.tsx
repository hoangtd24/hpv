import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import SurveyContextProvider from "./context/UserContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SurveyContextProvider>
          <App />
      </SurveyContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
