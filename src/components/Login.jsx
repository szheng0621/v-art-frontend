import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failMsg, setFailMsg] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.toLowerCase() === "happyamy2016" && password === "123456") {
      setUser({ username: "happyamy2016", exhibition_id: 3 });
      navigate(`/users/happyamy2016/exhibitions`);
    } else {
      setFailMsg("Invalid credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Login</h2>
      {failMsg && <p className="text-red-500">{failMsg}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="w-40 bg-rose-500 text-white p-2 rounded opacity-100 mb-40"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
