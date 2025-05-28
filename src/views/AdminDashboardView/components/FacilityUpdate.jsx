import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000'; // Add backend URL constant

const FacilityUpdate = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    heading: '',
    description: '',
    content: '',
    image: null,
    status: 'active',
    type: '',
    buttonText: '',
    buttonLink: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroSection, setHeroSection] = useState(null);

  const facilityTypes = [
    { id: 'hero', name: 'Hero Section', icon: '🏛️' },
    { id: 'library', name: 'Library', icon: '📚' },
    { id: 'transport', name: 'Transport', icon: '🚌' },
    { id: 'sports', name: 'Sports & Fitness', icon: '⚽' },
    { id: 'masjid', name: 'Masjid', icon: '🕌' },
    { id: 'hostel', name: 'Hostel', icon: '🏠' },
    { id: 'dispensary', name: 'Dispensary', icon: '💊' },
    { id: 'canteen', name: 'Canteen', icon: '🍽️' },
    { id: 'computerLab', name: 'Computer Lab', icon: '💻' }
  ];

  useEffect(() => {
    if (selectedFacility === 'hero') {
      fetchHeroSection();
    } else if (selectedFacility) {
      fetchItems();
    }
  }, [selectedFacility]);

  const fetchHeroSection = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/facility-hero`);
      if (response.data && response.data.data) {
        const heroData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
        setHeroSection(heroData);
        setItems([heroData]); // Keep items state in sync
      }
    } catch (error) {
      console.error('Error fetching hero section:', error);
      alert('Error fetching hero section: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/facility?type=${selectedFacility}`);

      if (response.data && response.data.data) {
        const items = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        // Log fetched items
        console.log('Fetched items:', items);
        setItems(items);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
      alert('Error fetching facilities: ' + (error.response?.data?.message || error.message));
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFacilityTypeSelect = (facilityType) => {
    setSelectedFacility(facilityType.id);
    setFormData(prev => ({
      ...prev,
      type: facilityType.id
    }));

    // If hero section is selected and exists, open edit modal
    if (facilityType.id === 'hero') {
      fetchHeroSection();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      if (file.size > 5000000) {
        throw new Error('File size must be less than 5MB');
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('File must be JPG, PNG or JPEG');
      }

      // Log file details
      console.log('Selected file:', {
        name: file.name,
        type: file.type,
        size: file.size
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        console.log('Preview image set');
      };
      reader.readAsDataURL(file);

      setFormData(prev => ({
        ...prev,
        image: file
      }));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      if (selectedFacility === 'hero') {
        formDataToSend.append('heading', formData.heading);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('buttonText', formData.buttonText);
        formDataToSend.append('buttonLink', formData.buttonLink);
        formDataToSend.append('status', formData.status);
      } else {
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('content', formData.content || formData.description);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('type', selectedFacility);
      }

      // Log the image being uploaded
      console.log('Image being uploaded:', formData.image);

      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      }

      const endpoint = selectedFacility === 'hero'
        ? `${BACKEND_URL}/api/facility-hero`
        : `${BACKEND_URL}/api/facility`;

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      let response;
      if (editingId) {
        response = await axios.put(`${endpoint}/${editingId}`, formDataToSend, config);
      } else {
        response = await axios.post(endpoint, formDataToSend, config);
      }

      // Log the response to see what we get back
      console.log('Server response:', response.data);

      await fetchItems();
      resetForm();
      setIsModalOpen(false);
      alert('Facility saved successfully!');
    } catch (error) {
      console.error('Error saving facility:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.error || error.message;
      alert('Error saving facility: ' + errorMessage);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        const endpoint = selectedFacility === 'hero'
          ? `${BACKEND_URL}/api/facility-hero/${id}`
          : `${BACKEND_URL}/api/facility/${id}`;

        await axios.delete(endpoint);
        fetchItems();
      } catch (error) {
        console.error('Error deleting facility:', error);
        alert('Error deleting facility: ' + error.message);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title || '',
      heading: item.heading || '',
      description: item.description || '',
      content: item.content || '',
      status: item.status || 'active',
      type: selectedFacility,
      buttonText: item.buttonText || '',
      buttonLink: item.buttonLink || ''
    });

    // Fix image preview URL
    if (selectedFacility === 'hero') {
      setPreviewImage(item.imageUrl ? `${BACKEND_URL}${item.imageUrl}` : '');
    } else {
      setPreviewImage(item.images && item.images.length > 0 ? `${BACKEND_URL}${item.images[0]}` : '');
    }

    setEditingId(item._id);
    setIsModalOpen(true);
  };

  const handleNewFacility = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      heading: '',
      description: '',
      content: '',
      image: null,
      status: 'active',
      type: selectedFacility || '',
      buttonText: '',
      buttonLink: ''
    });
    setEditingId(null);
    setPreviewImage('');
  };

  const ImageWithFallback = ({ src, alt, className }) => {
    const [error, setError] = useState(false);
    const [imageUrl, setImageUrl] = useState(src);

    useEffect(() => {
      setImageUrl(src);
      setError(false);
    }, [src]);

    if (error || !imageUrl) {
      return (
        <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-500 text-sm">Image Not Available</span>
        </div>
      );
    }

    return (
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        onError={() => {
          console.log('Image failed to load:', imageUrl);
          setError(true);
        }}
      />
    );
  };

  if (loading && selectedFacility) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Facility Management</h2>
        {selectedFacility && (
          <div className="flex gap-4">
            {selectedFacility !== 'hero' && (
              <button
                onClick={handleNewFacility}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Add New {facilityTypes.find(t => t.id === selectedFacility)?.name || 'Facility'}
              </button>
            )}
            <button
              onClick={() => setSelectedFacility(null)}
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Back to Facilities
            </button>
          </div>
        )}
      </div>

      {!selectedFacility ? (
        // Facility Type Cards Grid
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilityTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleFacilityTypeSelect(type)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform"
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
              <p className="text-gray-600">
                {type.id === 'hero' ? 'Click to edit hero section' : `Click to manage ${type.name.toLowerCase()}`}
              </p>
            </div>
          ))}
        </div>
      ) : (
        // Existing Items Grid
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {facilityTypes.find(t => t.id === selectedFacility)?.name || 'Facilities'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              // Log each item's image URL
              console.log('Item image URL:', selectedFacility === 'hero' ? item.imageUrl : (item.images && item.images[0]));

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleEdit(item)}
                >
                  <div className="relative h-48">
                    {selectedFacility === 'hero' ? (
                      <ImageWithFallback
                        src={item.imageUrl ? `${BACKEND_URL}${item.imageUrl}` : ''}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageWithFallback
                        src={item.images && item.images.length > 0 ? `${BACKEND_URL}${item.images[0]}` : ''}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <span
                      className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="p-4">
                    {selectedFacility === 'hero' && (
                      <div className="text-sm text-gray-500 mb-2">
                        {item.heading}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                    {selectedFacility === 'hero' && (
                      <div className="text-xs text-gray-500">
                        Button: {item.buttonText} → {item.buttonLink}
                      </div>
                    )}
                    {selectedFacility !== 'hero' && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id);
                          }}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal for Edit/Create Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingId ? 'Edit' : 'Create'} {selectedFacility === 'hero' ? 'Hero Section' : 'Facility'}
              </h3>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedFacility === 'hero' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
                  <input
                    type="text"
                    value={formData.heading}
                    onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              )}

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
                  rows="4"
                  required
                />
              </div>

              {selectedFacility !== 'hero' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                  />
                </div>
              )}

              {selectedFacility === 'hero' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                    <input
                      type="text"
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <div className="flex items-center space-x-4">
                  {previewImage && (
                    <div className="w-32 h-32 relative">
                      <ImageWithFallback
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage('');
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="flex-1"
                    accept="image/*"
                    required={!editingId}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  {editingId ? 'Update' : 'Create'} {selectedFacility === 'hero' ? 'Hero Section' : 'Facility'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityUpdate;