import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaStream,
  FaThumbsUp,
  FaClock,
  FaHistory,
} from "react-icons/fa";
import { useAuth } from "../contexts/authContext";

export const NavBar = () => {
  const { token } = useAuth();
  let activeClassname =
    "px-3 py-2 my-2 text-lg block rounded active:bg-gray-900 active:text-sky-400 focus:bg-gray-900 focus:text-sky-400";

  let inActiveClassname =
    "px-3 py-2 my-2 text-lg block rounded hover:bg-gray-700 hover:text-white";

  return (
    <aside className="fixed left-0 h-full z-50">
      <nav className=" flex flex-col items-start pl-3 pr-3 h-full bg-gray-800 text-gray-400 ">
        <ul>
          <li>
            <NavLink
              end
              to="/"
              // className="px-3 py-2 my-2 text-lg block hover:bg-gray-700 hover:text-white active:bg-gray-900  focus:bg-gray-900 active:text-sky-400 focus:text-sky-400 rounded"
              className={({ isActive }) =>
                isActive ? activeClassname : inActiveClassname
              }
            >
              <div className="flex flex-row items-center">
                <FaHome className="mr-2" /> Home{" "}
              </div>
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={token ? "/playlist" : "/login"}
              className={({ isActive }) =>
                isActive ? activeClassname : inActiveClassname
              }
            >
              {" "}
              <div className="flex flex-row items-center">
                <FaStream className="mr-2" /> Playlists
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={token ? "/liked" : "/login"}
              className={({ isActive }) =>
                isActive ? activeClassname : inActiveClassname
              }
            >
              {" "}
              <div className="flex flex-row items-center">
                <FaThumbsUp className="mr-2" /> Liked Videos
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={token ? "/watchlater" : "/login"}
              className={({ isActive }) =>
                isActive ? activeClassname : inActiveClassname
              }
            >
              <div className="flex flex-row items-center">
                <FaClock className="mr-2" /> Watch Later
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={token ? "/history" : "/login"}
              className={({ isActive }) =>
                isActive ? activeClassname : inActiveClassname
              }
            >
              {" "}
              <div className="flex flex-row items-center">
                <FaHistory className="mr-2" /> History
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
