import { Toast as BaseToast } from "baseui/toast";

const Toast = ({
  autoHideDuration,
  kind,
  children,
  onBlur,
  onClose,
  onFocus,
  onMouseEnter,
  onMouseLeave,
}) => (
  <BaseToast
    autoHideDuration={autoHideDuration ?? 3000}
    closeable={true}
    kind={kind}
    overrides={{
      Body: {
        style: ({ $theme }) => ({
          maxWidth: "200px",

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "between",

          marginTop: 0,
          marginBottom: 0,
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",

          [$theme.mediaQuery.medium]: {
            maxWidth: "240px",

            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.57rem",
          },

          [$theme.mediaQuery.large]: {
            maxWidth: "280px",

            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          },
        }),
      },
    }}
    onBlur={onBlur}
    onClose={onClose}
    onFocus={onFocus}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </BaseToast>
);

export default Toast;
