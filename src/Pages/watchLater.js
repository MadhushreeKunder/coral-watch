import { videosDb } from "../database";
import { Link } from "react-router-dom";
import { FaDotCircle } from "react-icons/fa";
import { viewsFormatter } from "../utils/viewsFormatter";
import { useAuth, useUser } from "../contexts";
import { removeFromWatchLater } from "../utils/apiSync";
import { FaTimesCircle } from "react-icons/fa";

// Add remove from watch later

export function WatchLater() {
  const { user } = useAuth();
  const { userState, userDispatch } = useUser();

  return (
    <div className="h-screen ml-44 mt-4 py-8">
      <h1 className="text-white text-2xl font-semibold ml-5 mb-5">
        Watch Later
      </h1>
      <ul className="flex flex-row flex-wrap justify-start gap-4 m-4">
        {userState.watchlater.map(({ videoId: video }) => (
          <li className="w-64 mx-2 mb-4 relative">
            <button
              className="text-2xl text-white absolute -top-4 -right-4 z-2"
              onClick={() => {
                removeFromWatchLater(user, video, userDispatch);
              }}
            >
              <FaTimesCircle />
            </button>
            <Link to={`/video/${video._id}`}>
              <img
                src={`https://img.youtube.com/vi/${video._id}/maxresdefault.jpg`}
                alt="video-name"
              />

              <div className="flex flex-row mt-2 gap-2">
                {/* <FaDotCircle className="text-white text-3xl" /> */}
                <img
                  src={video.channel.logo}
                  alt={video.channel.name}
                  className="h-8 rounded-full"
                ></img>
                <div className="flex flex-col">
                  <p className="text-gray-100 font-medium">
                    {video.videoTitle}
                  </p>
                  <small className="text-gray-400">{video.channel.name}</small>
                  <small className="text-gray-400">
                    {viewsFormatter(video.views)} views . {video.date}
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
