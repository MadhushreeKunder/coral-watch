import { videosDb } from "../database";
import { Link } from "react-router-dom";
import { viewsFormatter } from "../utils/viewsFormatter";
import { removeFromLikedVideos } from "../utils/apiSync";
import { useAuth, useUser } from "../contexts";
import { FaTimesCircle } from "react-icons/fa";

export function LikedVideos() {
  const { user } = useAuth();
  const { userState, userDispatch } = useUser();

  return (
    <div className="h-screen ml-44 mt-4 py-8">
      <h1 className="text-white text-2xl font-semibold ml-5 mb-5">
        Liked Videos
      </h1>
      <ul className="flex flex-row flex-wrap justify-evenly">
        {userState.liked.map(({ videoId: video }) => (
          <li className="w-64 mx-2 mb-4 relative z-0">
            <button
              className="text-2xl text-white absolute -top-4 -right-4 z-2"
              onClick={() => {
                removeFromLikedVideos(user, video, userDispatch);
              }}
            >
              <FaTimesCircle />
            </button>
            <Link to={`/video/${video._id}`} className="">
              <div >
                <img
                  src={`https://img.youtube.com/vi/${video._id}/maxresdefault.jpg`}
                  alt="video-name"
                />
              </div>

              <div className="flex flex-row mt-2 gap-2">
                <img
                  src={video.channel.logo}
                  alt={video.videoTitle}
                  className="rounded-full h-8"
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
