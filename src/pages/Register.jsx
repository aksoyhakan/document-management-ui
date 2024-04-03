import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { useState } from "react";
import { getBreakPoint } from "../constants";
import { useWindowSize } from "react-use";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../hooks";
import { MainApiService } from "../utils";
import { useNavigate } from "react-router-dom";

function fetchRegister(name, email, password) {
  return MainApiService.auth.register(name, email, password);
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const toast = useToast();

  const { mutate: registerMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetchRegister(name, email, password);
      toast.open({
        content: `You have registered successfully`,
        kind: "positive",
      });
      navigate("/login");
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
        <h2 className="xl:text-2xl lg:text-xl sm:text-base">Register</h2>
        <Input
          overrides={{
            Root: {
              style: () => ({
                marginTop: "0.75rem",
                maxWidth: "25rem",
              }),
            },
          }}
          value={name}
          size={width >= getBreakPoint("lg") ? "default" : "compact"}
          onChange={(e) => setName(e.target.value)}
          placeholder="Please, type name"
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
            registerMutate();
          }}
          disabled={!(name && email && password)}
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
          Register
        </Button>
      </div>
    </div>
  );
}
