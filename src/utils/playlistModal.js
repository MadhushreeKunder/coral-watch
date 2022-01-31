import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useUser, useAuth } from "../contexts";
import {
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
  createPlayListBackend,
} from "./apiSync";

export const PlaylistModal = ({ setAddToPlayListModal, video }) => {
  const [addNewPlayList, setAddNewPlayList] = useState("");
  const { userState, userDispatch } = useUser();

  const [checkedPlaylist, setCheckedPlaylist] = useState({});
  const { user } = useAuth();

  const handleChange = (e) => {
    setCheckedPlaylist({
      ...checkedPlaylist,
      [e.target.value]: e.target.checked,
    });
  };

  useEffect(() => {
    userState.playlists.forEach((playList) => {
      if (playList.name in checkedPlaylist) {
        checkedPlaylist[playList.name]
          ? addVideoToPlaylist(user, playList, video, userDispatch)
          : deleteVideoFromPlaylist(user, playList, video, userDispatch);
      }
    });
  }, [checkedPlaylist]);

  return (
    <div className="p-4">
      <div className="relative pb-2">
        <h4>Add to Playlist</h4>
        <button
          className="absolute top-0 right-0"
          onClick={() => setAddToPlayListModal(false)}
        >
          <FaTimesCircle />
        </button>
      </div>

      <div className="text-gray-900">
        {userState.playlists.map((playList) => {
          return (
            <div key={playList._id}>
              <label className="text-gray-900">
                {playList.name}{" "}
              </label>
              <input
                type="checkbox"
                name={playList.name}
                value={playList.name}
                checked={
                  checkedPlaylist[playList.name] ||
                  playList.videos.some((item) => item.videoId._id === video._id)
                }
                onChange={handleChange}
              />
            </div>
          );
        })}
      </div>
      <hr />
      <div className="pt-2">
        <input
          type="text"
          value={addNewPlayList}
          placeholder="Add Playlist"
          onChange={(e) => setAddNewPlayList(e.target.value)}
        ></input>
        <button
          className="bg-cyan-500 font-medium py-1 px-2 rounded"
          onClick={(e) => {
            createPlayListBackend(user, addNewPlayList, userDispatch);
            setAddNewPlayList("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
