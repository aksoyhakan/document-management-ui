import { useContext } from "react";

import ToastContext from "../components/toast/context";

export default function useToast() {
  return useContext(ToastContext);
}
