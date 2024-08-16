import React, { useEffect } from "react";

import { Viewer } from "@xbim/viewer";

const Sidebar = () => {

  useEffect(() => {
    const viewer2 = new Viewer("viewer2");
    var sync = () => {
      viewer2.mvMatrix = viewer2.mvMatrix;
      window.requestAnimationFrame(sync);
    };
    window.requestAnimationFrame(sync);
    viewer2.loadAsync('../assets/sample.wexbim');
    viewer2.on('loaded', () => {
      viewer2.start();
    });
  }, [])

  return (
    <div className="SideBarWrapper">
      <div className="ContentWrapper"></div>
      <div className="SmallView">
        <div
          style={{ position: "absolute", left: 0, bottom: 0, width: 400, height: 200 }}
        >
          <canvas id="viewer2" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
