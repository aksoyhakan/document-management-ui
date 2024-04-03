import { Navigate } from "react-router-dom";

import { useGlobal } from "../../hooks";

export default function ProtectedRoute({ redirectPath = "/", children }) {
  const token = useGlobal((state) => state.token);

  return token ? children : <Navigate to={redirectPath} replace={true} />;
}
