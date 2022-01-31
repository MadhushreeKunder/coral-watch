import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { viewsFormatter } from "../utils/viewsFormatter";
import { FaClock, FaThumbsUp, FaFolderPlus, FaShareAlt } from "react-icons/fa";
import {
  addToLikedVideos,
  addToWatchLater,
  removeFromLikedVideos,
  removeFromWatchLater,

} from "../utils/apiSync";
import { useUser, useAuth, useVideo } from "../contexts";
import { likeToggle } from "../utils/toggleColor";
import { PlaylistModal } from "../utils/playlistModal";

export function VideoPlayerPage() {
  const { videoId } = useParams();
  // const { id, _id, videoTitle, views, date, channel } = videosDb.find(
  //   (video) => item._id === videoId
  // );

  const { data, status } = useVideo();
  const { userState, userDispatch } = useUser();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [addToPlaylistModal, setAddToPlaylistModal] =useState(false);

  const video = data.find((video) => video._id === videoId);

  return (
    <div className="h-full ml-44 mt-4 py-8 pr-6 flex flex-row justify-center ">
      <div className="flex flex-col w-full mx-8 relative">
        {addToPlaylistModal && (
          <div className="absolute top-48 left-80 bg-white">
            <PlaylistModal setAddToPlaylistModal={setAddToPlaylistModal}
            video={video} />
          </div>
        )}
        <iframe
          key={video._id}
          style={{ height: "29rem" }}
          className=""
          src={`https://www.youtube.com/embed/${video._id}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div className="flex flex-row mt-6 justify-between items-center gap-4">
          <div className="flex flex-row gap-4">
            <img
              src={video.channel.logo}
              alt={video.videoTitle}
              className="rounded-full h-12"
            ></img>
            <div className="flex flex-col">
              <p className="text-2xl font-medium text-white">
                {video.videoTitle}
              </p>
              <div className="flex flex-row gap-3 text-gray-400 mt-3">
                <p>{video.channel.name}</p> •
                <p>{viewsFormatter(video.views)} views</p> •<p>{video.date}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 text-2xl text-gray-400 mr-4">
            <button
              onClick={
                token
                  ? () => {
                      // e.preventDefault();

                      // userState.liked.find((videoId) =>
                      //   videoId._id === video._id
                      //     ? removeFromLikedVideos(user, video, userDispatch)
                      //     : addToLikedVideos(user, video, userDispatch)
                      // );
                      userState.liked.reduce((acc, value) => {
                        return value.videoId._id === video._id
                          ? removeFromLikedVideos(user, video, userDispatch)
                          : acc;
                      }, addToLikedVideos(user, video, userDispatch));
                    }
                  : () => {
                      navigate("/login");
                    }
              }
            >
              <FaThumbsUp
                // className="text-gray-300"
                className={likeToggle(video, userState, token)}
              />
            </button>
            <button
              onClick={
                token
                  ? () => {
                      // e.preventDefault();
                      userState.watchlater.reduce((acc, value) => {
                        return value.videoId._id === video._id
                          ? removeFromWatchLater(user, video, userDispatch)
                          : acc;
                      }, addToWatchLater(user, video, userDispatch));

                      // userState.watchlater.find((videoId) =>
                      //   videoId._id === video._id
                      //     ? removeFromWatchLater(user, video, userDispatch)
                      //     : addToWatchLater(user, video, userDispatch)
                      // );
                    }
                  : () => {
                      navigate("/login");
                    }
              }
            >
              <FaClock className={likeToggle(video, userState, token)} />
            </button>

            <button
            onClick={token ? () => {setAddToPlaylistModal(!addToPlaylistModal)} : () => { navigate("/login")}}
            >
              <FaFolderPlus className="active:text-white hover:text-white " />
            </button>
            <button>
              <FaShareAlt className="active:text-white hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <ul className="flex flex-col flex-wrap justify-evenly flex:none">
          {data.map((video) => (
            <li className="w-64 mx-2 mb-4">
              <Link to={`/video/${video._id}`}>
                <img
                  className="video-thumbnail"
                  src={`https://img.youtube.com/vi/${video._id}/maxresdefault.jpg`}
                  alt="video-name"
                />

                <div className="flex flex-row mt-2 gap-2">
                  {/* <FaDotCircle className="text-white text-3xl" /> */}
                  <img
                    src={video.channel.logo}
                    alt={video.videoTitle}
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
                      {viewsFormatter(video.views)} views • {video.date}
                    </small>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
