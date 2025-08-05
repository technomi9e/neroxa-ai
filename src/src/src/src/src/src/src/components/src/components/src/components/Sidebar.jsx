import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`bg-gray-100 border-r p-4 ${isOpen ? "w-64" : "w-16"} transition-all`}>
      <button
        className="mb-4 text-sm text-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Collapse" : "Expand"}
      </button>
      {isOpen && (
        <ul className="space-y-2">
          <li className="text-gray-700 font-medium">New Chat</li>
          <li className="text-gray-700">History</li>
          <li className="text-gray-700">Settings</li>
        </ul>
      )}
    </aside>
  );
}
