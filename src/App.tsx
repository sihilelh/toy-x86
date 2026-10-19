import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ReferencesView from "./views/references";
import AboutView from "./views/about";
import Projects from "@/views/projects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/references" element={<ReferencesView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
