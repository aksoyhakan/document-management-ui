import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { useState } from "react";
import { getBreakPoint } from "../constants";
import { useWindowSize } from "react-use";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGlobal, useToast } from "../hooks";
import { MainApiService } from "../utils";

function fetchLogin(email, password) {
  return MainApiService.auth.login(email, password);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { width } = useWindowSize();
  const toast = useToast();
  const navigate = useNavigate();

  const { name, token, setName, setToken, reset } = useGlobal((state) => ({
    name: state.name,
    token: state.token,
    setName: state.setName,
    setToken: state.setToken,
    reset: state.reset,
  }));

  const { mutate: loginMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetchLogin(email, password);
      setName(response.name);
      setToken(response.token);
      navigate("/");
      toast.open({
        content: `Welcome ${response.name}`,
        kind: "positive",
      });
    },
    onError: (err) => {
      toast.open({
        content: err.message,
        kind: "negative",
      });
    },
  });

  return (
    <div className="w-full h-full">
      <div className="border-2 border-solid rounded-lg border-black p-6 bg-slate-50 max-w-xl mx-auto flex flex-col justify-start items-center gap-y-4">
        <h2 className="xl:text-2xl lg:text-xl sm:text-base">Login</h2>
        <Input
          overrides={{
            Root: {
              style: () => ({
                marginTop: "0.75rem",
                maxWidth: "25rem",
              }),
            },
          }}
          value={email}
          size={width >= getBreakPoint("lg") ? "default" : "compact"}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please, type email"
          clearable
        />
        <Input
          overrides={{
            Root: {
              style: () => ({
                marginTop: "0.75rem",
                maxWidth: "25rem",
              }),
            },
          }}
          value={password}
          type="password"
          size={width >= getBreakPoint("lg") ? "default" : "compact"}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Please, type password"
          clearable
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            loginMutate();
          }}
          disabled={!(email && password)}
          overrides={{
            Root: {
              style: () => ({
                display: "block",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
              }),
            },
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
