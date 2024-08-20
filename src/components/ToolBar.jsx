import { State, ViewType } from "@xbim/viewer";

import React from "react";

const ToolBar = () => {
  return (
    <div className="ToolBarWrapper">
      <button onClick={() => {
        window.viewer.navigationMode = 'orbit'
      }}>Orbit</button>
      <button onClick={() => {
        window.viewer.navigationMode = 'free-orbit'
      }}>Free Orbit</button>
      <button onClick={() => {
        window.viewer.navigationMode = 'pan'
      }}>Pan</button>
      <button onClick={() => {
        window.viewer.navigationMode = 'zoom'
      }}>Zoom</button>
      <button onClick={() => {
        window.viewer.navigationMode = 'look-around'
      }}>Look Around</button>
      <button onClick={() => {
        window.viewer.navigationMode = 'walk'
      }}>Walk</button>
      <button onClick={() => {
        window.viewer.show(ViewType.DEFAULT)
      }}>Deafult</button>
      <button onClick={() => {
        const elements = window.viewer.getProductsWithState(State.HIGHLIGHTED);
        window.viewer.zoomTo(elements);
      }}>Zoom to Selection</button>
      <button onClick={() => {
        window.plane.stopped = false;
      }}>Clip Model</button>
      <button onClick={() => {
        window.viewer.unclip();
        window.plane.stopped = true;
      }}>Reset Clipping</button>
    </div>
  );
};

export default ToolBar;
