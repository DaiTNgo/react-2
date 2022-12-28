import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// const template = document.createElement("template");
// template.innerHTML = `
//   <style>
//   </style>
//   <script></script>
// `;
//
// export default class BuyTools extends HTMLElement {
//     constructor() {
//         super();
//         // @ts-ignore
//     }
//     connectedCallback() {
//         //@ts-ignore
//         // this.root =
//         this.attachShadow({ mode: "open" });
//         // @ts-ignore
//         this.shadowRoot.appendChild(template.content.cloneNode(true));
//         //@ts-ignore
//         this.render();
//
//         // @ts-ignore
//         // this.root.append(template.content.cloneNode(true));
//     }
//
//     render() {
//         // @ts-ignore
//         ReactDOM.createRoot(this.shadowRoot as HTMLElement).render(
//             <React.StrictMode>
//                 <App />
//             </React.StrictMode>
//         );
//     }
// }
//
// customElements.define("my-buy-tools", BuyTools);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
