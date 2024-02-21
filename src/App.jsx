import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { VideoProvider } from "./context/VideoContext";

import Main from "./pages/Main";
import Feed from "./pages/Feed";
import Watch from "./pages/Watch";
import Container from "./components/Container";

function App() {
  return (
    <ThemeProvider>
      <VideoProvider>
        <div className={`${"bg-color"} ${"body"}`}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route path="/" element={<Feed />}>
                  <Route path="/" element={<Navigate to="home" />} />
                  <Route path=":site" element={<Container />} />
                </Route>
                <Route path="watch" element={<Watch />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </VideoProvider>
    </ThemeProvider>
  );
}

export default App;
