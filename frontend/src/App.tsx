import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isSigin={true} />} />
        <Route path="login" element={<Home isSigin={true} />} />
        <Route path="signup" element={<Home isSigin={false} />} />

        <Route path="/blogs" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}
