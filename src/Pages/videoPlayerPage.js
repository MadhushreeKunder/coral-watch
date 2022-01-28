// import "../styles.css";
import React from "react";
import { videosDb } from "../database";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaDotCircle, FaClock, FaThumbsUp, FaFolderPlus, FaShareAlt
} from "react-icons/fa";

export function VideoPlayerPage() {
  const { videoID } = useParams();
  const { id, videoId } = videosDb.find((item) => item.videoId === videoID);

  return (
    <div className="h-full ml-44 mt-4 py-8 pr-6 flex flex-row justify-center">
      <div className="flex flex-col w-full mx-8">
        <iframe
          key={id}
          style={{height: "29rem"}}
          className=""
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div className="flex flex-row mt-4 justify-between items-center">
          <div className="flex flex-row gap-4">
            <FaDotCircle className="text-white text-3xl" />

            <div className="flex flex-col">
              <p className="text-2xl font-medium text-white">Video Title</p>
              <div className="flex flex-row gap-3 text-gray-400">
                <p>Video channnel</p>
                <p>1.5k views</p>
                <p>Date</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 text-2xl text-gray-300 mr-4">
            <FaThumbsUp className="active:text-white hover:text-white focus:text-rose-500"/>
            <FaClock className="active:text-white hover:text-white focus:text-rose-500"/>
            <FaFolderPlus className="active:text-white hover:text-white focus:text-rose-500"/>
            <FaShareAlt className="active:text-white hover:text-white focus:text-rose-500"/>
          </div>
        </div>
      </div>

      <div>
        <ul className="flex flex-col flex-wrap justify-evenly flex:none">
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
    </div>
  );
}
