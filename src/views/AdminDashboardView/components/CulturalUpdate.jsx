import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/simpleCard';
import Button from '../../../components/button';
import Heading from '../../../components/heading';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';

const BACKEND_URL = 'http://localhost:8000';

const CulturalUpdate = () => {
    const [data, setData] = useState({
        activities: []
    });
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '', // For TinyMCE content
        video: null // For video upload
    });
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/news-events/cultural/list');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('content', formData.content);
            if (selectedVideo) {
                formDataToSend.append('video', selectedVideo);
            }
            await axios.post('http://localhost:8000/api/news-events/cultural/create', formDataToSend);
            toast.success('Cultural activity created successfully');
            fetchData();
            resetForm();
        } catch (err) {
            console.error('Error creating cultural activity:', err);
            toast.error('Failed to create cultural activity');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this activity?')) return;

        try {
            await axios.delete(`http://localhost:8000/api/news-events/cultural/${id}`);
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
            video: null
        });
        setSelectedFile(null);
        setSelectedVideo(null);
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="p-6">
            <Heading title="Cultural Activities Management" className="mb-8" />

            {/* Add Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Video Upload</label>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Detailed Content</label>
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
                <Button
                    title={loading ? 'Saving...' : 'Save'}
                    type="submit"
                    disabled={loading}
                    className="mt-4"
                />
            </form>

            {/* Cultural Activities List */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Cultural Activities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.activities.map((item) => (
                        <Card key={item._id} className="bg-white shadow-lg">
                            <img
                                src={`${BACKEND_URL}${item.imageUrl}`}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <div className="text-sm text-gray-500 mb-2">
                                    <p>Category: {item.category}</p>
                                    <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                                    <p>Time: {item.time}</p>
                                    <p>Venue: {item.venue}</p>
                                    <p>Organizer: {item.organizer}</p>
                                    <p>Participants: {item.participants}</p>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        title="Delete"
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 hover:bg-red-600"
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CulturalUpdate; 