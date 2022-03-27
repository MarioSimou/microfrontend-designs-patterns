import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.registerMicroApp({
  mount: () => {
    const container = document.querySelector("#container");
    ReactDOM.render(<App />, container);
  },
  unmount: () => {
    const container = document.querySelector("#container");
    ReactDOM.unmountComponentAtNode(container);
  },
});
