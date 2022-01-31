import { Link } from "react-router-dom";
import { useAuth } from "../contexts";

export const LogoutUser = () => {
  const { user, logout, status } = useAuth();
  return (
    <div className="h-screen mt-4 pt-7">
      <div className="p-8 w-max flex flex-col items-center m-auto border-2 border-solid border-slate-800 rounded-lg text-white">
        <h3 className="fixed z-10 pt-40  top-0  h-full overflow-auto bg-opacity-10">
          {status?.loading && (
            <img src="/Images/Loading-blue.svg" alt="loading" />
          )}
        </h3>
        <p className="text-lg m-1"> Hey, {user.username}</p>
        <p className="text-lg m-1 font-medium">Keep Learning science!</p>
        <button className="py-2 px-4 m-4 block w-fit rounded-lg bg-cyan-500 shadow-lg shadow-cyan-500/50 active:shadow-gray-900 text-slate-900 font-bold">
          <Link to="/">Watch Videos</Link>
        </button>
        <p className="text-lg m-1">Do you want to logout?</p>
        <button
            className="py-2 px-4 m-4 block w-fit rounded-lg border-cyan-500 border-2 shadow-lg shadow-cyan-500/40 active:shadow-gray-900 text-cyan-500 font-bold"
            onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
