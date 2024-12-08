import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Provider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loginSetup, googleSign } = useContext(AuthContext);
  const redirectPath = location.state?.from || "/";


  // Handle Google Sign-in
  const handleGoogle = () => {
    googleSign()
      .then(() => {
        toast.success("Google Sign-In Successful!",{
          position: "top-center",
        });
        
        navigate(redirectPath)
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`,{
          position: "top-center",
        });
     
       
      });
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    loginSetup(email, password)
      .then(() => {
        toast.success("Sign-In Successful!",
          {
            position: "top-center",
          }
        );
       
        navigate(redirectPath)
      })
      .catch((error) => {
        toast.error("Invalid email or password. Please try again.",{
          position: "top-center",
        });
        
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        onSubmit={handleLogin}
        className="w-80 bg-white p-6 rounded shadow-md"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <button
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        onClick={handleGoogle}
      >
        Login with Google
      </button>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
