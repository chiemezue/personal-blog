import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "./BlogContext";
import SkeletonLoader from "./SkeletonLoader"; // skeleton component

const RecentPost = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { blog, loading } = useContext(BlogContext);

  return (
    <section className="recent-wrapper">
      <h2 className="recent-title">Recent Posts</h2>
      <div>
        {loading ? (
          <SkeletonLoader count={4} /> // display skeleton while loading
        ) : (
          blog
            .slice(-4)
            .reverse()
            .map((post, index) => (
              <Link to={`/blogs/${post.id}`} key={post.id}>
                <div
                  className="recent-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 200} // stagger animations (0ms, 200ms, 400ms, 600ms)
                >
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
            ))
        )}
      </div>
    </section>
  );
};

export default RecentPost;
