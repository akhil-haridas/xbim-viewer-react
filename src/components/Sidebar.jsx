import { RenderingMode, Viewpoint } from "@xbim/viewer";

import React from "react";

const Sidebar = () => {
  return (
    <div className="SideBarWrapper">
      <div className="ContentWrapper">
        <div>
          Status:
          <span id="progress"></span>
        </div>
        <div>
          Selected:
          <span id="ids" /> <br />
          <span id="coords" />
        </div>
        <div>
          Hover-over:
          <span id="hoverid" /> <br />
          <span id="hovercoords" />
        </div>
        <div>
          Framerate (FPS):
          <span id="fps" />
        </div>
        <div>
          WebGL version:
          <span id="webglVersion" />
        </div>
        <div>
          <button
            onClick={() => {
              window.cube.stopped = true;

              const view = Viewpoint.GetViewpoint(window.viewer, null);

              var img = document.createElement("img");
              img.src = "data:image/png;base64," + view.snapshot.snapshot_data;
              img.style.width = "100%";
              img.style.cursor = "pointer";

              var place = document.getElementById("snapshot");
              place.innerHTML = "";
              place.appendChild(img);

              img.onclick = () => {
                Viewpoint.SetViewpoint(window.viewer, view, null, 1000);
                place.innerHTML = "";
              };

              window.cube.stopped = false;
            }}
          >
            Take snapshot
          </button>
          <br />
          <div id="snapshot" />
          <div id="initialSnapshot"></div>
        </div>
        <div>
          Rendering mode:
          <br />
          <label>
            <input
              type="radio"
              name="radioRenderingMode"
              defaultValue="normal"
              defaultChecked="checked"
              onChange={() => {
                window.viewer.renderingMode = RenderingMode.NORMAL;
              }}
            />
            Normal
          </label>
          <label>
            <input
              type="radio"
              name="radioRenderingMode"
              defaultValue="xray"
              onChange={() => {
                window.viewer.renderingMode = RenderingMode.XRAY;
              }}
            />
            X-Ray
          </label>
          <label>
            <input
              type="radio"
              name="radioRenderingMode"
              defaultValue="xray"
              onChange={() => {
                window.viewer.renderingMode = RenderingMode.XRAY_ULTRA;
              }}
            />
            Ultra X-Ray
          </label>
          <label>
            <input
              type="radio"
              name="radioRenderingMode"
              defaultValue="gray"
              onChange={() => {
                window.viewer.renderingMode = RenderingMode.GRAYSCALE;
              }}
            />
            Grayscale
          </label>
        </div>
        <div>
          Grid and navigation cube
          <br />
          <button
            onClick={() => {
              window.cube.stopped = true;
            }}
          >
            Stop cube
          </button>
          <button
            onClick={() => {
              window.cube.stopped = false;
            }}
          >
            Start cube
          </button>
          <button
            onClick={() => {
              window.grid.stopped = true;
            }}
          >
            Stop grid
          </button>
          <button
            onClick={() => {
              window.grid.stopped = false;
            }}
          >
            Start grid
          </button>
        </div>
        <div>
          Gamma:
          <input
            type="range"
            name="gamma"
            min={0}
            max={5}
            defaultValue={1.0}
            step="0.1"
            onInput={(evt) => {
              {
                const input = evt.target;
                const value = parseFloat(input.value);
                window.viewer.gamma = value;
              }
            }}
          />
          Contrast:
          <input
            type="range"
            name="contrast"
            min={0}
            max={5}
            defaultValue={1.0}
            step="0.1"
            onInput={(evt) => {
              {
                const input = evt.target;
                const value = parseFloat(input.value);
                window.viewer.contrast = value;
              }
            }}
          />
          Brightness:
          <input
            type="range"
            name="brightness"
            min={-1}
            max={1}
            defaultValue={0.0}
            step="0.1"
            onInput={(evt) => {
              {
                const input = evt.target;
                const value = parseFloat(input.value);
                window.viewer.brightness = value;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
