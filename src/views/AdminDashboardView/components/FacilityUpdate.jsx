import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacilityUpdate = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState('hero');
  const [formData, setFormData] = useState({
    heading: '',
    title: '',
    description: '',
    image: null,
    imageUrl: '',
    status: 'active',
    buttonText: '',
    buttonLink: '',
    facilityType: 'hero'
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const facilityTypes = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'library', name: 'Library' },
    { id: 'transport', name: 'Transport' },
    { id: 'sports', name: 'Sports & Fitness' },
    { id: 'masjid', name: 'Masjid' },
    { id: 'hostel', name: 'Hostel' },
    { id: 'dispensary', name: 'Dispensary' },
    { id: 'canteen', name: 'Canteen' },
    { id: 'computer-lab', name: 'Computer Lab' }
  ];

  useEffect(() => {
    fetchItems();
  }, [selectedFacility]);

  const fetchItems = async () => {
    try {
      let endpoint = selectedFacility === 'hero' 
        ? 'http://localhost:8000/api/facility-hero'
        : `http://localhost:8000/api/facility?type=${selectedFacility}`;
      
      const response = await axios.get(endpoint);
      setItems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      setLoading(false);
    }
  };

  const handleFacilityTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedFacility(newType);
    resetForm();
    setFormData(prev => ({
      ...prev,
      facilityType: newType
    }));
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

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
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
      let imageUrl = formData.imageUrl;

      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append('file', formData.image);
        imageFormData.append('upload_preset', 'facilities_unsigned');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dkcdjdlqs/image/upload',
          imageFormData
        );

        imageUrl = response.data.secure_url;
      }

      const facilityData = {
        ...formData,
        imageUrl,
      };
      delete facilityData.image;

      const endpoint = selectedFacility === 'hero'
        ? 'http://localhost:8000/api/facility-hero'
        : 'http://localhost:8000/api/facility';

      if (editingId) {
        await axios.put(`${endpoint}/${editingId}`, facilityData);
      } else {
        await axios.post(endpoint, facilityData);
      }
      
      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Error saving facility:', error);
      alert('Error saving facility: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        const endpoint = selectedFacility === 'hero'
          ? `http://localhost:8000/api/facility-hero/${id}`
          : `http://localhost:8000/api/facility/${id}`;
        
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
      heading: item.heading || '',
      title: item.title || '',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      status: item.status || 'active',
      buttonText: item.buttonText || '',
      buttonLink: item.buttonLink || '',
      facilityType: selectedFacility
    });
    setPreviewImage(item.imageUrl || '');
    setEditingId(item._id);
  };

  const resetForm = () => {
    setFormData({
      heading: '',
      title: '',
      description: '',
      image: null,
      imageUrl: '',
      status: 'active',
      buttonText: '',
      buttonLink: '',
      facilityType: selectedFacility
    });
    setEditingId(null);
    setPreviewImage('');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Facility Management</h2>
      
      {/* Facility Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Facility Type</label>
        <select
          value={selectedFacility}
          onChange={handleFacilityTypeChange}
          className="w-full p-2 border rounded bg-white"
        >
          {facilityTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
          </div>

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

          <div className="md:col-span-2">
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <div className="flex items-center space-x-4">
              {(previewImage || formData.imageUrl) && (
                <div className="w-32 h-32 relative">
                  <img
                    src={previewImage || formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage('');
                      setFormData(prev => ({ ...prev, image: null, imageUrl: '' }));
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
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            {editingId ? 'Update' : 'Create'} Facility
          </button>
        </div>
      </form>

      {/* Facilities List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.heading}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-black hover:text-gray-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilityUpdate; 