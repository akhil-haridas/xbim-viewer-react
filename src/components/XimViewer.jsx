import { LoaderOverlay, ViewType, Viewer } from "@xbim/viewer";
import React, { useCallback, useEffect, useRef } from "react";

const XimViewer = React.memo(({ modelPath }) => {
  const viewerRef = useRef(null);

  const initializeViewer = useCallback((model) => {
    const viewer = new Viewer("xBIM-viewer");
    const viewer2 = new Viewer("viewer2");
    const overlay = new LoaderOverlay();
    viewer.addPlugin(overlay);
    overlay.show();

    viewer.cameraProperties.fov = 53;
    viewer.background = [0, 0, 0, 0];
    viewer.hoverPickEnabled = true;

    var sync = () => {
      viewer2.mvMatrix = viewer.mvMatrix;
      window.requestAnimationFrame(sync);
    };
    window.requestAnimationFrame(sync);
    
    viewer.load(model);
    viewer2.loadAsync(model);

    viewer.on('loaded', () => {
      viewer.start();
      viewer2.start();
      overlay.hide();
      viewer.show(ViewType.DEFAULT, undefined, undefined, false);
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
      <div
        style={{ position: "absolute", left: 0, bottom: 0, width: 400, height: 200 }}
      >
        <canvas id="viewer2" />
      </div>
    </div>
  );
});

export default XimViewer;
