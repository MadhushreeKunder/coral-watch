import { Link } from "react-router-dom";
import { viewsFormatter } from "../utils/viewsFormatter";
import { useUser, useVideo, useAuth} from "../contexts";
import { addToHistory } from "../utils/apiSync";


export function VideoListing() {
  const {userState, userDispatch} = useUser();
  const { data } = useVideo();
  const {token, user} = useAuth();

  return (
    <div className="h-full ml-44 mt-4 py-8 bg-gray-900">
      <ul className="flex flex-row flex-wrap justify-evenly">
        {data.map((video) => (
          <li className="w-64 mx-2 mb-4" >
            <Link to={`/video/${video._id}`} >
              <div onClick={() => addToHistory(user, video, userDispatch) } key={video._id}>
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
                  <p className="text-gray-100 font-medium">{video.videoTitle}</p>
                  <small className="text-gray-400">{video.channel.name}</small>
                  <small className="text-gray-400">
                    {viewsFormatter(video.views)} views • {video.date}
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
