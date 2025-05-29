import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleCard from '../../../components/simpleCard';
import { FaBook, FaStickyNote, FaVideo, FaImage } from 'react-icons/fa';

const BACKEND_URL = 'http://localhost:5000';

const StudentPortalUpdate = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    type: 'book',
    description: '',
    author: '',
    subject: '',
    category: '',
    duration: '',  // for lectures
    level: '',     // academic level (e.g., Intermediate, Graduate)
  });
  const [editingId, setEditingId] = useState(null);

  const resourceTypes = [
    {
      id: 'hero',
      name: 'Hero Section',
      description: 'Manage the student portal hero section',
      icon: <FaImage className="text-5xl text-red-600" />,
      color: 'bg-red-50'
    },
    {
      id: 'book',
      name: 'Books',
      description: 'Manage academic books and references',
      icon: <FaBook className="text-5xl text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      id: 'note',
      name: 'Notes',
      description: 'Manage study notes and materials',
      icon: <FaStickyNote className="text-5xl text-green-600" />,
      color: 'bg-green-50'
    },
    {
      id: 'lecture',
      name: 'Lectures',
      description: 'Manage recorded lectures and presentations',
      icon: <FaVideo className="text-5xl text-purple-600" />,
      color: 'bg-purple-50'
    }
  ];

  const [heroData, setHeroData] = useState(null);
  const [heroForm, setHeroForm] = useState({
    title: '',
    description: '',
    buttonText: 'Read More',
    buttonLink: '/student-portal'
  });

  useEffect(() => {
    if (selectedType) {
      if (selectedType === 'hero') {
        fetchHeroData();
      } else {
    fetchItems();
      }
    }
  }, [selectedType]);

  const getFilePath = (path) => {
    if (!path) return '/placeholder-image.jpg';
    if (path.startsWith('http')) return path;
    return `${BACKEND_URL}/${path.replace(/^\/+/, '')}`;
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/student-portal${selectedType ? `?type=${selectedType}` : ''}`);
      console.log('Fetched items:', response.data);
      setItems(response.data.data.filter(item => !selectedType || item.type === selectedType));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setLoading(false);
    }
  };

  const fetchHeroData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/student-portal-hero`);
      if (response.data.success && response.data.data) {
        setHeroData(response.data.data);
        setHeroForm({
          title: response.data.data.title || '',
          description: response.data.data.description || '',
          buttonText: response.data.data.buttonText || 'Read More',
          buttonLink: response.data.data.buttonLink || '/student-portal'
        });
        if (response.data.data.image) {
          setPreviewImage(`${BACKEND_URL}/${response.data.data.image}`);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hero data:', error);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('type', selectedType);
      formDataToSend.append('level', formData.level);
      
      if (selectedType === 'note') {
        formDataToSend.append('description', formData.description);
      }
      
      if (selectedType === 'book') {
        formDataToSend.append('author', formData.author);
        formDataToSend.append('category', formData.category);
      }
      
      if (selectedType === 'lecture') {
        formDataToSend.append('duration', formData.duration);
        formDataToSend.append('subject', formData.subject);
      }
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }
      
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/student-portal/${editingId}`, formDataToSend, config);
      } else {
        await axios.post(`${BACKEND_URL}/api/student-portal`, formDataToSend, config);
      }
      
      await fetchItems();
      setIsModalOpen(false);
      resetForm();
      alert('Resource saved successfully!');
    } catch (error) {
      console.error('Error saving resource:', error);
      alert('Error saving resource. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await axios.delete(`${BACKEND_URL}/api/student-portal/${id}`);
        await fetchItems();
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description || '',
      type: item.type
    });
    setPreviewImage(item.image ? `${BACKEND_URL}/${item.image}` : '');
    setEditingId(item._id);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: selectedType || 'book',
      description: '',
      author: '',
      subject: '',
      category: '',
      duration: '',
      level: '',
    });
    setEditingId(null);
    setSelectedFile(null);
    setSelectedImage(null);
    setPreviewImage('');
  };

  const handleFileClick = (fileUrl, fileType) => {
    console.log('Opening file:', fileUrl);
    window.open(fileUrl, '_blank');
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', heroForm.title);
      formDataToSend.append('description', heroForm.description);
      formDataToSend.append('buttonText', heroForm.buttonText);
      formDataToSend.append('buttonLink', heroForm.buttonLink);

      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      if (heroData) {
        await axios.put(`${BACKEND_URL}/api/student-portal-hero`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${BACKEND_URL}/api/student-portal-hero`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      await fetchHeroData();
      setIsModalOpen(false);
      alert('Hero section saved successfully!');
    } catch (error) {
      console.error('Error saving hero section:', error);
      alert('Error saving hero section');
    }
  };

  if (loading && selectedType) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Portal Resources</h2>
        {selectedType && (
          <div className="flex gap-4">
            {selectedType !== 'hero' && (
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Add New {resourceTypes.find(t => t.id === selectedType)?.name.slice(0, -1) || 'Resource'}
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
        // Main Type Selection Cards
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resourceTypes.map((type) => (
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
        <div className="max-w-4xl mx-auto">
          {/* Hero Card Display */}
          {heroData && (
            <SimpleCard className="bg-white p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="md:w-1/3">
                  <img
                    src={getFilePath(heroData.image)}
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
                        setHeroForm({
                          title: heroData.title,
                          description: heroData.description,
                          buttonText: heroData.buttonText,
                          buttonLink: heroData.buttonLink
                        });
                        setPreviewImage(getFilePath(heroData.image));
                        setIsModalOpen(true);
                      }}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this hero section?')) {
                          try {
                            await axios.delete(`${BACKEND_URL}/api/student-portal-hero`);
                            setHeroData(null);
                            setHeroForm({
                              title: '',
                              description: '',
                              buttonText: 'Read More',
                              buttonLink: '/student-portal'
                            });
                            setPreviewImage('');
                            alert('Hero section deleted successfully!');
                          } catch (error) {
                            console.error('Error deleting hero section:', error);
                            alert('Error deleting hero section');
                          }
                        }
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </SimpleCard>
          )}

          {/* Hero Form */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-6">Edit Hero Section</h3>
                <form onSubmit={handleHeroSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={heroForm.description}
                      onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                      className="w-full p-2 border rounded h-32"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                    <input
                      type="text"
                      value={heroForm.buttonText}
                      onChange={(e) => setHeroForm({ ...heroForm, buttonText: e.target.value })}
                      className="w-full p-2 border rounded"
                      placeholder="Read More"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                    <input
                      type="text"
                      value={heroForm.buttonLink}
                      onChange={(e) => setHeroForm({ ...heroForm, buttonLink: e.target.value })}
                      className="w-full p-2 border rounded"
                      placeholder="/student-portal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
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
                              setSelectedImage(null);
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

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
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

          {!heroData && !isModalOpen && (
            <div className="text-center py-12">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Create Hero Section
              </button>
            </div>
          )}
        </div>
      ) : (
        // Resources Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <SimpleCard
              key={item._id}
              className="bg-white p-4 shadow hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 mb-4">
                <img
                  src={getFilePath(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    console.log('Image load error for:', item.image);
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                {selectedType === 'note' && (
                  <p className="text-gray-600 mb-4">{item.description}</p>
                )}
                {item.file && (
                  <button
                    onClick={() => handleFileClick(getFilePath(item.file), selectedType)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
                  >
                    <span className="mr-2">
                      {selectedType === 'book' ? 'View PDF' : 
                       selectedType === 'lecture' ? 'Watch Video' : 
                       'View Document'}
                    </span>
                  </button>
                )}
                <div className="flex justify-end gap-4">
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

      {/* Form Modal */}
      {isModalOpen && selectedType !== 'hero' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingId ? 'Edit' : 'Create'} {selectedType === 'book' ? 'Book' : selectedType === 'note' ? 'Note' : 'Lecture'}
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

              {selectedType === 'book' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </>
          )}

              {selectedType === 'note' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                      rows="3"
                  required
                />
              </div>
            </>
          )}

              {selectedType === 'lecture' && (
                <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </>
          )}

          <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full p-2 border rounded"
              required
                >
                  <option value="">Select Level</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
          </div>

          <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedType === 'lecture' ? 'Thumbnail' : 'Image'}
                </label>
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
                          setSelectedImage(null);
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

          <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedType === 'book' ? 'PDF File' : selectedType === 'lecture' ? 'Video File' : 'Document File'}
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
              className="w-full p-2 border rounded"
                  accept={
                    selectedType === 'book'
                      ? '.pdf'
                      : selectedType === 'lecture'
                      ? 'video/*'
                      : '.pdf,.doc,.docx'
                  }
                  required={!editingId}
                />
        </div>

              <div className="flex justify-end space-x-2">
          <button
            type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
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

export default StudentPortalUpdate;