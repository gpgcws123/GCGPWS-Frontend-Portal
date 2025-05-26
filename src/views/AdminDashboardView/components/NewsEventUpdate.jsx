import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/simpleCard';
import Button from '../../../components/button';
import Heading from '../../../components/heading';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import SimpleCard from '../../../components/simpleCard';

const BACKEND_URL = 'http://localhost:8000';

const NewsEventUpdate = () => {
    const [data, setData] = useState({
        news: [],
        events: []
    });
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '', // For TinyMCE content
        type: 'news',
        date: '',
        venue: '', // For events
        time: '', // For events
        organizer: '', // For events
        status: 'active'
    });
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [detailsContent, setDetailsContent] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [newsRes, eventsRes] = await Promise.all([
                axios.get(`${BACKEND_URL}/api/news/list`),
                axios.get(`${BACKEND_URL}/api/events/list`)
            ]);

            setData({
                news: newsRes.data?.data || [],
                events: eventsRes.data?.data || []
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

            const endpoint = formData.type === 'news' ? 'news' : 'events';
            await axios.post(`${BACKEND_URL}/api/${endpoint}/create`, formDataToSend);

            toast.success(`${formData.type === 'news' ? 'News' : 'Event'} created successfully`);
            fetchData();
            resetForm();
        } catch (err) {
            console.error('Error creating item:', err);
            toast.error('Failed to create item');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            const endpoint = type === 'news' ? 'news' : 'events';
            await axios.delete(`${BACKEND_URL}/api/${endpoint}/${id}`);
            toast.success('Item deleted successfully');
            fetchData();
        } catch (err) {
            console.error('Error deleting item:', err);
            toast.error('Failed to delete item');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            content: '',
            type: 'news',
            date: '',
            venue: '',
            time: '',
            organizer: '',
            status: 'active'
        });
        setSelectedFile(null);
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="p-6">
            <Heading title="News & Events Management" className="mb-8" />

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
                        <label className="block mb-2">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full p-2 border rounded"
                        >
                            <option value="news">News</option>
                            <option value="event">Event</option>
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
                    {formData.type === 'event' && (
                        <>
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
                        </>
                    )}
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

            {/* News List */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.news.map((item) => (
                        <SimpleCard key={item._id} className="bg-white shadow-lg">
                            <img
                                src={`${BACKEND_URL}${item.imageUrl}`}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                                    <Button
                                        title="Delete"
                                        onClick={() => handleDelete(item._id, 'news')}
                                        className="bg-red-500 hover:bg-red-600"
                                    />
                                </div>
                                <Button
                                    title="View Details"
                                    onClick={() => {
                                        setDetailsContent(item.content);
                                        setDetailsModalOpen(true);
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 w-full mt-2"
                                />
                            </div>
                        </SimpleCard>
                    ))}
                </div>
            </div>

            {/* Events List */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Events</h2>
                <div className="w-full flex flex-wrap justify-center gap-6">
                    {data.events.map((item, index) => (
                        <SimpleCard
                          bgColor="bg-gray"
                          key={item._id}
                          boxShadow={false}
                          width="w-[400px]"
                          height="h-[500px]"
                          className="!p-0 flex flex-col justify-between"
                        >
                          <div className="relative w-full h-[250px]">
                            <img
                              src={`${BACKEND_URL}${item.imageUrl}`}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-t-[10px]"
                            />
                            {item.date && (
                              <div className="absolute top-0 left-4 bg-black text-white px-4 py-2 rounded-b-[10px] text-center">
                                <div className="font-bold text-[22px]">{new Date(item.date).getDate().toString().padStart(2, '0')}</div>
                                <div className="text-base">{new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' })}</div>
                              </div>
                            )}
                          </div>
                          <div className="p-2 text-center">
                            <h2 className="text-[26px] font-jakarta font-semibold leading-8 mb-2">
                              {item.title}
                            </h2>
                            <p className="text-[18px] font-light font-poppins leading-6">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex justify-between px-4 pb-4 gap-2">
                            <Button
                              title="View Details"
                              onClick={() => {
                                setDetailsContent(item.content);
                                setDetailsModalOpen(true);
                              }}
                              className="bg-blue-500 hover:bg-blue-600"
                            />
                            <Button
                              title="Delete"
                              onClick={() => handleDelete(item._id, 'event')}
                              className="bg-red-500 hover:bg-red-600"
                            />
                          </div>
                        </SimpleCard>
                    ))}
                </div>
            </div>

            {/* Details Modal */}
            {detailsModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative">
                        <button
                            className="absolute top-2 right-2 text-2xl"
                            onClick={() => setDetailsModalOpen(false)}
                        >✖</button>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: detailsContent }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsEventUpdate; 