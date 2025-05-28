import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import SimpleCard from '../../../components/simpleCard';
import { FaUsers, FaClipboardList, FaGavel, FaImage, FaBookOpen } from 'react-icons/fa';

const BACKEND_URL = 'http://localhost:5000';

const admissionTypes = [
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'Manage the admission page hero section',
    icon: <FaImage className="text-5xl text-red-600" />, color: 'bg-red-50'
  },
  {
    id: 'criteria',
    name: 'Criteria',
    description: 'Manage admission criteria',
    icon: <FaClipboardList className="text-5xl text-blue-600" />, color: 'bg-blue-50'
  },
  {
    id: 'policy',
    name: 'Policies',
    description: 'Manage admission policies',
    icon: <FaGavel className="text-5xl text-green-600" />, color: 'bg-green-50'
  },
  {
    id: 'admission',
    name: 'Admissions',
    description: 'Manage admission programs',
    icon: <FaBookOpen className="text-5xl text-purple-600" />, color: 'bg-purple-50'
  }
];

const AdmissionUpdate = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [showHeroForm, setShowHeroForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    content: '',
    startDate: '',
    endDate: '',
    seats: '',
    duration: '',
    buttonText: 'View Admissions',
    buttonLink: '/admission',
    status: 'active',
  });
  const [editingId, setEditingId] = useState(null);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    if (selectedType) {
      if (selectedType === 'hero') {
        fetchHeroData();
      } else {
        fetchItems();
      }
    }
  }, [selectedType]);

  const fetchHeroData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admission-hero`);
      if (response.data.success && response.data.data) {
        setHeroData(response.data.data);
        setFormData({
          title: response.data.data.title || '',
          description: response.data.data.description || '',
          buttonText: response.data.data.buttonText || 'View Admissions',
          buttonLink: response.data.data.buttonLink || '/admission',
          type: 'hero',
        });
        if (response.data.data.imageUrl) {
          setPreviewImage(`${BACKEND_URL}${response.data.data.imageUrl}`);
        }
        setEditingId(response.data.data._id);
      } else {
        setHeroData(null);
      }
    } catch (error) {
      setHeroData(null);
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admissions?type=${selectedType}`);
      if (response.data.success) {
        setItems(response.data.data || []);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', selectedType);
      formDataToSend.append('content', formData.content || '');
      
      if (selectedType === 'admission') {
        formDataToSend.append('startDate', formData.startDate);
        formDataToSend.append('endDate', formData.endDate);
        formDataToSend.append('seats', formData.seats);
        formDataToSend.append('duration', formData.duration);
      }
      
      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      let response;
      
      if (editingId) {
        response = await axios.put(`${BACKEND_URL}/api/admissions/${editingId}`, formDataToSend, config);
      } else {
        response = await axios.post(`${BACKEND_URL}/api/admissions`, formDataToSend, config);
      }

      if (response.data.success) {
        await fetchItems();
        resetForm();
        setIsModalOpen(false);
        alert('Item saved successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to save item');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await axios.delete(`${BACKEND_URL}/api/admissions/${id}`);
        if (response.data.success) {
          await fetchItems();
          alert('Item deleted successfully!');
        } else {
          throw new Error(response.data.message || 'Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title || '',
      description: item.description || '',
      content: item.content || '',
      startDate: item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '',
      endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '',
      seats: item.seats || '',
      duration: item.duration || '',
      status: item.status || 'active',
      type: selectedType
    });
    setEditingId(item._id);
    if (item.image) {
      setPreviewImage(getImageUrl(item.image));
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: selectedType || '',
      description: '',
      content: '',
      startDate: '',
      endDate: '',
      seats: '',
      duration: '',
      buttonText: 'View Admissions',
      buttonLink: '/admission',
      status: 'active',
    });
    setEditingId(null);
    setSelectedFile(null);
    setPreviewImage('');
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('buttonText', formData.buttonText);
      formDataToSend.append('buttonLink', formData.buttonLink);
      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      let response;
      if (heroData) {
        response = await axios.put(`${BACKEND_URL}/api/admission-hero`, formDataToSend, config);
      } else {
        response = await axios.post(`${BACKEND_URL}/api/admission-hero`, formDataToSend, config);
      }
      await fetchHeroData();
      setShowHeroForm(false);
      resetForm();
      alert('Hero section saved successfully!');
    } catch (error) {
      console.error('Error saving hero section:', error);
      alert('Error saving hero section: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteHero = async () => {
    if (window.confirm('Are you sure you want to delete the hero section?')) {
      try {
        await axios.delete(`${BACKEND_URL}/api/admission-hero/${heroData._id}`);
        setHeroData(null);
        resetForm();
      } catch (error) {
        console.error('Error deleting hero section:', error);
      }
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  if (loading && selectedType) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admission Content Management</h2>
        {selectedType && selectedType !== 'hero' && (
          <div className="flex gap-4">
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add New {admissionTypes.find(t => t.id === selectedType)?.name.slice(0, -1) || 'Item'}
            </button>
            <button
              onClick={() => setSelectedType(null)}
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Back to Categories
            </button>
          </div>
        )}
        {selectedType === 'hero' && (
          <div className="flex gap-4">
            {!heroData && (
              <button
                onClick={() => setShowHeroForm(true)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Create Hero Section
              </button>
            )}
            <button
              onClick={() => setSelectedType(null)}
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Back to Categories
            </button>
          </div>
          )}
        </div>

      {!selectedType ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {admissionTypes.map((type) => (
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
      ) : selectedType === 'hero' ? (
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
                    onClick={() => {
                      setFormData({
                        title: heroData.title,
                        description: heroData.description,
                        buttonText: heroData.buttonText,
                          buttonLink: heroData.buttonLink,
                          type: 'hero'
                      });
                        setPreviewImage(getImageUrl(heroData.imageUrl));
                        setEditingId(heroData._id);
                      setShowHeroForm(true);
                    }}
                      className="text-yellow-500 hover:text-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteHero}
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
              <p className="text-gray-500">No hero section found. Click "Create Hero Section" to add one.</p>
          </div>
        )}

        {showHeroForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {heroData ? 'Edit Hero Section' : 'Create Hero Section'}
                </h3>
                <button
                  onClick={() => {
                    resetForm();
                    setShowHeroForm(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleHeroSubmit} className="space-y-6">
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
                    placeholder="View Admissions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <input
                    type="text"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="/admission"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <div className="flex items-center space-x-4">
                      {previewImage && (
                      <div className="w-32 h-32 relative">
                        <img
                            src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                              setPreviewImage('');
                              setSelectedFile(null);
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
                      required={!heroData}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowHeroForm(false);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    {heroData ? 'Update' : 'Create'} Hero Section
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <SimpleCard
              key={item._id}
              bgColor="bg-white"
              className="p-4 shadow hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 mb-4">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-1">{item.description}</p>
                {selectedType === 'admission' && (
                  <>
                    <p className="text-gray-600 mb-1">Seats: {item.seats}</p>
                    <p className="text-gray-600 mb-1">Duration: {item.duration}</p>
                    <p className="text-gray-600 mb-1">Start: {item.startDate ? new Date(item.startDate).toLocaleDateString() : ''}</p>
                    <p className="text-gray-600 mb-1">End: {item.endDate ? new Date(item.endDate).toLocaleDateString() : ''}</p>
                  </>
                )}
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </SimpleCard>
          ))}
        </div>
      )}

      {/* Modal for regular items */}
      {isModalOpen && selectedType !== 'hero' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingId ? 'Edit' : 'Create'} {admissionTypes.find(t => t.id === selectedType)?.name.slice(0, -1) || selectedType}
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
              {selectedType === 'admission' && (
                <>
          <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
                    <input
                      type="number"
                      value={formData.seats}
                      onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
              className="w-full p-2 border rounded"
              required
                    />
          </div>
              <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-2 border rounded"
                      required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full p-2 border rounded"
                      required
                />
              </div>
            </>
          )}
              {(selectedType === 'policy' || selectedType === 'criteria') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detail</label>
            <Editor
              apiKey="kgpqgw1s9eih5wsa0zyh7vz5god2gdybhz7wlnq8ojbnzl57"
              value={formData.content}
              onEditorChange={(content) => setFormData({ ...formData, content })}
              init={{
                      height: 200,
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
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <div className="flex items-center space-x-4">
                  {previewImage && (
                    <div className="w-32 h-32 relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                        onClick={() => {
                          setPreviewImage('');
                          setSelectedFile(null);
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
            {editingId ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionUpdate;