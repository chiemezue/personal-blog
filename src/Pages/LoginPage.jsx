import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleEye = () => setShow((prev) => !prev);

  const handleInputChange = (eOrValue) => {
    const { name, value } = eOrValue.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 2500);
  };

  const resetForm = () => {
    setLoginData({
      username: "",
      password: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      showMessage("Please fill in empty fields", "error");
      return;
    }

    try {
      const formData = {
        username: loginData.username,
        password: loginData.password,
      };
      const res = await axios.post(`${apiUrl}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = res.data;
        showMessage(data.message, "success");
        resetForm();
        window.localStorage.setItem("token", data.user);
        window.localStorage.setItem("userType", data.user.userType);
        window.localStorage.setItem("loggedIn", "true");

        if (data.user.userType === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      if (error.response.status === 404) {
        showMessage(error.response.data.error, "error");
      } else if (error.response.status === 401) {
        showMessage(error.response.data.error, "error");
      } else {
        showMessage("Something Went Wrong", "error");
      }
    } finally {
      setLoading(false);
    }
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
          value={loginData.username}
          onChange={handleInputChange}
          type="text"
          name="username"
          id="username"
          className="register-input"
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
            value={loginData.password}
            onChange={handleInputChange}
            name="password"
            id="password"
            className="register-input-password"
          />
          <button
            type="button"
            onClick={handleEye}
            className="register-toggle-btn"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button type="submit" onClick={handleLogin} className="register-submit">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
