import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Catalog from "./Catalog";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Catalog,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
