// import "./styles.css";
import {
  Playlists,
  LikedVideos,
  WatchLater,
  History,
  VideoListing,
  VideoPlayerPage,
  SignUp,
  Login,
  LogoutUser,
  PrivateRoute,
} from "./Pages";
import { Header, NavBar } from "./utils";
import { Link, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App bg-gray-900 h-full min-h-screen">
      <Header />
      <NavBar />
      <div className="h-full min-h-screen bg-gray-900">
        <Routes className="routes">
          <Route path="/" element={<VideoListing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video/:videoId" element={<VideoPlayerPage />} />

          <PrivateRoute path="/playlist" element={<Playlists />} />

          <PrivateRoute path="/logout" element={<LogoutUser />} />

          <PrivateRoute path="/liked" element={<LikedVideos />} />

          <PrivateRoute path="/watchlater" element={<WatchLater />} />

          <PrivateRoute path="/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
}
