// import "../styles.css";
import React from "react";
import { videosDb } from "../database";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaDotCircle } from "react-icons/fa";

export function VideoPlayerPage() {
  const { videoID } = useParams();
  const { id, videoId } = videosDb.find((item) => item.videoId === videoID);

  return (
    <div className="h-full ml-44 mt-4 py-8 pr-6 flex flex-row justify-center">
      <div className="flex flex-col w-full mx-8">
        <iframe
          key={id}
          className="h-1/4 max-h-86"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <p className="text-white">Details</p>
      </div>

      <div>
        <ul className="flex flex-col flex-wrap justify-evenly flex:none">
          {videosDb.map((item) => (
            <li className="w-64 mx-2 mb-4">
              <Link to={`/video/${item.videoId}`} >
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
