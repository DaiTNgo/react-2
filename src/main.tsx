import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// const template = document.createElement("template");
// template.innerHTML = `
//   <style>
//   </style>
//   <div id="fpr-template">
//   </div>
//   <script></script>
// `;
//
// class FPRAudioAssessment extends HTMLElement {
//     constructor() {
//         super();
//     }
//
//     connectedCallback() {
//         this.attachShadow({mode: "open"});
//         // @ts-ignore
//         this.shadowRoot.appendChild(template.content.cloneNode(true));
//         //@ts-ignore
//         this.root = this.shadowRoot.querySelector('#fpr-template')
//         this.render();
//     }
//
//     render() {
//         // @ts-ignore
//         ReactDOM.createRoot(this.root as HTMLElement).render(
//             <React.StrictMode>
//                 <App/>
//             </React.StrictMode>
//         );
//     }
// }
//
// customElements.define("fpr-audio-assessment", FPRAudioAssessment);
//
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
