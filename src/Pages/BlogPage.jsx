import React, { useContext } from "react";
import { BlogContext } from "../Components/BlogContext";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const { blog } = useContext(BlogContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <>
      <div className="blog-container">
        <h2 className="blog-header">All Posts</h2>
        <div className="blog-grid">
          {blog.map((post) => (
            <Link to={`/blogs/${post.id}`}>
              <div key={post.id} className="blog-card">
                <img
                  src={`${apiUrl}/images/${post.imagePath}`}
                  alt={post.title}
                  className="blog-image"
                />
                <div className="blog-content">
                  <div className="blog-meta">
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-description">{post.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
