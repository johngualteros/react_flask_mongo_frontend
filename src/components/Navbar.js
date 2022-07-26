import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="w-screen flex justify-between items-center p-1 h-16">
      <Link to="/">
        <h1 className="text-3xl font-bold text-sky-600">Users</h1>
      </Link>
      <div className="flex items-center text-white">
        <Link to="/">
          <h1 className="text-2xl font-bold m-6 hover:text-sky-300">Users</h1>
        </Link>
        <Link to="/about">
          <h1 className="text-2xl font-bold m-6 hover:text-sky-300">About</h1>
        </Link>
      </div>
    </nav>
  );
};
