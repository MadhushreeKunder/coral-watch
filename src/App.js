// import "./styles.css";
import {
  Playlist,
  LikedVideos,
  WatchLater,
  History,
  Home,
  VideoPlayerPage,
} from "./Pages";
import { Header, NavBar } from "./utils";
import { Link, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App bg-gray-900">
      <Header />
      <NavBar />
      <Routes className="routes">
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/video/:videoID" element={<VideoPlayerPage />} />
        <Route path="/likedvideos" element={<LikedVideos />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}
