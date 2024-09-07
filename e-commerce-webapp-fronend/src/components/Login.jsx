import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Picture1 from "../assets/Picture1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 5) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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
        setErrors({ server: "Login failed. Please try again." });
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter your Credentials to access your account
          </p>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <br />
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            {errors.server && (
              <p className="text-red-500 text-sm">{errors.server}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms & Policy
                  </a>
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            <hr />
            <div className="mt-4 flex justify-center space-x-4">
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50">
                <img
                  className="w-5 h-5 mr-2"
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google"
                />
                Sign in with Google
              </button>
              <button className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50">
                <img
                  className="w-5 h-5 mr-2"
                  src="https://img.icons8.com/ios-filled/50/000000/mac-os.png"
                  alt="Apple"
                />
                Sign in with Apple
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src={Picture1}
          alt="FurniFlex Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
