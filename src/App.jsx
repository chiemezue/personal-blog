import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import BlogPage from "./Pages/BlogPage";
import ContactPage from "./Pages/ContactPage";
import AboutPage from "./Pages/AboutPage";
import AdminPage from "./Pages/AdminPage";
import { BlogContext } from "./Components/BlogContext";
import ScrollToTop from "./Components/ScrollToTopButton";
import SinglePage from "./Pages/SinglePage";
import ManagePostsPage from "./Pages/ManagePostsPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./Pages/ProtectedRoute";

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Login state managed via React state
  const [user, setUser] = useState(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      return {
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        userType: localStorage.getItem("userType"),
      };
    }
    return null;
  });

  // ✅ Handle Google login redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const userTypeFromGoogle = params.get("userType");

    if (token && email) {
      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", name);
      localStorage.setItem("email", email);
      localStorage.setItem("userType", userTypeFromGoogle || "user");
      localStorage.setItem("loggedIn", "true");

      // Update React state
      setUser({
        username: name,
        email,
        userType: userTypeFromGoogle || "user",
      });

      // Clean up URL
      window.history.replaceState({}, document.title, "/");
    }
  }, [location.search]);

  // ✅ Fetch blog posts
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/blogs`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [apiUrl]);

  return (
    <BlogContext.Provider value={{ blog, setBlog, loading }}>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        {!user && (
          <>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
          </>
        )}

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="/login" element={<Navigate to="/" />} />

          {user?.userType === "admin" ? (
            <>
              <Route path="/admin" element={<AdminPage blog={blog} />} />
              <Route path="/manage-posts" element={<ManagePostsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blogs/:id" element={<SinglePage />} />
            </>
          ) : (
            <>
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blogs/:id" element={<SinglePage />} />
            </>
          )}
        </Route>
      </Routes>

      <ScrollToTop />
      {user && <Footer />}
    </BlogContext.Provider>
  );
};

export default App;
