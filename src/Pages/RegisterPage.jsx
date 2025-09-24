import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, showMessage] = useState(null);

  const handleRegister = () => {
    if (!input.username || !input.email || !input.password) {
      showMessage("Please fill in the blank fields");
      return;
    }
  };

  const togglePassword = () => setShow((prev) => !prev);

  return (
    <div className="register-container">
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
      <input type="submit" value="Register" className="register-submit" />
    </div>
  );
};

export default RegisterPage;
