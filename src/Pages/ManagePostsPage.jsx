import React, { useContext, useState } from "react";
import { BlogContext } from "../Components/BlogContext";
import { Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ManagePostsPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { blog, setBlog } = useContext(BlogContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${apiUrl}/blogs/${selectedId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBlog((prev) => prev.filter((post) => post.id !== selectedId));
        showMessage("Blog deleted successfully!", "success");
      } else {
        showMessage("Failed to delete blog", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showMessage("Something went wrong.", "error");
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <Link
          to="/admin"
          className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Admin
        </Link>
      </div>

      {/* Success/Error Messages */}
      {message.text && (
        <div
          className={`mb-4 p-4 rounded-md shadow ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        {blog.length === 0 ? (
          <p className="text-gray-500">No posts available.</p>
        ) : (
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Subtitle</th>
                <th className="text-center p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blog.map((post) => (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{post.id}</td>
                  <td className="p-3 text-gray-900 font-medium">
                    {post.title}
                  </td>
                  <td className="p-3 text-gray-600">{post.subtitle}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDeleteClick(post.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Do you really want to delete this
              blog?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePostsPage;
