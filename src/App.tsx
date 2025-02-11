import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage, ErrorPage } from "@pages";
import "@styles/globals.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
