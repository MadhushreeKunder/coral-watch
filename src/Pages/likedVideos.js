import { videosDb } from "../database";
import { Link } from "react-router-dom";
import { viewsFormatter } from "../utils/viewsFormatter";

export function LikedVideos() {
  return (
    <div className="h-full ml-44 mt-4 py-8">
      <h1 className="text-white text-2xl font-semibold ml-5 mb-5">
        Liked Videos
      </h1>
      <ul className="flex flex-row flex-wrap justify-evenly">
        {videosDb.map((item) => (
          <li className="w-64 mx-2 mb-4">
            <Link to={`/video/${item.videoLinkId}`}>
              <img
                className="video-thumbnail"
                src={`https://img.youtube.com/vi/${item.videoLinkId}/maxresdefault.jpg`}
                alt="video-name"
              />

              <div className="flex flex-row mt-2 gap-2">
                <img
                  src={item.channel.logo}
                  alt={item.videoTitle}
                  className="rounded-full h-8"
                ></img>
                <div className="flex flex-col">
                  <p className="text-gray-100 font-medium">{item.videoTitle}</p>
                  <small className="text-gray-400">{item.channel.name}</small>
                  <small className="text-gray-400">
                    {viewsFormatter(item.views)} views . {item.date}
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
