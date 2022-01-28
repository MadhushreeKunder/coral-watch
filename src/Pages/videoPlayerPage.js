// import "../styles.css";
import React from "react";
import { videosDb } from "../database";
import { useParams } from "react-router-dom";

export function VideoPlayerPage() {
  const { videoID } = useParams();
  const { id, videoId } = videosDb.find((item) => item.videoId === videoID);

  return (
    <div className="h-screen ml-44 mt-4 py-8">
      <iframe
        key={id}
        className="video"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}
