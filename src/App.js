// import "./styles.css";
import {
  Playlists,
  LikedVideos,
  WatchLater,
  History,
  VideoListing,
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
        <Route path="/" element={<VideoListing />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/video/:videoID" element={<VideoPlayerPage />} />
        <Route path="/likedvideos" element={<LikedVideos />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}
