import { videosDb } from "../database";
import { Link } from "react-router-dom";
import { FaDotCircle } from "react-icons/fa";

// Add remove from watch later

export function WatchLater() {
  return (
    <div className="h-screen ml-44 mt-4 py-8">
      <h1 className="text-white text-2xl font-semibold ml-5 mb-5">Watch Later</h1>
      <ul className="flex flex-row flex-wrap justify-evenly">
        {videosDb.map((item) => (
          <li className="w-64 mx-2 mb-4">
            <Link to={`/video/${item.videoId}`}>
              <img
                className="video-thumbnail"
                src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                alt="video-name"
              />

              <div className="flex flex-row mt-2 gap-2">
                <FaDotCircle className="text-white text-3xl" />
                <div className="flex flex-col">
                  <p className="text-gray-100 font-medium">Video-title</p>
                  <small className="text-gray-400">Video-channel</small>
                  <small className="text-gray-400">
                    16.1k views . 3 years ago
                  </small>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
