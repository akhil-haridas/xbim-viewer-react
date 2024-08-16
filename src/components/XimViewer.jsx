import { LoaderOverlay, ViewType, Viewer } from "@xbim/viewer";
import React, { useCallback, useEffect, useRef } from "react";

const XimViewer = React.memo(({ modelPath }) => {
  const viewerRef = useRef(null);

  const initializeViewer = useCallback((model) => {
    const viewer = new Viewer("xBIM-viewer");
    var viewer2 = new Viewer("viewer2");
    const overlay = new LoaderOverlay();
    viewer.addPlugin(overlay);
    overlay.show();

    viewer.cameraProperties.fov = 53;
    viewer.background = [0, 0, 0, 0];
    viewer.hoverPickEnabled = true;

    viewer.load(model);
    // viewer.start();

    viewer.on("loaded", () => {
      viewer.show(ViewType.DEFAULT);
      overlay.hide();
    });

    viewer.on("error", (arg) => {
      var container = viewer.canvas.parentNode;
      if (container) {
        //preppend error report
        container.innerHTML =
          "<pre style='color:red;'>" +
          arg.message +
          "</pre>" +
          container.innerHTML;
      }
    });
  }, []);

  useEffect(() => {
    initializeViewer(modelPath);
  }, [initializeViewer, modelPath]);

  return (
    <div className="ViewerWrapper" ref={viewerRef}>
      <canvas id="xBIM-viewer"></canvas>
    </div>
  );
});

export default XimViewer;
