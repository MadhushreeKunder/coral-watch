import { videosDb } from "../database";
import { Link } from "react-router-dom";
import { FaDotCircle, FaTrashAlt } from "react-icons/fa";
import { viewsFormatter } from "../utils/viewsFormatter";
import { useAuth, useUser } from "../contexts";
import {
  deletePlayListBackend,
  deleteVideoFromPlaylist,
} from "../utils/apiSync";

// Change playlist ui

export function Playlists() {
  const { userState, userDispatch } = useUser();
  const { user } = useAuth();

  return (
    <div className="h-full ml-44 mt-4 py-8">
      <h1 className="text-white text-2xl font-semibold ml-5 mb-5">Playlists</h1>
      <div className="flex flex-row flex-wrap justify-evenly">
        {userState.playlists.map((playList) => {
          return playList.name !== "" ? (
            <div key={playList._id} className="text-white ">
              <div>
                <h3>Playlistname here{playList.name}</h3>
                <button
                  onClick={() => {
                    deletePlayListBackend(user, playList, userDispatch);
                  }}
                >
                  <FaTrashAlt />
                </button>
              </div>

              <div>
                {playList.videos.map(({ videoId: video }) => {
                  return (
                    <li className="w-64 mx-2 mb-4">
                      <button
                        onClick={() =>
                          deleteVideoFromPlaylist(
                            user,
                            playList,
                            video,
                            userDispatch
                          )
                        }
                      >
                        <FaTrashAlt />
                      </button>
                      <Link to={`/video/${video._id}`}>
                        <div key={video._id}>
                          <img
                            src={`https://img.youtube.com/vi/${video._id}/maxresdefault.jpg`}
                            alt="video-name"
                          />
                        </div>
                        <div className="flex flex-row mt-2 gap-2">
                          <img
                            alt={video.videoTitle}
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
                      </Link>
                    </li>
                  );
                })}
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
