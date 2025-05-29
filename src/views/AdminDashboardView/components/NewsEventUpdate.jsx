import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/simpleCard';
import Button from '../../../components/button';
import Heading from '../../../components/heading';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import SimpleCard from '../../../components/simpleCard';
import { FaRegNewspaper, FaCalendarAlt, FaImage } from 'react-icons/fa';
import ImageCard from '../../../components/imageCard';
import ContentSection from '../../../components/contextSection';
import newsandevents from '../../../assets/newsandevents.jpg';

const BACKEND_URL = 'http://localhost:5000';

const NewsEventUpdate = () => {
    const [data, setData] = useState({
        news: [],
        events: []
    });
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        description: '', // Only for events
        date: '', // Only for events
        image: null,
        content: '', // TinyMCE details
        type: 'news',
    });
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [detailsContent, setDetailsContent] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('news');
    const [isEditMode, setIsEditMode] = useState(false);
    const [heroData, setHeroData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        buttonText: 'Read More',
        buttonLink: '/news/allnews',
        _id: null
    });
    const [showHeroForm, setShowHeroForm] = useState(false);
    const [selectedHeroImage, setSelectedHeroImage] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [editingId, setEditingId] = useState(null);

    const contentTypes = [
        {
            id: 'hero',
            name: 'Hero Section',
            description: 'Manage the news & events page hero section',
            icon: <FaImage className="text-5xl text-red-600" />,
            color: 'bg-red-50'
        },
        {
            id: 'news',
            name: 'News',
            description: 'Manage news articles and updates',
            icon: <FaRegNewspaper className="text-5xl text-blue-600" />,
            color: 'bg-blue-50'
        },
        {
            id: 'event',
            name: 'Events',
            description: 'Manage upcoming and past events',
            icon: <FaCalendarAlt className="text-5xl text-green-600" />,
            color: 'bg-green-50'
        }
    ];

    useEffect(() => {
        fetchData();
        fetchHeroData();
        
        // Add event listener to debug date input issues
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                console.log('Date input value changed:', e.target.value);
            });
        });
    }, []);
    
    // This effect runs whenever formData.date changes
    useEffect(() => {
        if (isEditMode && formData.date) {
            console.log('Setting date input value in useEffect:', formData.date);
            setTimeout(() => {
                const dateInput = document.querySelector('input[type="date"]');
                if (dateInput) {
                    dateInput.value = formData.date;
                    console.log('Date input value set to:', dateInput.value);
                }
            }, 100);
        }
    }, [formData.date, isEditMode, showForm]);

    const fetchData = async () => {
        try {
            setLoading(true);
            
            // Fetch news and events separately using their specific endpoints
            const newsResponse = await axios.get(`${BACKEND_URL}/api/news-events/news/list`);
            const eventsResponse = await axios.get(`${BACKEND_URL}/api/news-events/events/list`);
            
            console.log('Raw news response:', newsResponse.data);
            console.log('Raw events response:', eventsResponse.data);
            
            // Get the data arrays with proper fallbacks
            const newsItems = (newsResponse.data?.data || newsResponse.data || []).filter(item => item !== null);
            const eventItems = (eventsResponse.data?.data || eventsResponse.data || []).filter(item => item !== null);
            
            console.log('Processed news items:', newsItems);
            console.log('Processed event items:', eventItems);
            
            // Update state with the separated data
            setData({
                news: newsItems || [],
                events: eventItems || []
            });
        } catch (err) {
            console.error('Error fetching data:', err);
            toast.error('Failed to fetch data');
            // Set empty arrays as fallback
            setData({
                news: [],
                events: []
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchHeroData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/hero-section`);
            if (response.data && response.data.data) {
                setHeroData(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching hero data:', err);
            toast.error('Failed to fetch hero section data');
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    
    // Helper to format image URL
    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return '/placeholder-image.jpg';
        // Make sure we handle the URL correctly
        if (imageUrl.startsWith('http')) return imageUrl;
        if (imageUrl.startsWith('/uploads')) return `${BACKEND_URL}${imageUrl}`;
        return `${BACKEND_URL}/uploads/cultural/${imageUrl}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            
            // Basic fields that are always required
            formDataToSend.append('title', formData.title);
            formDataToSend.append('type', selectedType === 'news' ? 'news' : 'event');
            formDataToSend.append('content', formData.content || '');

            // Handle description field
            if (formData.description) {
                formDataToSend.append('description', formData.description);
                                }

            // Handle date field for events
            if (selectedType === 'event' && formData.date) {
                formDataToSend.append('date', formData.date);
                        }
            
            // Handle image
            if (selectedFile) {
                formDataToSend.append('image', selectedFile);
            }

            // Log what we're sending
            console.log('Form data to be sent:', {
                title: formData.title,
                type: selectedType === 'news' ? 'news' : 'event',
                description: formData.description,
                content: formData.content,
                date: formData.date,
                hasImage: !!selectedFile,
                isEdit: !!formData._id
            });

            let response;
            
            if (formData._id) {
                // Update existing item
                console.log('Updating existing item with ID:', formData._id);
                response = await axios.put(
                    `${BACKEND_URL}/api/news-events/${formData._id}`, 
                    formDataToSend,
                    { 
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
            } else {
                // Create new item
                const endpoint = selectedType === 'news' ? 'news' : 'events';
                console.log('Creating new item of type:', endpoint);
                response = await axios.post(
                    `${BACKEND_URL}/api/news-events/${endpoint}/create`, 
                    formDataToSend,
                    { 
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
            }

            console.log('Server response:', response.data);
            
            if (response.data.success) {
                toast.success(`${selectedType === 'news' ? 'News' : 'Event'} ${formData._id ? 'updated' : 'created'} successfully`);
                await fetchData(); // Refresh the data
                setIsModalOpen(false);
            resetForm();
            } else {
                throw new Error(response.data.message || 'Operation failed');
            }
        } catch (err) {
            console.error('Full error details:', err);
            console.error('Error response:', err.response?.data);
            toast.error(err.response?.data?.message || err.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        
        setLoading(true);
        try {
            await axios.delete(`${BACKEND_URL}/api/news-events/${id}`);
            
            // Update local state safely
            setData(prevData => {
                // Make sure we have the array before filtering
                const currentArray = prevData[type] || [];
                return {
                ...prevData,
                    [type]: currentArray.filter(item => item && item._id !== id)
                };
            });
            
            toast.success('Item deleted successfully');
            
            // Refresh data to ensure UI is in sync
            await fetchData();
        } catch (err) {
            console.error('Error deleting item:', err);
            toast.error('Failed to delete item');
            // Refresh data in case of error
            await fetchData();
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            title: '',
            description: '',
            date: '',
            content: '',
            type: selectedType === 'news' ? 'news' : 'event'
        });
        setSelectedFile(null);
        setPreviewImage('');
        setEditingId(null);
        setIsEditMode(false);
    };
    
    const handleEdit = (item, type) => {
        console.log('Editing item:', item);
        console.log('Item image path:', item.image);
        
        let formattedDate = '';
        if (item.date) {
            try {
                formattedDate = new Date(item.date).toISOString().split('T')[0];
            } catch (err) {
                console.error('Error formatting date:', err);
            }
        }
        
        // Set form data with all fields from the item
            setFormData({
                _id: item._id,
            title: item.title || '',
                description: item.description || '',
                date: formattedDate,
                content: item.content || '',
            type: type === 'news' ? 'news' : 'event'
            });
            
        // Set preview image if exists
        if (item.image) {
            const imageUrl = getImageUrl(item.image);
            console.log('Setting preview image URL:', imageUrl);
            setPreviewImage(imageUrl);
        } else {
            setPreviewImage('');
        }
        
        setEditingId(item._id); // Set the editing ID
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleHeroSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', heroData.title);
            formData.append('description', heroData.description);
            formData.append('buttonText', heroData.buttonText);
            formData.append('buttonLink', heroData.buttonLink);
            if (selectedHeroImage) {
                formData.append('image', selectedHeroImage);
            }

            const response = await axios.put(`${BACKEND_URL}/api/hero-section`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data && response.data.success) {
                toast.success('Hero section updated successfully');
                setShowHeroForm(false);
                setSelectedHeroImage(null);
                fetchHeroData(); // Refresh hero data
            } else {
                throw new Error('Failed to update hero section');
            }
        } catch (err) {
            console.error('Error updating hero section:', err);
            toast.error(err.response?.data?.error || 'Failed to update hero section');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteHero = async () => {
        if (!window.confirm('Are you sure you want to delete the hero section?')) return;
        
        try {
            await axios.delete(`${BACKEND_URL}/api/hero-section/${heroData._id}`);
            toast.success('Hero section deleted successfully');
            setHeroData({
                title: '',
                description: '',
                imageUrl: '',
                buttonText: 'Read More',
                buttonLink: '/news/allnews',
                _id: null
            });
        } catch (err) {
            console.error('Error deleting hero section:', err);
            toast.error('Failed to delete hero section');
        }
    };

    if (loading && selectedType) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">News & Events Management</h2>
                </div>

            {!selectedType ? (
                // Main Type Selection Cards
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contentTypes.map((type) => (
                        <div
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`${type.color} rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform`}
                >
                            <div className="mb-4">{type.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                            <p className="text-gray-600">{type.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={() => setSelectedType(null)}
                            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                        >
                            Back to Categories
                        </button>
                        {selectedType !== 'hero' && (
                            <button
                                onClick={() => {
                                    resetForm();
                                    setIsModalOpen(true);
                                }}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                            >
                                Add New {selectedType === 'news' ? 'News' : 'Event'}
                            </button>
                        )}
            </div>

                    {selectedType === 'hero' ? (
                        // Hero Section Content
                        <div>
                            {heroData ? (
                    <SimpleCard className="bg-white p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3">
                                <img
                                    src={getImageUrl(heroData.imageUrl)}
                                    alt="Hero section"
                                    className="w-full h-48 object-cover rounded"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/placeholder-image.jpg';
                                    }}
                                />
                            </div>
                            <div className="md:w-2/3">
                                <h3 className="text-xl font-bold mb-2">{heroData.title}</h3>
                                <p className="text-gray-600 mb-4">{heroData.description}</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                <span>Button Text:</span>
                                                <span className="font-medium">{heroData.buttonText}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                                <span>Button Link:</span>
                                                <span className="font-medium">{heroData.buttonLink}</span>
                                </div>
                                            <div className="flex justify-end gap-4">
                                                <button
                                        onClick={() => setShowHeroForm(true)}
                                                    className="text-yellow-500 hover:text-yellow-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(heroData._id)}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    Delete
                                                </button>
                                </div>
                            </div>
                        </div>
                    </SimpleCard>
                            ) : (
                                <div className="text-center py-12">
                        <button
                                        onClick={() => setShowHeroForm(true)}
                                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                                    >
                                        Create Hero Section
                        </button>
                                </div>
                            )}
                                </div>
                    ) : (
                        // News/Events Grid
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data[selectedType === 'news' ? 'news' : 'events'] && 
                             data[selectedType === 'news' ? 'news' : 'events'].length > 0 ? (
                                data[selectedType === 'news' ? 'news' : 'events'].map((item) => (
                                    <SimpleCard key={item._id} className="bg-white p-4">
                                        <div className="relative h-48 mb-4">
                                            <img
                                                src={item.image ? getImageUrl(item.image) : '/placeholder-image.jpg'}
                                                alt={item.title}
                                                className="w-full h-full object-cover rounded"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                            {selectedType === 'events' && item.date && (
                                                <div className="absolute top-0 left-4 bg-black text-white px-4 py-2 rounded-b-lg">
                                                    <div className="text-lg font-bold">
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <p className="text-gray-600 mb-4">{item.description}</p>
                                            <div className="flex justify-end gap-4">
                                                <button
                                                    onClick={() => handleEdit(item, selectedType)}
                                                    className="text-yellow-500 hover:text-yellow-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id, selectedType)}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </SimpleCard>
                                ))
                            ) : (
                                <div className="text-center py-8 w-full">
                                    <p className="text-gray-500">No {selectedType} available</p>
                                </div>
                            )}
                            </div>
                    )}
                </div>
            )}

            {/* Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">
                                {editingId ? 'Edit' : 'Create'} {selectedType === 'news' ? 'News' : 'Event'}
                            </h3>
                        <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    resetForm();
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                        <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                                value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                {selectedType === 'event' && (
                                        <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                                <input 
                                            type="date"
                                            value={formData.date}
                                                        onChange={(e) => {
                                                console.log('Date changed:', e.target.value);
                                                setFormData({ ...formData, date: e.target.value });
                                                        }}
                                            className="w-full p-2 border rounded"
                                                        required
                                        />
                                        </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                    <div className="space-y-4">
                                        {previewImage && (
                                            <div className="relative">
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded"
                                                    onError={(e) => {
                                                        console.error('Image load error:', e);
                                                        e.target.src = '/placeholder-image.jpg';
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setPreviewImage('');
                                                        setSelectedFile(null);
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-full p-2 border rounded"
                                        accept="image/*"
                                            required={!editingId && !previewImage}
                                            />
                                        </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                    <Editor
                                        apiKey="kgpqgw1s9eih5wsa0zyh7vz5god2gdybhz7wlnq8ojbnzl57"
                                        value={formData.content}
                                        onEditorChange={(content) => setFormData({ ...formData, content })}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-start mt-6">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 mr-4"
                                >
                                    {editingId ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        resetForm();
                                    }}
                                    className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Hero Form Modal */}
            {showHeroForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h3 className="text-xl font-bold mb-4">
                            {heroData ? 'Edit Hero Section' : 'Create Hero Section'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-2 border rounded h-32"
                                    required
                                                />
                                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                                <input
                                    type="text"
                                    value={formData.buttonText}
                                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                    className="w-full p-2 border rounded"
                                        />
                                    </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                                <input
                                    type="text"
                                    value={formData.buttonLink}
                                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded"
                                    accept="image/*"
                                />
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="mt-2 w-full h-48 object-cover rounded"
                                    />
                        )}
                    </div>
                            <div className="flex justify-start">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 mr-4"
                                >
                                    {heroData ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                            onClick={() => {
                                        setShowHeroForm(false);
                                        resetForm();
                                            }}
                                    className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsEventUpdate;