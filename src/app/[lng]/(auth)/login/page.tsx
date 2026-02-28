"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/en");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-[360px] text-center">

        {/* 🌸 GIRL AVATAR */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
            alt="cute girl"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>

        <h1 className="text-3xl font-bold text-purple-700">
          LunaWell 🌙
        </h1>

        <p className="text-gray-500 mb-6">
          Welcome back! Take a deep breath 💜
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-5 text-sm">
          Don't have an account?{" "}
          <a href="/en/signup" className="text-purple-600 font-semibold">
            Create Account
          </a>
        </p>

      </div>
    </div>
  );
}