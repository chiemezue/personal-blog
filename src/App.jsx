import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    if (blog.length === 0) {
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
    }
  }, [apiUrl, blog.length]);

  return (
    <BlogContext.Provider value={{ blog, setBlog, loading }}>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage blog={blog} />} />
        <Route path="/blogs/:id" element={<SinglePage />} />
        <Route path="/manage-posts" element={<ManagePostsPage />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </BlogContext.Provider>
  );
};

export default App;
