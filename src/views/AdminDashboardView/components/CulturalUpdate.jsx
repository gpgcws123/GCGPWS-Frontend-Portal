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
        description: '',
        content: '', // For TinyMCE content
        category: '',
        date: '',
        venue: '',
        time: '',
        participants: '',
        organizer: '',
        status: 'active'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/cultural/list`);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });
            if (selectedFile) {
                formDataToSend.append('image', selectedFile);
            }

            await axios.post(`${BACKEND_URL}/api/cultural/create`, formDataToSend);

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
            await axios.delete(`${BACKEND_URL}/api/cultural/${id}`);
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
            description: '',
            content: '',
            category: '',
            date: '',
            venue: '',
            time: '',
            participants: '',
            organizer: '',
            status: 'active'
        });
        setSelectedFile(null);
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="p-6">
            <Heading title="Cultural Activities Management" className="mb-8" />

            {/* Add Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="dance">Dance</option>
                            <option value="music">Music</option>
                            <option value="drama">Drama</option>
                            <option value="art">Art</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Time</label>
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Venue</label>
                        <input
                            type="text"
                            value={formData.venue}
                            onChange={(e) => setFormData({...formData, venue: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Organizer</label>
                        <input
                            type="text"
                            value={formData.organizer}
                            onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Participants</label>
                        <input
                            type="text"
                            value={formData.participants}
                            onChange={(e) => setFormData({...formData, participants: e.target.value})}
                            className="w-full p-2 border rounded"
                            placeholder="Enter participants (comma separated)"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                            accept="image/*"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block mb-2">Short Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-2 border rounded"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block mb-2">Detailed Content</label>
                        <Editor
                            apiKey="your-tinymce-api-key"
                            value={formData.content}
                            onEditorChange={(content) => setFormData({...formData, content})}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                                    'codesample'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'codesample | bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'table link | removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                codesample_languages: [
                                    { text: 'HTML/XML', value: 'markup' },
                                    { text: 'JavaScript', value: 'javascript' },
                                    { text: 'CSS', value: 'css' },
                                    { text: 'PHP', value: 'php' },
                                    { text: 'Python', value: 'python' },
                                    { text: 'Java', value: 'java' },
                                    { text: 'C', value: 'c' },
                                    { text: 'C++', value: 'cpp' }
                                ]
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