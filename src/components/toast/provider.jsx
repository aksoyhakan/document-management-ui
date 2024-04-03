import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import ToastContext from "./context";
import Toast from "./index";

function generateUEID() {
  let first = Math.trunc(Math.random() * 46_656);
  let second = Math.trunc(Math.random() * 46_656);
  first = ("000" + first.toString(36)).slice(-3);
  second = ("000" + second.toString(36)).slice(-3);

  return first + second;
}

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const open = ({ content, kind, duration }) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: generateUEID(),
        content,
        kind: kind ?? "info",
        duration: duration ?? 3000,
      },
    ]);
  };

  const close = (id) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );

  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {createPortal(
        <div
          style={{
            position: "fixed",
            right: "1rem",
            top: "1rem",
            zIndex: "99",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.4rem",
          }}
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              kind={toast.kind}
              autoHideDuration={toast.duration}
              onClose={() => close(toast.id)}
            >
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
