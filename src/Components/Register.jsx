import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { createRegistered, updateUserProfile,googleSign } = useContext(AuthContext);

  // Handle Google Sign-in
  const handleGoogle = () => {
    googleSign()
      .then(() => {
        
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
       
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Password validation
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    const lengthRegex = /^.{6,}$/; // At least 6 characters

    if (!uppercaseRegex.test(password)) {
      toast.error("Password must have at least one uppercase letter.", {
        position: "top-center",
      });
      return;
    }
    if (!lowercaseRegex.test(password)) {
      toast.error("Password must have at least one lowercase letter.", {
        position: "top-center",
      });
      return;
    }
    if (!lengthRegex.test(password)) {
      toast.error("Password must be at least 6 characters long.", {
        position: "top-center",
      });
      return;
    }

    const profileUpdates = {
      displayName: name,
      photoURL: photoURL,
    };

    createRegistered(email, password)
      .then((result) => {
        const user = result.user; // Extract user from result
        updateUserProfile(user, profileUpdates)
          .then(() => {
            alert("updated successfully")
           
            navigate("/"); // Redirect to home page after successful registration
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
           
          });
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form
        onSubmit={handleRegister}
        className="w-80 bg-white p-6 rounded shadow-md"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          className="w-full mb-4 p-2 border rounded"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
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
          className="w-full bg-green-500 text-white py-2 rounded"
          type="submit"
        >
          Register
        </button>
      </form>
      <button onClick={handleGoogle} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
        Register with Google
      </button>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
