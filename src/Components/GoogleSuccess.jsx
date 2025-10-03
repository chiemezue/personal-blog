import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleSuccess = ({ setIsLoggedIn, setUserType }) => {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const name = params.get("name");
    const email = params.get("email");
    const picture = params.get("picture");
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userType", "user");
      localStorage.setItem("user", JSON.stringify({ name, email, picture }));

      // update React state directly ✅
      setIsLoggedIn(true);
      setUserType("user");

      navigate("/");
    }
  }, [search, navigate, setIsLoggedIn, setUserType]);

  return <p>Logging you in...</p>;
};

export default GoogleSuccess;
