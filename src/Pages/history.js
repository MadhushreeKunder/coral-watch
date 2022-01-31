import { videosDb } from "../database";
import { Link } from "react-router-dom";
import { FaDotCircle } from "react-icons/fa";
import { viewsFormatter } from "../utils/viewsFormatter";
import { useAuth, useUser } from "../contexts";
import { removeFromHistory, clearHistory } from "../utils/apiSync";
import { FaTrashAlt } from "react-icons/fa";

// Add remove from history

export function History() {
  const { userState, userDispatch } = useUser();
  const { user } = useAuth();

  return (
    <div className="h-screen ml-44 mt-4 py-8">
      <h1 className="text-white text-2xl font-semibold ml-5 ">History</h1>
      <button 
      onClick={()=> clearHistory(user, userDispatch)}
      className="py-2 px-4 m-auto mr-8 mb-6 block justify-end w-fit rounded-lg bg-cyan-500 shadow-lg shadow-cyan-500/50 active:shadow-gray-900 text-slate-900 font-bold">
        Clear History
      </button>
      <ul className="flex flex-row flex-wrap justify-evenly">
        {userState.history.map(({ videoId: video }) => (
          <li className="w-64 mx-2 mb-4 relative">
            <button
              className="text-2xl text-white absolute -top-4 -right-4 z-2"
              onClick={() => {
                removeFromHistory(user, video, userDispatch);
              }}
            >
              <FaTrashAlt />
            </button>
            <Link to={`/video/${video._id}`}>
              <div key={video._id}>
                <img
                  className="video-thumbnail"
                  src={`https://img.youtube.com/vi/${video._id}/maxresdefault.jpg`}
                  alt={video.videoTitle}
                />

                <div className="flex flex-row mt-2 gap-2">
                  <img
                    alt={video.channel.name}
                    src={video.channel.logo}
                    className="rounded-md h-8"
                  ></img>
                  <div className="flex flex-col">
                    <p className="text-gray-100 font-medium">
                      {video.videoTitle}
                    </p>
                    <small className="text-gray-400">
                      {video.channel.name}
                    </small>
                    <small className="text-gray-400">
                      {viewsFormatter(video.views)} views . {video.date}
                    </small>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
