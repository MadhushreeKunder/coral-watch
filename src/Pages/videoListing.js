// import "../styles.css";

import { videosDb } from "../database";
import { Link, useNavigate } from "react-router-dom";
import { viewsFormatter } from "../utils/viewsFormatter";
import { useUser, useVideo, useAuth} from "../contexts";


export function VideoListing() {
  const {userState, userDispatch} = useUser();
  const { data, status } = useVideo();
  const {token} = useAuth();
  const navigate = useNavigate();


  return (
    <div className="h-full ml-44 mt-4 py-8 bg-gray-900">
      <ul className="flex flex-row flex-wrap justify-evenly">
        {data.map((item) => (
          <li className="w-64 mx-2 mb-4" >
            <Link to={`/video/${item._id}`} >
              <img
                className="video-thumbnail"
                src={`https://img.youtube.com/vi/${item._id}/maxresdefault.jpg`}
                alt="video-name"
              />

              <div className="flex flex-row mt-2 gap-2">
                {/* <FaDotCircle className="text-white text-3xl" /> */}
                <img
                  src={item.channel.logo}
                  alt={item.videoTitle}
                  className="rounded-full h-8"
                ></img>
                <div className="flex flex-col">
                  <p className="text-gray-100 font-medium">{item.videoTitle}</p>
                  <small className="text-gray-400">{item.channel.name}</small>
                  <small className="text-gray-400">
                    {viewsFormatter(item.views)} views • {item.date}
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
