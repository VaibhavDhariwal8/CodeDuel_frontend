import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Account created. Check your email to verify your account.");

    setTimeout(() => navigate("/login"), 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-base-900 border border-base-700 rounded-lg p-8 w-80 flex flex-col gap-4"
      >
        <h1 className="font-display text-2xl font-bold">Sign up</h1>

        <input
          className="bg-base-800 border border-base-700 rounded-md px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="bg-base-800 border border-base-700 rounded-md px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-verdict-fail text-sm">{error}</p>}

        {message && <p className="text-verdict-pass text-sm">{message}</p>}

        <button
          className="bg-brand-500 rounded-md py-2 font-medium"
          type="submit"
        >
          Create account
        </button>

        <p className="text-ink-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-400">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
