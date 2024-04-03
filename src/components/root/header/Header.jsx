import { useGlobal } from "../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { name, token, setName, setToken, reset } = useGlobal((state) => ({
    name: state.name,
    token: state.token,
    setName: state.setName,
    setToken: state.setToken,
    reset: state.reset,
  }));

  const location = useLocation();
  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  function handleLogout() {
    setName("");
    setToken("");
    setTimeout(() => navigate("/"), 500);
  }

  return (
    <div className={token ? "bg-slate-200" : "bg-slate-400"}>
      {token ? (
        <div className="flex justify-between items-center p-4">
          <div className="flex justify-between items-center gap-x-4">
            <p className="xl:text-2xl lg:text-xl sm:text-base">
              CoCrafter Panel
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-4">
            <p className="mr-4">Welcome {name}</p>
            <p
              onClick={() => handleClick("/")}
              className={`cursor-pointer text-slate-600 hover:text-black transition-colors ${
                location.pathname === "/" && "text-black"
              }`}
            >
              Main Page
            </p>
            <p
              onClick={() => handleClick("/folders")}
              className={`cursor-pointer text-slate-600 hover:text-black transition-colors ${
                location.pathname === "/folders" && "text-black"
              }`}
            >
              Folders
            </p>
            <p
              onClick={() => handleClick("/files")}
              className={`cursor-pointer text-slate-600 hover:text-black transition-colors ${
                location.pathname === "/files" && "text-black"
              }`}
            >
              Files
            </p>
            <p
              onClick={handleLogout}
              className="cursor-pointer text-slate-600 hover:text-black transition-colors"
            >
              Logout
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center p-4">
          <div className="flex justify-between items-center gap-x-4">
            <p className="xl:text-2xl lg:text-xl sm:text-base">
              CoCrafter Panel
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-4">
            <p
              onClick={() => handleClick("/login")}
              className={`cursor-pointer text-slate-600 hover:text-black transition-colors ${
                (location.pathname === "/login" || location.pathname === "/") &&
                "text-black"
              }`}
            >
              Login
            </p>
            <p
              onClick={() => handleClick("/register")}
              className={`cursor-pointer text-slate-600 hover:text-black transition-colors ${
                location.pathname === "/register" && "text-black"
              }`}
            >
              Register
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
