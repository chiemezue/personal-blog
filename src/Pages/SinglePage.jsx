import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SkeletonLoader from "../Components/SkeletonLoader"; // import your skeleton

const SinglePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [singleBlog, setSingleBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Scroll to top when navigating to this page
    window.scrollTo(0, 0);

    const fetchSingleBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/blogs/${id}`);
        const data = await res.json();
        setSingleBlog(data);
      } catch (error) {
        console.error("The error is ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id]);

  // ✅ Show skeleton while loading
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <SkeletonLoader count={1} /> {/* single blog skeleton */}
      </div>
    );
  }

  if (!singleBlog) {
    return <p className="text-center text-gray-500">Blog not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={`${apiUrl}/images/${singleBlog.imagePath}`}
        alt={singleBlog.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{singleBlog.title}</h1>
      <h2 className="text-xl text-gray-600 mb-4">{singleBlog.subtitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: singleBlog.content }} />
    </div>
  );
};

export default SinglePage;
