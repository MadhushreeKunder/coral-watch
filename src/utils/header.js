import { NavLink, Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="relative mb-16">
      <header className="fixed top-0 left-0 right-0 bg-gray-800 p-4 flex flex-row justify-between items-center">
        <Link to="/">
          <div className="flex flex-row items-center gap-2">
            <img src="/Images/logo2.png" className="logo" alt="CORAL-UI"></img>
            <h1 className="font-bold text-white">CORAL-watch</h1>
          </div>
        </Link>

        <div className="flex flex-row gap-4">
        <NavLink to="/login" className="font-bold text-white">Login</NavLink>
        <NavLink to="/signup" className="font-bold text-white">Signup</NavLink>
        <div className="font-bold text-white">Logout</div>
        </div>

    
      </header>
    </div>
  );
};
