import "./App.css";

import Sidebar from "./components/Sidebar";
import ToolBar from "./components/ToolBar";
import XimViewer from "./components/XimViewer";

function App() {
  return (
    <div className="LayoutWrapper">
      <Sidebar />
      <div className="ViewerContainer">
        <ToolBar />
        <XimViewer modelPath={"/models/SampleHouseV3.wexbim"} />
      </div>
    </div>
  );
}

export default App;
