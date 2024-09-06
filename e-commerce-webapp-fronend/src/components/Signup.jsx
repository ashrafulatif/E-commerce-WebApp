import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1000/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Signup</h2>
        <form onSubmit={handleSignup}>
          <div>
            <input
              type="firstName"
              placeholder="First Name"
              className="w-full p-3 mb-4 border rounded-md"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="lastName"
              placeholder="Last Name"
              className="w-full p-3 mb-4 border rounded-md"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-indigo-600 text-white p-3 rounded-md">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
