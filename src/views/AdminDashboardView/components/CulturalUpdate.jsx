import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/simpleCard';
import Button from '../../../components/button';
import Heading from '../../../components/heading';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const BACKEND_URL = 'http://localhost:5000';

const CulturalUpdate = () => {
    const [data, setData] = useState({
        activities: []
    });
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        video: null,
        image: null
    });
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewVideo, setPreviewVideo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news-events/cultural/list');
            setData({
                activities: response.data?.data || []
            });
        } catch (err) {
            console.error('Error fetching data:', err);
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleVideoChange = (e) => {
        setSelectedVideo(e.target.files[0]);
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleEdit = (item) => {
        setFormData({
            title: item.title,
            content: item.content,
            video: item.video,
            image: item.image
        });
        setPreviewImage(item.image ? `${BACKEND_URL}${item.image}` : null);
        setPreviewVideo(item.video ? `${BACKEND_URL}${item.video}` : null);
        setEditingId(item._id);
        setIsEditing(true);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content);

            // Only append files if new ones are selected
            if (selectedVideo) {
                formDataToSend.append('video', selectedVideo);
            }
            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            }

            // If editing, keep existing files if no new ones are selected
            if (isEditing) {
                if (!selectedVideo && formData.video) {
                    formDataToSend.append('video', formData.video);
                }
                if (!selectedImage && formData.image) {
                    formDataToSend.append('image', formData.image);
                }
            }

            const url = isEditing
                ? `${BACKEND_URL}/api/news-events/cultural/${editingId}`
                : `${BACKEND_URL}/api/news-events/cultural/create`;

            const method = isEditing ? 'put' : 'post';

            const response = await axios[method](url, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log('Server response:', response.data);
            toast.success(`Cultural activity ${isEditing ? 'updated' : 'created'} successfully`);
            fetchData();
            resetForm();
            setShowForm(false);
        } catch (err) {
            console.error('Error with cultural activity:', {
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                message: err.message
            });
            toast.error(`Failed to ${isEditing ? 'update' : 'create'} cultural activity: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this activity?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/news-events/cultural/${id}`);
            toast.success('Activity deleted successfully');
            fetchData();
        } catch (err) {
            console.error('Error deleting activity:', err);
            toast.error('Failed to delete activity');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            video: null,
            image: null
        });
        setSelectedFile(null);
        setSelectedVideo(null);
        setSelectedImage(null);
        setPreviewImage(null);
        setPreviewVideo(null);
        setIsEditing(false);
        setEditingId(null);
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <Heading title="Cultural Activities Management" />
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    <FiPlus className="w-5 h-5" />
                    <span>Add Cultural</span>
                </button>
            </div>

            {/* Form Section */}
            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-all duration-300">
                    <h2 className="text-xl font-semibold mb-4">
                        {isEditing ? 'Edit Cultural Activity' : 'Add New Cultural Activity'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image Upload</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {previewImage && (
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Image:</label>
                                        <img
                                            src={previewImage}
                                            alt="Current"
                                            className="w-full max-h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Video Upload</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {previewVideo && (
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Video:</label>
                                        <video
                                            src={previewVideo}
                                            controls
                                            className="w-full max-h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Content</label>
                                <Editor
                                    apiKey="kgpqgw1s9eih5wsa0zyh7vz5god2gdybhz7wlnq8ojbnzl57"
                                    value={formData.content}
                                    onEditorChange={(content) => setFormData({ ...formData, content })}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'link', 'lists', 'autolink', 'table', 'code'
                                        ],
                                        toolbar: 'undo redo | bold italic underline | bullist numlist | link | table | code | removeformat',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    resetForm();
                                    setShowForm(false);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : isEditing ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Cultural Activities List */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.activities.map((item) => (
                        <Card key={item._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="relative group">
                                {item.image ? (
                                    <img
                                        src={`${BACKEND_URL}${item.image}`}
                                        alt={item.title}
                                        className="w-full h-56 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-400">No image available</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 bg-white text-blue-600 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300"
                                        title="Edit"
                                    >
                                        <FiEdit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 bg-white text-red-600 rounded-full shadow-lg hover:bg-red-50 transition-all duration-300"
                                        title="Delete"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">{item.title}</h3>
                                <div
                                    className="prose max-w-none mb-4 text-gray-600 line-clamp-3 text-sm"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                                {item.video && (
                                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-100">
                                        <video
                                            src={`${BACKEND_URL}${item.video}`}
                                            controls
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
                {data.activities.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No cultural activities found</p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                            <FiPlus className="w-5 h-5" />
                            <span>Add your first cultural activity</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CulturalUpdate;