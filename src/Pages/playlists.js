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
      <div className="flex flex-col flex-wrap justify-evenly  m-5">
        {userState.playlists.map((playList) => {
          return playList.name !== "" ? (
            <div
              key={playList._id}
              className="text-white border-2 border-solid border-slate-800 rounded-lg p-5 mb-5"
            >
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold">{playList.name}</h3>

                <button
                  onClick={() => {
                    deletePlayListBackend(user, playList, userDispatch);
                  }}
                  className="py-2 px-4 m-auto mr-8 mb-6 block justify-end w-fit rounded-lg bg-cyan-500 shadow-lg shadow-cyan-500/50 active:shadow-gray-900 text-slate-900 font-bold"
                >
                  Delete Playlist
                </button>
              </div>

              <ul className="flex flex-wrap justify-start gap-4">
                {playList.videos.map(({ videoId: video }) => {
                  return (
                    <li className="w-64 mx-2 mb-4 list-none relative ">
                      <button
                        className="text-2xl text-white absolute -top-4 -right-4 z-2"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteVideoFromPlaylist(
                            user,
                            playList,
                            video,
                            userDispatch
                          );
                        }}
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
                            className="rounded-full h-8"
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
              </ul>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
