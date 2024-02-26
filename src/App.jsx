import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { VideoProvider } from "./context/VideoContext";

import Main from "./pages/Main";
import Feed from "./pages/Feed";
import Watch from "./pages/Watch";
import VideosGrid from "./components/VideosGrid";
import Shorts from "./components/Shorts";

function App() {
  return (
    <ThemeProvider>
      <VideoProvider>
        <div className={`${"bg-color"} ${"body"}`}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route index element={<Navigate replace to="feed" />} />
                <Route path="feed" element={<Feed />}>
                  <Route index element={<Navigate replace to="home" />} />
                  <Route path="home" element={<VideosGrid />} />
                  <Route path="shorts" element={<Shorts />} />
                  <Route
                    path="/feed/*"
                    element={<Navigate replace to="home" />}
                  />
                </Route>
                <Route path="watch" element={<Watch />} />
              </Route>
              <Route path="/*" element={<Navigate replace to="feed" />} />
            </Routes>
          </BrowserRouter>
        </div>
      </VideoProvider>
    </ThemeProvider>
  );
}

export default App;

//<Route path="/*" element={<Navigate to="/home" />} />
