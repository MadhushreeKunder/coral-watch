import { NavLink, Link } from "react-router-dom";
import { useAuth, useUser } from "../contexts";

export const Header = () => {
  const { user, token, logout } = useAuth();
  const { userState } = useUser();

  return (
    <div className="relative mb-16 z-50">
      <header className="fixed top-0 left-0 right-0 bg-gray-800 p-4 flex flex-row justify-between items-center">
        <Link to="/">
          <div className="flex flex-row items-center gap-2">
            <img src="/Images/logo2.png" className="logo" alt="CORAL-UI"></img>
            <h1 className="font-bold text-white">CORAL-watch</h1>
          </div>
        </Link>

        <div className="flex flex-row gap-4">
          <NavLink
            className="font-bold text-white"
            to= {token ? "/logout" : "/login"}
            >
            {token ? `Hello, ${user.username}` : "Login"}
          </NavLink>
        </div>  
      </header>
    </div>
  );
};
