import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import Picture1 from "../assets/Picture1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.accessToken);
      navigate("/products");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
