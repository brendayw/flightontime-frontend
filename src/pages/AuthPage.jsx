import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // login | signup

  return (
    <div className="min-h-[100dvh] w-screen flex items-center justify-center
        bg-gradient-to-b from-[#251A79] via-[#798AF4] to-[#FF854C] relative overflow-hidden"
    >
        {/* Glow */}
        <div className="absolute bottom-[-25%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FF854C]/40 rounded-full blur-3xl" />

        {/* Clouds */}
        <div className="absolute top-24 left-20 w-72 h-72 bg-[#F9F3F3]/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-24 w-96 h-96 bg-[#798AF4]/30 rounded-full blur-3xl" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#251A79]/30 backdrop-blur-sm" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl bg-[#F9F3F3]/30
          rounded-2xl shadow-2xl px-8 py-10"
        >
            {mode === "login" ? (
            <LoginForm onSwitch={() => setMode("signup")} />
            ) : (
            <SignupForm onSwitch={() => setMode("login")} />
            )}
        </div>
    </div>
  );
}

export default  AuthPage;