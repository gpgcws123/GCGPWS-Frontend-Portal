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
            
            // Fetch news and events separately
            const newsResponse = await axios.get(`${BACKEND_URL}/api/news-events/news/list`);
            const eventsResponse = await axios.get(`${BACKEND_URL}/api/news-events/events/list`);
            
            console.log('Raw news response:', newsResponse.data);
            console.log('Raw events response:', eventsResponse.data);
            
            // Get the data arrays
            const newsItems = newsResponse.data?.data || [];
            const eventItems = eventsResponse.data?.data || [];
            
            console.log('News items count:', newsItems.length);
            console.log('Event items count:', eventItems.length);
            
            // Update state with the separated data
            setData({
                news: newsItems,
                events: eventItems
            });
        } catch (err) {
            console.error('Error fetching data:', err);
            toast.error('Failed to fetch data');
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
        return `${BACKEND_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            
            // Add all form fields to FormData except special handling fields
            Object.keys(formData).forEach(key => {
                // Skip special fields that need custom handling
                if (key !== 'existingImage') {
                    if (formData[key] !== null && formData[key] !== undefined) {
                        // Special handling for date field
                        if (key === 'date' && formData[key]) {
                            // Make sure date is in ISO format for the backend
                            try {
                                const dateObj = new Date(formData[key]);
                                if (!isNaN(dateObj.getTime())) {
                                    // Format as ISO string but only keep the date part
                                    formDataToSend.append(key, dateObj.toISOString().split('T')[0]);
                                    console.log('Formatted date for submission:', dateObj.toISOString().split('T')[0]);
                                } else {
                                    formDataToSend.append(key, formData[key]);
                                }
                            } catch (e) {
                                console.error('Error formatting date for submission:', e);
                                formDataToSend.append(key, formData[key]);
                            }
                        } else {
                            formDataToSend.append(key, formData[key]);
                        }
                    }
                }
            });
            
            // Add image file if selected
            if (selectedFile) {
                formDataToSend.append('image', selectedFile);
                console.log('New image file selected for upload');
            } else if (isEditMode && formData.existingImage) {
                // If no new image is selected but we're editing and have an existing image,
                // pass the existing image path
                formDataToSend.append('image', formData.existingImage);
                console.log('Using existing image:', formData.existingImage);
            }

            // Log the form data for debugging
            console.log('Form data being sent:', Object.fromEntries(formDataToSend));
            
            const endpoint = formData.type === 'news' ? 'news' : 'events';
            let response;
            
            if (isEditMode && formData._id) {
                // Update existing item
                response = await axios.put(
                    `${BACKEND_URL}/api/news-events/${formData._id}`, 
                    formDataToSend,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                toast.success(`${formData.type === 'news' ? 'News' : 'Event'} updated successfully`);
            } else {
                // Create new item
                response = await axios.post(
                    `${BACKEND_URL}/api/news-events/${endpoint}/create`, 
                    formDataToSend,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                toast.success(`${formData.type === 'news' ? 'News' : 'Event'} created successfully`);
            }

            console.log('Response:', response.data);
            
            // Refresh data and reset form
            await fetchData();
            setShowForm(false);
            resetForm();
        } catch (err) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} item:`, err);
            toast.error(`Failed to ${isEditMode ? 'update' : 'create'} item: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        
        setLoading(true);
        try {
            const endpoint = type === 'news' ? 'news' : 'events';
            await axios.delete(`${BACKEND_URL}/api/news-events/${id}`);
            
            // Update local state immediately
            setData(prevData => ({
                ...prevData,
                [type === 'news' ? 'news' : 'events']: prevData[type === 'news' ? 'news' : 'events'].filter(item => item._id !== id)
            }));
            
            toast.success('Item deleted successfully');
        } catch (err) {
            console.error('Error deleting item:', err);
            toast.error('Failed to delete item');
            // Refresh data in case of error to ensure UI is in sync
            fetchData();
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
            image: null,
            content: '',
            type: 'news',
            existingImage: ''
        });
        setSelectedFile(null);
        setIsEditMode(false);
    };
    
    const handleEdit = (item, type) => {
        // When editing, keep the existing image path
        console.log('Editing item:', item);
        
        // Format the date properly for the date input field
        let formattedDate = '';
        if (item.date) {
            try {
                // Try to parse the date and format it as YYYY-MM-DD for the date input
                let dateObj;
                
                // Check if the date is already in YYYY-MM-DD format
                if (/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
                    formattedDate = item.date;
                    console.log('Date already in correct format:', formattedDate);
                } else {
                    // Try to parse the date
                    dateObj = new Date(item.date);
                    if (!isNaN(dateObj.getTime())) { // Check if date is valid
                        // Add timezone offset to get the correct date
                        const offset = dateObj.getTimezoneOffset();
                        dateObj = new Date(dateObj.getTime() - (offset * 60 * 1000));
                        formattedDate = dateObj.toISOString().split('T')[0];
                        console.log('Formatted date for edit form:', formattedDate);
                    } else {
                        console.warn('Invalid date value:', item.date);
                    }
                }
            } catch (err) {
                console.error('Error formatting date:', err);
            }
        } else {
            console.warn('No date found in item');
        }
        
        // Force a delay to ensure the form is mounted before setting the date
        setTimeout(() => {
            setFormData({
                _id: item._id,
                title: item.title,
                description: item.description || '',
                date: formattedDate,
                content: item.content || '',
                type: type,
                existingImage: item.image || ''
            });
            
            // Force update the date input field directly
            const dateInput = document.querySelector('input[type="date"]');
            if (dateInput && formattedDate) {
                dateInput.value = formattedDate;
                console.log('Directly set date input value to:', formattedDate);
            }
        }, 100);
        
        setIsEditMode(true);
        setFormType(type);
        setShowForm(true);
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

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="p-6">
            <Heading title="News & Events Management" className="mb-8" />
            
            {/* Management Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Hero Section Card */}
                <div
                    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition"
                    onClick={() => setShowHeroForm(true)}
                >
                    <FaImage size={48} className="mb-4 text-purple-500" />
                    <h2 className="text-xl font-bold mb-2">Hero Section</h2>
                    <p className="text-gray-600">Update hero section content</p>
                </div>

                {/* News Card */}
                <div
                    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition"
                    onClick={() => { setShowForm(true); setFormType('news'); setFormData({ ...formData, type: 'news' }); }}
                >
                    <FaRegNewspaper size={48} className="mb-4 text-blue-500" />
                    <h2 className="text-xl font-bold mb-2">Add News</h2>
                    <p className="text-gray-600">Click to add a news item</p>
                </div>

                {/* Events Card */}
                <div
                    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition"
                    onClick={() => { setShowForm(true); setFormType('event'); setFormData({ ...formData, type: 'event' }); }}
                >
                    <FaCalendarAlt size={48} className="mb-4 text-green-500" />
                    <h2 className="text-xl font-bold mb-2">Add Event</h2>
                    <p className="text-gray-600">Click to add an event</p>
                </div>
            </div>

            {/* Hero Section Display Card */}
            {heroData._id && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Current Hero Section</h2>
                    <SimpleCard className="bg-white p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Image */}
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
                            {/* Content */}
                            <div className="md:w-2/3">
                                <h3 className="text-xl font-bold mb-2">{heroData.title}</h3>
                                <p className="text-gray-600 mb-4">{heroData.description}</p>
                                <div className="mb-4">
                                    <p className="text-sm font-semibold">Button Text: <span className="font-normal">{heroData.buttonText}</span></p>
                                    <p className="text-sm font-semibold">Button Link: <span className="font-normal">{heroData.buttonLink}</span></p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        title="Edit"
                                        onClick={() => setShowHeroForm(true)}
                                        className="bg-yellow-500 hover:bg-yellow-600"
                                    />
                                    <Button
                                        title="Delete"
                                        onClick={handleDeleteHero}
                                        className="bg-red-500 hover:bg-red-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </SimpleCard>
                </div>
            )}

            {/* Hero Section Form Modal */}
            {showHeroForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
                        <button
                            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
                            onClick={() => {
                                setShowHeroForm(false);
                                setSelectedHeroImage(null);
                            }}
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            {heroData._id ? 'Update Hero Section' : 'Create Hero Section'}
                        </h2>
                        <form onSubmit={handleHeroSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={heroData.title}
                                        onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Description</label>
                                    <textarea
                                        value={heroData.description}
                                        onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                                        className="w-full p-2 border rounded h-32"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Button Text</label>
                                    <input
                                        type="text"
                                        value={heroData.buttonText}
                                        onChange={(e) => setHeroData({...heroData, buttonText: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        placeholder="Read More"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Button Link</label>
                                    <input
                                        type="text"
                                        value={heroData.buttonLink}
                                        onChange={(e) => setHeroData({...heroData, buttonLink: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        placeholder="/news/allnews"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Hero Image</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setSelectedHeroImage(e.target.files[0])}
                                        className="w-full p-2 border rounded"
                                        accept="image/*"
                                    />
                                    {(heroData.imageUrl || selectedHeroImage) && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600 mb-2">
                                                {selectedHeroImage ? 'New Image Preview:' : 'Current Image:'}
                                            </p>
                                            <img
                                                src={selectedHeroImage 
                                                    ? URL.createObjectURL(selectedHeroImage)
                                                    : getImageUrl(heroData.imageUrl)}
                                                alt="Hero preview"
                                                className="w-full h-40 object-cover rounded"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-4 mt-6 justify-center">
                                <Button
                                    title={loading ? 'Saving...' : 'Save Changes'}
                                    type="submit"
                                    disabled={loading}
                                />
                                <Button
                                    title="Cancel"
                                    type="button"
                                    onClick={() => {
                                        setShowHeroForm(false);
                                        setSelectedHeroImage(null);
                                    }}
                                    className="bg-gray-400 hover:bg-gray-500"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Existing News/Events Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative animate-fadeIn">
                        <button
                            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 focus:outline-none"
                            onClick={() => { setShowForm(false); resetForm(); }}
                            aria-label="Close"
                        >✖</button>
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            {formType === 'news' ? 'Add News' : 'Add Event'}
                        </h2>
                        <form onSubmit={handleSubmit}>
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
                                {formType === 'event' && (
                                    <>
                                        <div>
                                            <label className="block mb-2">Description</label>
                                            <input
                                                type="text"
                                                value={formData.description}
                                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2">Date</label>
                                            <div className="flex flex-col">
                                                {/* Hidden date input for form submission */}
                                                <input 
                                                    type="hidden" 
                                                    name="date" 
                                                    value={formData.date || ''} 
                                                />
                                                
                                                {/* Visible date inputs */}
                                                <div className="flex gap-2">
                                                    <select 
                                                        className="p-2 border rounded w-1/3"
                                                        value={formData.date ? new Date(formData.date).getFullYear() : ''}
                                                        onChange={(e) => {
                                                            const year = e.target.value;
                                                            const currentDate = formData.date ? new Date(formData.date) : new Date();
                                                            currentDate.setFullYear(year);
                                                            setFormData({...formData, date: currentDate.toISOString().split('T')[0]});
                                                        }}
                                                        required
                                                    >
                                                        <option value="">Year</option>
                                                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
                                                            <option key={year} value={year}>{year}</option>
                                                        ))}
                                                    </select>
                                                    
                                                    <select 
                                                        className="p-2 border rounded w-1/3"
                                                        value={formData.date ? new Date(formData.date).getMonth() + 1 : ''}
                                                        onChange={(e) => {
                                                            const month = parseInt(e.target.value) - 1;
                                                            const currentDate = formData.date ? new Date(formData.date) : new Date();
                                                            currentDate.setMonth(month);
                                                            setFormData({...formData, date: currentDate.toISOString().split('T')[0]});
                                                        }}
                                                        required
                                                    >
                                                        <option value="">Month</option>
                                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                                                            <option key={month} value={index + 1}>{month}</option>
                                                        ))}
                                                    </select>
                                                    
                                                    <select 
                                                        className="p-2 border rounded w-1/3"
                                                        value={formData.date ? new Date(formData.date).getDate() : ''}
                                                        onChange={(e) => {
                                                            const day = parseInt(e.target.value);
                                                            const currentDate = formData.date ? new Date(formData.date) : new Date();
                                                            currentDate.setDate(day);
                                                            setFormData({...formData, date: currentDate.toISOString().split('T')[0]});
                                                        }}
                                                        required
                                                    >
                                                        <option value="">Day</option>
                                                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                                            <option key={day} value={day}>{day}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                
                                                {isEditMode && formData.date && (
                                                    <p className="text-xs text-gray-500 mt-1">Current date: {formData.date}</p>
                                                )}
                                            </div>
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
                                    {isEditMode && formData.existingImage && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                                            <img 
                                                src={getImageUrl(formData.existingImage)} 
                                                alt="Current image" 
                                                className="w-full h-32 object-cover rounded border"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block mb-2">Details</label>
                                    <Editor
                                        apiKey="kgpqgw1s9eih5wsa0zyh7vz5god2gdybhz7wlnq8ojbnzl57"
                                        value={formData.content}
                                        onEditorChange={(content) => setFormData({...formData, content})}
                                        init={{
                                            height: 300,
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
                            <div className="flex gap-4 mt-6 justify-center">
                                <Button
                                    title={loading ? 'Saving...' : 'Save'}
                                    type="submit"
                                    disabled={loading}
                                    className=""
                                />
                                <Button
                                    title="Cancel"
                                    type="button"
                                    onClick={() => { setShowForm(false); resetForm(); }}
                                    className="bg-gray-400 hover:bg-gray-500"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* News and Events Sections */}
            <div className="flex flex-col space-y-12">
                {/* News Section */}
                <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <FaRegNewspaper className="mr-2 text-blue-500" /> News Section
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.news && data.news.length > 0 ? (
                            data.news.map((item) => (
                                <SimpleCard key={item._id} className="bg-white shadow-lg">
                                    <img
                                        src={item.image ? getImageUrl(item.image) : '/placeholder-image.jpg'}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">{item.description}</p>
                                        <div className="flex justify-end items-center mb-2">
                                            <div className="flex gap-2">
                                                <Button
                                                    title="Edit"
                                                    onClick={() => handleEdit(item, 'news')}
                                                    className="bg-yellow-500 hover:bg-yellow-600"
                                                />
                                                <Button
                                                    title="Delete"
                                                    onClick={() => handleDelete(item._id, 'news')}
                                                    className="bg-red-500 hover:bg-red-600"
                                                />
                                            </div>
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
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-8">
                                <p className="text-gray-500">No news items available</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Events Section */}
                <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <FaCalendarAlt className="mr-2 text-green-500" /> Events Section
                    </h2>
                    <div className="w-full flex flex-wrap justify-center gap-6">
                        {data.events && data.events.length > 0 ? (
                            data.events.map((item, index) => (
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
                                            src={item.image ? getImageUrl(item.image) : '/placeholder-image.jpg'}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-t-[10px]"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                        {item.date && (
                                            <div className="absolute top-0 left-4 bg-black text-white px-4 py-2 rounded-b-[10px] text-center">
                                                <div className="font-bold text-[22px]">
                                                    {(() => {
                                                        try {
                                                            const dateObj = new Date(item.date);
                                                            if (!isNaN(dateObj.getTime())) {
                                                                return dateObj.getDate().toString().padStart(2, '0');
                                                            }
                                                            return '--';
                                                        } catch (e) {
                                                            console.error('Error parsing date:', e);
                                                            return '--';
                                                        }
                                                    })()}
                                                </div>
                                                <div className="text-base">
                                                    {(() => {
                                                        try {
                                                            const dateObj = new Date(item.date);
                                                            if (!isNaN(dateObj.getTime())) {
                                                                return dateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
                                                            }
                                                            return 'Invalid date';
                                                        } catch (e) {
                                                            console.error('Error parsing date:', e);
                                                            return 'Invalid date';
                                                        }
                                                    })()}
                                                </div>
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
                                        <div className="flex gap-2">
                                            <Button
                                                title="Edit"
                                                onClick={() => handleEdit(item, 'event')}
                                                className="bg-yellow-500 hover:bg-yellow-600"
                                            />
                                            <Button
                                                title="Delete"
                                                onClick={() => handleDelete(item._id, 'event')}
                                                className="bg-red-500 hover:bg-red-600"
                                            />
                                        </div>
                                    </div>
                                </SimpleCard>
                            ))
                        ) : (
                            <div className="text-center py-8 w-full">
                                <p className="text-gray-500">No events available</p>
                            </div>
                        )}
                    </div>
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