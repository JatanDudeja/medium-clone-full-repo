import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* pass true/false prop in Home component to render either login or signup component */}
        <Route path="login" element={<Home />} />
        <Route path="signup" element={<Home />} />

        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}
