"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();

  // ⭐ NEW: name state
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: any) => {
  e.preventDefault();
  setError("");

  if (password !== confirm) {
    setError("Passwords do not match");
    return;
  }

  try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  const user = userCredential.user;

  // Save display name in Firebase Authentication
  await updateProfile(user, {
    displayName: name,
  });

  // 🔥 NEW: Save user in Firestore database
  await setDoc(doc(db, "users", user.uid), {
    userId: user.uid,
    name: name,
    email: user.email,
    createdAt: serverTimestamp(),
  });

  await user.reload();

  router.push("/en");
} catch (err: any) {
  setError("Failed to create account");
}
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-[360px] text-center">

        {/* 🌸 GIRL AVATAR */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706830.png"
            alt="cute girl"
            className="w-24 h-24 rounded-full shadow-md"
          />
        </div>

        <h1 className="text-3xl font-bold text-pink-600">
          Join LunaWell 🌸
        </h1>

        <p className="text-gray-500 mb-6">
          Start your wellness journey today
        </p>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* ⭐ NEW NAME INPUT */}
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-5 text-sm">
          Already have an account?{" "}
          <a href="/en/login" className="text-pink-600 font-semibold">
            Log In
          </a>
        </p>

      </div>
    </div>
  );
}