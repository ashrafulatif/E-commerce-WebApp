import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Picture1 from "../assets/Picture1.png";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};

    if (!firstName) {
      formErrors.firstName = "First Name is required";
    }
    if (!lastName) {
      formErrors.lastName = "Last Name is required";
    }
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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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
        setErrors({ server: "Signup failed. Please try again." });
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome to FurniFlex
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Signup for purchase your desire products
          </p>
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="relative">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <br />
            <div className="relative">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
            <br />
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <br />
            {errors.server && (
              <p className="text-red-500 text-sm">{errors.server}</p>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Signup
            </button>
            <br />

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
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
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

export default Signup;
