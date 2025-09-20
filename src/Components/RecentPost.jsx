import React from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "./BlogContext";
import { useContext } from "react";

const RecentPost = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { blog } = useContext(BlogContext);
  return (
    <section className="recent-wrapper">
      <h2 className="recent-title">Recent Posts</h2>
      <div>
        {blog
          .slice(-4)
          .reverse()
          .map((post, key) => (
            // <PostCard key={index} {...post} />
            <Link to={`/blogs/${post.id}`}>
              <div key={post.id} className="recent-card">
                {/* Left image */}
                <img
                  src={`${apiUrl}/images/${post.imagePath}`}
                  alt={post.title}
                  className="recent-img"
                />
                {/* Right content */}
                <div className="recent-content">
                  <p className="recent-meta">
                    {post.date} · {post.readTime}
                  </p>
                  <h3 className="recent-post-title">{post.title}</h3>
                  <div
                    className="recent-subtitle"
                    dangerouslySetInnerHTML={{ __html: post.subtitle }}
                  ></div>

                  <hr className="recent-divider" />
                  <p className="recent-comments">0 Comments</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default RecentPost;
