import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const RegisterPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    userType: "user",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (eOrValue) => {
    const { name, value } = eOrValue.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = () => setShow((prev) => !prev);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!input.username || !input.email || !input.password) {
      showMessage("Please fill in the blank fields", "error");
      return;
    }

    try {
      setLoading(true);
      const form = {
        username: input.username,
        email: input.email,
        password: input.password,
        userType: input.userType,
      };

      const res = await axios.post(`${apiUrl}/register`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        const data = res.data;
        showMessage(data.success, "success");
        resetForm();
        window.location.href = "/login";
      } else {
        showMessage("Could not register", "error");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          showMessage(error.response.data.error, "error");
        } else {
          showMessage("Something went wrong", "error");
        }
      }

      console.log("Trouble registerin", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setInput({
      username: "",
      email: "",
      password: "",
    });
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 2000);
  };

  return (
    <div className="register-container">
      {message.text && (
        <div
          className={`px-4 py-2 rounded-lg shadow-md text-sm font-medium text-white transition-all duration-300 ${
            message.type === "success"
              ? "bg-green-500 border border-green-600"
              : "bg-red-600 border border-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Username */}
      <div className="register-field">
        <label htmlFor="username" className="register-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={input.username}
          className="register-input"
          onChange={handleInputChange}
        />
      </div>

      {/* Email */}
      <div className="register-field">
        <label htmlFor="email" className="register-label">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={input.email}
          className="register-input"
          onChange={handleInputChange}
        />
      </div>

      {/* Password */}
      <div className="register-field-password">
        <label htmlFor="password" className="register-label">
          Password
        </label>
        <div className="register-password-wrapper">
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            value={input.password}
            className="register-input-password"
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="register-toggle-btn"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        onClick={handleRegister}
        className="register-submit"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
