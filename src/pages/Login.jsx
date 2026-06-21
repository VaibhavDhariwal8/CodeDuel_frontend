import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/problems");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-base-900 border border-base-700 rounded-lg p-8 w-80 flex flex-col gap-4"
      >
        <h1 className="font-display text-2xl font-bold">Log in</h1>

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

        <button
          className="bg-brand-500 rounded-md py-2 font-medium"
          type="submit"
        >
          Log in
        </button>

        <button
          type="button"
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "github",
            })
          }
          className="border border-base-700 rounded-md py-2"
        >
          Continue with GitHub
        </button>

        <p className="text-ink-400 text-sm">
          No account?{" "}
          <Link to="/signup" className="text-brand-400">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
