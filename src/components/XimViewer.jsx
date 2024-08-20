import { Grid, InteractiveClippingPlane, LoaderOverlay, MessageProgress, NavigationCube, PerformanceRating, State, ViewType, Viewer } from "@xbim/viewer";
import React, { useCallback, useEffect, useRef } from "react";

const XimViewer = React.memo(({ modelPath }) => {
  const viewerRef = useRef(null);

  const initializeViewer = useCallback((model) => {
    const viewer = new Viewer("xBIM-viewer");
    window.viewer = viewer
    const viewer2 = new Viewer("viewer2");
    const overlay = new LoaderOverlay();
    viewer.addPlugin(overlay);
    overlay.show();

    viewer.readerOptions.orderGeometryBySize = true;
    viewer.cameraProperties.fov = 53;
    viewer.background = [0, 0, 0, 0];
    viewer.hoverPickEnabled = true;
    viewer.highlightingColour = [0, 0, 225, 200];
    var grid = new Grid();
    window.grid = grid
    grid.zFactor = 20;
    grid.colour = [0, 0, 0, 0.8];
    viewer.addPlugin(grid);

    var cube = new NavigationCube();
    window.cube = cube
    cube.ratio = 0.05;
    cube.passiveAlpha = cube.activeAlpha = 1.0;
    cube.minSize = 150;
    viewer.addPlugin(cube);

    var plane = new InteractiveClippingPlane();
    window.plane = plane
    viewer.addPlugin(plane);

    viewer.defineStyle(0, [255, 0, 0, 255]);  //red
    viewer.defineStyle(1, [0, 0, 255, 100]);  //semitransparent blue
    viewer.defineStyle(2, [255, 255, 255, 255]); //white

    var sync = () => {
      viewer2.mvMatrix = viewer.mvMatrix;
      window.requestAnimationFrame(sync);
    };
    window.requestAnimationFrame(sync);

    var progress = document.getElementById("progress");
    var versionSpan = document.getElementById("webglVersion");
    versionSpan.innerHTML = viewer.glVersion.toString();
    viewer.load(model);
    viewer2.loadAsync(model, "base", null, (msg) => {
      progress.innerHTML = `[${MessageProgress(msg).toFixed(2)}%] ${msg.message}`;
    });

    viewer.on('loaded', () => {
      viewer.start();
      viewer2.start();
      overlay.hide();
      viewer.show(ViewType.DEFAULT, undefined, undefined, false);
    });

    viewer.on("pick", (arg) => {
      var span = document.getElementById("ids");
      span.innerHTML = `Product id: ${arg.id}, model: ${arg.model}`;

      if (arg && arg.xyz) {
        var span = document.getElementById("coords");
        const c = arg.xyz;
        span.innerHTML = `Click in 3D: [${c[0].toFixed(2)}, ${c[1].toFixed(2)}, ${c[2].toFixed(2)}]`;
      }

      var state = viewer.getState(arg.id, arg.model);
      if (state === State.HIGHLIGHTED) {
        viewer.removeState(State.HIGHLIGHTED, [arg.id], arg.model);
      } else {
        viewer.addState(State.HIGHLIGHTED, [arg.id], arg.model);
      }
    });

    viewer.on("hoverpick", (arg) => {

      var span = document.getElementById("hoverid");

      if (arg && arg.id) {
        span.innerHTML = `Product id: ${arg.id}, model: ${arg.model}`;
        if (arg.xyz) {
          var span = document.getElementById("hovercoords");
          const c = arg.xyz;
          span.innerHTML = `[${c[0].toFixed(2)}, ${c[1].toFixed(2)}, ${c[2].toFixed(2)}]`;
        }
      } else {
        span.innerHTML = "";
      }

    });

    viewer.on("dblclick", (arg) => {
      viewer.addState(State.HIDDEN, [arg.id], arg.model);
    });
    viewer.on("fps", (fps) => {
      var span = document.getElementById("fps");
      if (span) {
        span.innerText = `${fps}, performance: ${PerformanceRating[viewer.performance]}`;
      }
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

    viewer.on('navigationEnd', () => {
      cube.stopped = true;
      let d = document.getElementById('snapshot');
      let img = viewer.getCurrentImageHtml(400, 200);
      d.innerHTML = '';
      d.appendChild(img);
      cube.stopped = false;
    })


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
