import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [singleBlog, setSingleBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const res = await fetch(`${apiUrl}/blogs/${id}`);
        const data = await res.json();
        setSingleBlog(data);
      } catch (error) {
        console.error("The error is ", error);
      }
    };

    fetchSingleBlog();
  }, [id]);

  // ✅ Handle loading state
  if (!singleBlog) {
    return <p className="text-center text-gray-500">Loading blog...</p>;
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
