import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage, ProjectPage, ErrorPage } from "@pages";
import "@styles/globals.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="project/:id" element={<ProjectPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
