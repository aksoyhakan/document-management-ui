import { Outlet } from "react-router-dom";

import { useGlobal } from "../../hooks";
import Footer from "./footer/footer";
import Header from "./header/Header";

export default function Root() {
  const token = useGlobal((state) => state.token);

  return (
    <div
      className={`h-full min-h-screen w-full flex flex-col ${
        token ? "justify-start" : "justify-between"
      } `}
    >
      <Header />
      <Outlet />
      {!token && <Footer />}
    </div>
  );
}
