import { Link } from "react-router-dom";
import {
  FaHome,
  FaStream,
  FaThumbsUp,
  FaClock,
  FaHistory,
} from "react-icons/fa";

export const NavBar = () => {
  return (
    <aside className="fixed left-0 h-full z-1">
      <nav className=" flex flex-col items-start pl-3 pr-3 mr-20 h-full bg-gray-800 text-gray-300 ">
        <ul>
          <li className="px-3 py-2 my-2 text-lg block hover:bg-gray-700 active:bg-gray-700  focus:bg-gray-700 active:text-white focus:text-white rounded">
            <Link to="/">
              <div className="flex flex-row items-center">
                <FaHome className="mr-2" /> Home{" "}
              </div>
            </Link>
          </li>
          <li className="px-3 py-2 my-2 text-lg block hover:bg-gray-700 active:bg-gray-700  focus:bg-gray-700 active:text-white focus:text-white rounded">
            <Link to="/playlist">
              {" "}
              <div className="flex flex-row items-center">
                <FaStream className="mr-2" /> Playlist
              </div>
            </Link>
          </li>
          <li className="px-3 py-2 my-2 text-lg block hover:bg-gray-700 active:bg-gray-700  focus:bg-gray-700 active:text-white focus:text-white rounded">
            <Link to="/likedvideos">
              {" "}
              <div className="flex flex-row items-center">
                <FaThumbsUp className="mr-2" /> Liked Videos
              </div>
            </Link>
          </li>
          <li className="px-3 py-2 my-2 text-lg block hover:bg-gray-700 active:bg-gray-700  focus:bg-gray-700 active:text-white focus:text-white rounded">
            <Link to="/watchlater">
              <div className="flex flex-row items-center">
                <FaClock className="mr-2" /> Watch Later
              </div>
            </Link>
          </li>
          <li className="px-3 py-2 my-2 text-lg block hover:bg-gray-700 active:bg-gray-700  focus:bg-gray-700 active:text-white focus:text-white rounded">
            <Link to="/history">
              {" "}
              <div className="flex flex-row items-center">
                <FaHistory className="mr-2" /> History
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
