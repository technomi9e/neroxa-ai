import React from "react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

function App() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <ChatArea />
    </div>
  );
}

export default App;
