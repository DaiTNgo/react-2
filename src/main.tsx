import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import img1 from "./assets/img/img1.jpg";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
        <img src={img1} />
    </React.StrictMode>
);
