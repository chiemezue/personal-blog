import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Upload, FileText, Eye, Edit, Trash2, Tag, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { BlogContext } from "../Components/BlogContext";
import { useContext } from "react";
import axios from "axios";

const AdminPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { blog, setBlog } = useContext(BlogContext);
  // TINY MCE SETUP
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    content: "",
    readingTime: "",
    status: "published",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Form handlers
  const handleInputChange = (eOrValue, editorName) => {
    if (typeof eOrValue === "string") {
      setFormData((prev) => ({
        ...prev,
        [editorName]: eOrValue,
      }));
    } else {
      const { name, value } = eOrValue.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.subtitle ||
      !formData.category ||
      !formData.content
    ) {
      showMessage("Please fill in all required fields.", "error");
      return;
    }

    if (!selectedImage) {
      showMessage("Please select an image for your blog post.", "error");
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("content", formData.content);
      formDataToSend.append(
        "readingTime",
        formData.readingTime || calculateReadingTime(formData.content)
      );
      formDataToSend.append("image", selectedImage);

      const res = await axios.post(`${apiUrl}/api/submitBlog`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        showMessage("Blog post created successfully!", "success");
        resetForm();
      } else {
        showMessage("Failed to create blog. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error submitting form ", error);
      showMessage("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      category: "",
      content: "",
      readingTime: "",
      status: "published",
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStats = () => {
    const total = blog.length;
    return { total };
  };

  // MODAL & DELETE
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const stats = getStats();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-end max-w-7xl m-3 items-center space-x-4 ">
        <span className="text-sm text-gray-600">Welcome, Admin</span>
        <Link to="/">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
            View Site
          </button>
        </Link>
        <Link to="/manage-posts">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Manage Posts
          </button>
        </Link>
      </div>

      {/* Success/Error Messages */}
      {message.text && (
        <div
          className={`fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Upload Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Create New Blog Post
              </h2>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Blog Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your blog title..."
                  />
                </div>

                {/* SubTitle */}
                <div>
                  <label
                    htmlFor="subtitle"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subtitle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your description..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="mental-health">Mental Health</option>
                    <option value="personal-growth">Personal Growth</option>
                    <option value="wellness">Wellness</option>
                    <option value="mindfulness">Mindfulness</option>
                  </select>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or WEBP (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!imagePreview}
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Blog Content */}
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Blog Content <span className="text-red-500">*</span>
                  </label>

                  <Editor
                    id="content"
                    name="content"
                    value={formData.content}
                    onEditorChange={(content) =>
                      handleInputChange(content, "content")
                    }
                    required
                    apiKey="cz7u885fl5244rtj0r961mcvi6hsjjieagavh88du2dfe6v7"
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>

                {/* Reading Time */}
                <div>
                  <label
                    htmlFor="readingTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Estimated Reading Time (minutes)
                  </label>
                  <input
                    type="number"
                    id="readingTime"
                    name="readingTime"
                    value={formData.readingTime}
                    onChange={handleInputChange}
                    min="1"
                    max="60"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Auto-calculated if left empty"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Reset Form
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`px-6 py-2 rounded-md text-white transition-colors ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700"
                    }`}
                  >
                    {loading ? "Publishing..." : "Publish Post"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Posts Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Recent Posts
              </h2>

              <div className="space-y-4">
                {blog.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No posts yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Create your first blog post to see it here.
                    </p>
                  </div>
                ) : (
                  blog
                    .slice(-3)
                    .reverse()
                    .map((post) => (
                      <div
                        key={post.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(post.dateCreated)}
                            </p>
                            <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Tag className="h-3 w-3 mr-1" />
                                {post.category}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {post.readingTime}min
                              </span>
                            </div>
                            <div className="mt-2">
                              <span
                                className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                  post.status === "published"
                                    ? "bg-green-100 text-green-800"
                                    : post.status === "draft"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {post.status}
                              </span>
                            </div>
                          </div>
                          <div className="ml-2 flex space-x-1">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(post.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Are you sure?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This action cannot be undone. Do you really want to delete
                    this blog?
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

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Posts</span>
                  <span className="text-sm font-medium text-gray-900">
                    {stats.total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
