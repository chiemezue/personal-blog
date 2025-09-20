import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "./BlogContext";
import SkeletonLoader from "./SkeletonLoader";

const RecentPost = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { blog, loading } = useContext(BlogContext);

  if (loading) {
    // Show skeleton loader while fetching blogs
    return <SkeletonLoader count={4} height="h-32" />;
  }

  return (
    <section className="recent-wrapper">
      <h2 className="recent-title">Recent Posts</h2>
      <div className="space-y-4">
        {blog
          .slice(-4)
          .reverse()
          .map((post) => (
            <Link to={`/blogs/${post.id}`} key={post.id}>
              <div className="recent-card flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                {/* Left image */}
                <img
                  src={`${apiUrl}/images/${post.imagePath}`}
                  alt={post.title}
                  className="recent-img w-24 h-24 object-cover rounded"
                />

                {/* Right content */}
                <div className="recent-content flex-1">
                  <p className="recent-meta text-sm text-gray-500">
                    {post.date} · {post.readTime}
                  </p>
                  <h3 className="recent-post-title font-semibold text-lg mt-1">
                    {post.title}
                  </h3>
                  <div
                    className="recent-subtitle text-gray-600 mt-1"
                    dangerouslySetInnerHTML={{ __html: post.subtitle }}
                  ></div>

                  <hr className="recent-divider my-2 border-gray-300" />
                  <p className="recent-comments text-sm text-gray-400">
                    0 Comments
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default RecentPost;
