import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleCard from '../../../components/simpleCard';
import { FaHome, FaNewspaper, FaUserTie, FaChartBar, FaQuestionCircle, FaBullhorn, FaChartLine } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BACKEND_URL = 'http://localhost:5000';

const HomePageUpdate = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    image: '',
    buttonText: '',
    buttonLink: '',
    items: []
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState('bar');

  const defaultItem = {
    title: '',
    description: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    number: ''
  };

  const sections = [
    {
      id: 'hero',
      name: 'Hero Section',
      description: 'Manage the main hero section with slider images',
      icon: <FaHome className="text-5xl text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      id: 'principal',
      name: 'Principal Message',
      description: 'Update principal message and image',
      icon: <FaUserTie className="text-5xl text-green-600" />,
      color: 'bg-green-50'
    },
    {
      id: 'stats',
      name: 'Success Count',
      description: 'Manage statistics and achievements',
      icon: <FaChartBar className="text-5xl text-purple-600" />,
      color: 'bg-purple-50'
    },
    {
      id: 'topstories',
      name: 'Top Stories',
      description: 'Update featured stories and news',
      icon: <FaNewspaper className="text-5xl text-red-600" />,
      color: 'bg-red-50'
    },
    {
      id: 'whychooseus',
      name: 'Why Choose Us',
      description: 'Manage features and benefits',
      icon: <FaQuestionCircle className="text-5xl text-yellow-600" />,
      color: 'bg-yellow-50'
    },
    {
      id: 'noticeboard',
      name: 'Notice Board',
      description: 'Manage notices and announcements',
      icon: <FaBullhorn className="text-5xl text-indigo-600" />,
      color: 'bg-indigo-50'
    }
  ];

  useEffect(() => {
    if (selectedSection) {
      fetchSectionData();
    }
  }, [selectedSection]);

  const fetchSectionData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/homepage/${selectedSection}`);
      if (response.data.success) {
        const data = response.data.data;
        if (selectedSection === 'hero') {
          setFormData({
            ...data,
            images: data.images || []
          });
          if (data.images && data.images.length > 0) {
            setPreviewImages(data.images.map(img => `${BACKEND_URL}/${img}`));
          }
        } else if (selectedSection === 'stats' || selectedSection === 'topstories' || selectedSection === 'noticeboard' || selectedSection === 'whychooseus') {
          setFormData({
            ...data,
            items: Array.isArray(data.items) ? data.items : []
          });
        } else {
          setFormData({
            ...data,
            image: data.image || ''
          });
          if (data.image) {
            setPreviewImage(`${BACKEND_URL}/${data.image}`);
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching section data:', error);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (selectedSection === 'hero') {
      const files = Array.from(e.target.files);
      console.log('Selected files:', files);
      
      if (files.length > 0) {
        if (files.length > 5) {
          alert('You can only upload up to 5 images for the hero section');
          return;
        }
        
        // Store the actual files
        setSelectedImages(files);
        
        // Create preview URLs
        const readers = files.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        });
        
        Promise.all(readers).then(results => {
          console.log('Preview images created');
          setPreviewImages(results);
        });
      }
    } else {
      const file = e.target.files[0];
      if (file) {
        console.log('Selected single file:', file);
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitFormData = new FormData();

      // Append title and description
      if (formData.title !== undefined) {
        submitFormData.append('title', formData.title);
        console.log('Submitting title:', formData.title);
      }
      
      if (formData.description !== undefined) {
        submitFormData.append('description', formData.description);
        console.log('Submitting description:', formData.description);
      }
      
      // Handle different section types
      if (selectedSection === 'hero') {
        console.log('Submitting hero section data');
        
        // Append any existing images
        if (formData.images && formData.images.length > 0) {
          console.log('Existing images:', formData.images);
          submitFormData.append('existingImages', JSON.stringify(formData.images));
        }
        
        // Append new images
        if (selectedImages && selectedImages.length > 0) {
          console.log('New images to upload:', selectedImages);
          selectedImages.forEach((image, index) => {
            submitFormData.append('images', image);
          });
        }
        
        // Log the form data
        for (let pair of submitFormData.entries()) {
          console.log(pair[0], pair[1]);
        }
      } else if (selectedSection === 'stats' || selectedSection === 'topstories' || 
                 selectedSection === 'noticeboard' || selectedSection === 'whychooseus') {
        // Handle sections with items
        if (Array.isArray(formData.items)) {
          // First, handle any file uploads separately
          let hasFileUploads = false;
          formData.items.forEach((item, index) => {
            if (item.image instanceof File) {
              hasFileUploads = true;
              // Append the file with a special name that includes the index
              submitFormData.append(`itemImage_${index}`, item.image);
            }
          });
          
          // Process items to ensure no undefined values and handle images properly
          const cleanItems = formData.items.map((item, index) => {
            const cleanItem = {};
            
            // Copy basic properties
            if (item.title !== undefined) cleanItem.title = item.title;
            if (item.description !== undefined) cleanItem.description = item.description;
            if (item.buttonText !== undefined) cleanItem.buttonText = item.buttonText;
            if (item.buttonLink !== undefined) cleanItem.buttonLink = item.buttonLink;
            if (item.number !== undefined) cleanItem.number = item.number;
            
            // Handle image properly - don't include File objects in JSON
            if (item.image) {
              if (item.image instanceof File) {
                // For File objects, we'll use a placeholder that the backend can replace
                cleanItem.image = `__TEMP_FILE_${index}__`;
              } else if (typeof item.image === 'string') {
                // For existing image paths, keep them as is
                cleanItem.image = item.image;
              }
            }
            
            return cleanItem;
          });
          
          // Convert to JSON string for backend
          submitFormData.append('items', JSON.stringify(cleanItems));
          
          // Add a flag to indicate if we have file uploads
          submitFormData.append('hasFileUploads', hasFileUploads ? 'true' : 'false');
        } else {
          // If no items, send an empty array
          submitFormData.append('items', JSON.stringify([]));
        }
      } else if (selectedImage) {
        // Handle single image sections
        submitFormData.append('image', selectedImage);
      } else if (formData.image) {
        // Keep existing image
        submitFormData.append('existingImage', formData.image);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      console.log('Submitting data:', formData);
      const response = await axios.post(`${BACKEND_URL}/api/homepage/${selectedSection}`, submitFormData, config);
      await fetchSectionData();
      setIsModalOpen(false);
      setLoading(false);
      alert('Section updated successfully!');
    } catch (error) {
      console.error('Error updating section:', error);
      setLoading(false);
      alert('Error updating section. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      images: [],
      image: '',
      buttonText: '',
      buttonLink: '',
      items: []
    });
    setSelectedImages([]);
    setPreviewImages([]);
    setSelectedImage(null);
    setPreviewImage('');
  };

  const handleAddItem = () => {
    let limit = -1;
    if (selectedSection === 'topstories' || selectedSection === 'noticeboard') {
      limit = 5;
    } else if (['topstories', 'whychooseus', 'stats'].includes(selectedSection)) {
      limit = 4;
    }
    
    // Initialize items array if it doesn't exist
    const currentItems = Array.isArray(formData.items) ? formData.items : [];
    
    if (limit !== -1 && currentItems.length >= limit) {
      alert(`Maximum ${limit} items allowed for ${sections.find(s => s.id === selectedSection)?.name}`);
      return;
    }
    setSelectedItem({ ...defaultItem });
    setIsItemModalOpen(true);
  };

  const handleEditItem = (index) => {
    const itemToEdit = formData.items[index];
    let itemWithPreview = { ...itemToEdit, index };
    if ((selectedSection === 'topstories' || selectedSection === 'whychooseus' || selectedSection === 'stats') && itemToEdit.image && typeof itemToEdit.image === 'string') {
      itemWithPreview.previewImage = `${BACKEND_URL}/${itemToEdit.image}`;
      itemWithPreview.image = itemToEdit.image;
    } else if ((selectedSection === 'topstories' || selectedSection === 'whychooseus' || selectedSection === 'stats') && itemToEdit.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedItem(prev => ({ ...prev, previewImage: reader.result, index }));
      };
      reader.readAsDataURL(itemToEdit.image);
      itemWithPreview.previewImage = 'loading';
    }
    setSelectedItem(itemWithPreview);
    setIsItemModalOpen(true);
  };

  const handleDeleteItem = async (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedItem(prev => ({ ...prev, image: file, previewImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();

      // Add current section data
      formDataToSend.append('title', formData.title || '');
      formDataToSend.append('description', formData.description || '');

      // Initialize items array if it doesn't exist
      const newItems = Array.isArray(formData.items) ? [...formData.items] : [];
      
      // Create a clean item object
      const cleanItem = {
        title: selectedItem.title || '',
        description: selectedItem.description || '',
        buttonText: selectedItem.buttonText || '',
        buttonLink: selectedItem.buttonLink || '',
        number: selectedItem.number || '',
        image: selectedItem.image || ''
      };

      // Update or add the item
      if (selectedItem.index !== undefined) {
        newItems[selectedItem.index] = cleanItem;
      } else {
        newItems.push(cleanItem);
      }

      // Log the items data before sending
      console.log('Items to send:', newItems);

      // Append items data
      formDataToSend.append('items', JSON.stringify(newItems));
      
      // Log the form data to verify
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      // Handle file uploads
      newItems.forEach((item, index) => {
        if (item.image instanceof File) {
          formDataToSend.append(`itemImage_${index}`, item.image);
        }
      });

      // Send to backend
      const response = await axios.post(
        `${BACKEND_URL}/api/homepage/${selectedSection}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        // Update the form data with the response data
        const updatedItems = Array.isArray(formData.items) ? [...formData.items] : [];
        if (selectedItem.index !== undefined) {
          updatedItems[selectedItem.index] = cleanItem;
        } else {
          updatedItems.push(cleanItem);
        }
        setFormData(prev => ({
          ...prev,
          items: updatedItems
        }));
        setIsItemModalOpen(false);
        setSelectedItem(null);
        alert('Item saved successfully!');
        // Fetch fresh data to ensure we have the latest state
        fetchSectionData();
      }
    } catch (error) {
      console.error('Error handling item:', error);
      alert('Error saving item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: formData.items ? formData.items.map(item => item.title || 'Untitled') : [],
    datasets: [
      {
        label: 'Statistics',
        data: formData.items ? formData.items.map(item => parseInt(item.number) || 0) : [],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistics Overview',
        font: {
          size: 20
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  if (loading && selectedSection) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Homepage Content Management</h2>
        {selectedSection && (
          <button
            onClick={() => setSelectedSection(null)}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            Back to Sections
          </button>
        )}
      </div>

      {!selectedSection ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`${section.color} rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className="mb-4 flex justify-center">{section.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">{section.name}</h3>
              <p className="text-gray-600 text-center">{section.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <SimpleCard className="bg-white p-8 mb-6 rounded-xl shadow-lg">
            <div className="flex flex-col gap-8">
              {selectedSection === 'hero' ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800">{formData.title}</h3>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      Edit Hero Section
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div key={index} className="border border-dashed rounded-lg p-2 hover:border-blue-500 transition-colors duration-300">
                        {previewImages[index] ? (
                          <div className="relative group">
                            <img
                              src={previewImages[index]}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  const newPreviewImages = [...previewImages];
                                  const newSelectedImages = [...selectedImages];
                                  newPreviewImages.splice(index, 1);
                                  newSelectedImages.splice(index, 1);
                                  setPreviewImages(newPreviewImages);
                                  setSelectedImages(newSelectedImages);
                                }}
                                className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 text-sm"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="border border-dashed rounded p-2 text-center hover:border-blue-500 transition-colors duration-300">
                            <input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const newPreviewImages = [...previewImages];
                                    const newSelectedImages = [...selectedImages];
                                    newPreviewImages[index] = reader.result;
                                    newSelectedImages[index] = file;
                                    setPreviewImages(newPreviewImages);
                                    setSelectedImages(newSelectedImages);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              accept="image/*"
                              className="hidden"
                              id={`hero-image-${index}`}
                            />
                            <label
                              htmlFor={`hero-image-${index}`}
                              className="cursor-pointer text-blue-500 hover:text-blue-600 flex flex-col items-center"
                            >
                              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              <span className="text-xs">Slot {index + 1}</span>
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {previewImages.filter(Boolean).length}/5 images uploaded
                  </p>
                </div>
              ) : selectedSection === 'stats' || selectedSection === 'topstories' || selectedSection === 'noticeboard' || selectedSection === 'whychooseus' ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{formData.title}</h3>
                      <p className="text-gray-600">{formData.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddItem}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                      >
                        Add Item
                      </button>
                      <button
                        onClick={(e) => handleSubmit(e)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300"
                      >
                        Save All
                      </button>
                      {selectedSection === 'topstories' || selectedSection === 'noticeboard' || selectedSection === 'whychooseus' ? (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                          Edit Header
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedSection === 'stats' && 
                      Array.from({ length: 4 }).map((_, i) => {
                        const item = formData.items && formData.items[i];
                        return (
                          <div key={`stats-${i}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                            {item ? (
                              <>
                                {item.image && (
                                  <img
                                    src={`${BACKEND_URL}/${item.image}`}
                                    alt={item.title || 'Stat image'}
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                  />
                                )}
                                {item.number && (
                                  <div className="text-2xl font-bold text-blue-600 mb-2">{item.number}</div>
                                )}
                                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                <div className="flex justify-end gap-2 mt-3">
                                  <button
                                    onClick={() => handleEditItem(i)}
                                    className="text-blue-500 hover:text-blue-600"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(i)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                <div className="text-4xl mb-2">+</div>
                                <div>Add Stat {i + 1}</div>
                                <button
                                  onClick={handleAddItem}
                                  className="mt-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                                >
                                  Add
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    }
                    
                    {selectedSection === 'topstories' && 
                      Array.from({ length: 5 }).map((_, i) => {
                        const item = formData.items && formData.items[i];
                        return (
                          <div key={`story-${i}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                            {item ? (
                              <>
                                {item.image && (
                                  <img
                                    src={item.image instanceof File ? URL.createObjectURL(item.image) : 
                                         item.image.startsWith('http') ? item.image : 
                                         `${BACKEND_URL}/${item.image}`}
                                    alt={item.title || 'Story image'}
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                  />
                                )}
                                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                {item.buttonText && (
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full">{item.buttonText}</span>
                                  </div>
                                )}
                                <div className="flex justify-end gap-2 mt-3">
                                  <button
                                    onClick={() => handleEditItem(i)}
                                    className="text-blue-500 hover:text-blue-600"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(i)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                <div className="text-4xl mb-2">+</div>
                                <div>Add Story {i + 1}</div>
                                <button
                                  onClick={handleAddItem}
                                  className="mt-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                                >
                                  Add
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    }
                    
                    {selectedSection === 'whychooseus' && 
                      Array.from({ length: 4 }).map((_, i) => {
                        const item = formData.items && formData.items[i];
                        return (
                          <div key={`feature-${i}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                            {item ? (
                              <>
                                {item.image && (
                                  <img
                                    src={item.image instanceof File ? URL.createObjectURL(item.image) : 
                                         item.image.startsWith('http') ? item.image : 
                                         `${BACKEND_URL}/${item.image}`}
                                    alt={item.title || 'Feature image'}
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                  />
                                )}
                                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                <div className="flex justify-end gap-2 mt-3">
                                  <button
                                    onClick={() => handleEditItem(i)}
                                    className="text-blue-500 hover:text-blue-600"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(i)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                <div className="text-4xl mb-2">+</div>
                                <div>Add Feature {i + 1}</div>
                                <button
                                  onClick={handleAddItem}
                                  className="mt-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                                >
                                  Add
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    }
                    
                    {selectedSection === 'noticeboard' && 
                      Array.from({ length: 5 }).map((_, i) => {
                        const item = formData.items && formData.items[i];
                        return (
                          <div key={`notice-${i}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                            {item ? (
                              <>
                                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                <div className="flex justify-end gap-2 mt-3">
                                  <button
                                    onClick={() => handleEditItem(i)}
                                    className="text-blue-500 hover:text-blue-600"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(i)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                <div className="text-4xl mb-2">+</div>
                                <div>Add Notice {i + 1}</div>
                                <button
                                  onClick={handleAddItem}
                                  className="mt-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                                >
                                  Add
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{formData.title}</h3>
                      <p className="text-gray-600">{formData.description}</p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      Edit Section
                    </button>
                  </div>
                  {previewImage && (
                    <div className="relative group">
                      <img
                        src={previewImage}
                        alt="Section preview"
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </SimpleCard>
        </div>
      )}

      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedItem.index !== undefined ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button
                onClick={() => {
                  setIsItemModalOpen(false);
                  setSelectedItem(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleItemSubmit} className="space-y-6">
              {selectedSection !== 'stats' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={selectedItem.title}
                    onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}

              {selectedSection !== 'stats' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={selectedItem.description}
                    onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                    className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}

              {selectedSection === 'stats' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={selectedItem.title}
                      onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
                    <input
                      type="text"
                      value={selectedItem.number}
                      onChange={(e) => setSelectedItem({ ...selectedItem, number: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </>
              )}

              {(selectedSection === 'stats' || selectedSection === 'topstories' || selectedSection === 'whychooseus') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  {(selectedItem.previewImage || selectedItem.image) && (
                    <div className="relative group mb-4">
                      <img
                        src={selectedItem.previewImage || `${BACKEND_URL}/${selectedItem.image}`}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setSelectedItem({...selectedItem, image: '', previewImage: ''})}
                          className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                  {!(selectedItem.image || selectedItem.previewImage) || selectedSection === 'stats' ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300">
                      <input
                        type="file"
                        onChange={handleItemImageChange}
                        accept="image/*"
                        className="hidden"
                        id="item-image"
                      />
                      <label
                        htmlFor="item-image"
                        className="cursor-pointer text-blue-500 hover:text-blue-600 flex flex-col items-center"
                      >
                        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Upload Image</span>
                      </label>
                    </div>
                  ) : null}
                </div>
              )}

              {selectedSection === 'topstories' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                    <input
                      type="text"
                      value={selectedItem.buttonText}
                      onChange={(e) => setSelectedItem({ ...selectedItem, buttonText: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                    <input
                      type="text"
                      value={selectedItem.buttonLink}
                      onChange={(e) => setSelectedItem({ ...selectedItem, buttonLink: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsItemModalOpen(false);
                    setSelectedItem(null);
                  }}
                  className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  {selectedItem && selectedItem.index !== undefined ? 'Update' : 'Add'} Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (selectedSection === 'principal' || selectedSection === 'hero' || selectedSection === 'noticeboard' || selectedSection === 'whychooseus') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Edit {sections.find(s => s.id === selectedSection)?.name} Header
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  // Consider if resetForm() is needed here or a partial reset
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              {selectedSection !== 'hero' && ( // Hero section doesn't have a description in this modal
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                   <textarea
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     required
                   />
                 </div>
              )}

              {selectedSection === 'principal' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  {previewImage && (
                   <div className="relative group mb-4">
                      <img
                         src={previewImage}
                         alt="Preview"
                         className="w-full h-48 object-cover rounded-lg"
                       />
                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <button
                             type="button"
                             onClick={() => {
                               setPreviewImage('');
                               setSelectedImage(null);
                             }}
                             className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300"
                           >
                             ×
                           </button>
                        </div>
                     </div>
                )}
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300">
                   <input
                     type="file"
                     onChange={handleImageChange}
                     accept="image/*"
                     className="hidden"
                     id="section-single-image"
                   />
                   <label
                     htmlFor="section-single-image"
                     className="cursor-pointer text-blue-500 hover:text-blue-600 flex flex-col items-center"
                   >
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                     <span>Upload Image</span>
                   </label>
                </div>
              </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    // Consider if resetForm() is needed here or a partial reset
                  }}
                  className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isChartModalOpen && selectedSection === 'stats' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">
                Statistics Details
              </h3>
              <button
                onClick={() => setIsChartModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-8">
              {formData.items.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-6">
                    {item.image && (
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={`${BACKEND_URL}/${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-xl shadow-md"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <h4 className="text-2xl font-bold text-blue-600 mb-2">{item.title}</h4>
                      {item.number && (
                        <div className="text-4xl font-bold text-gray-800 mb-2">{item.number}</div>
                      )}
                      {item.description && (
                        <p className="text-gray-600">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  onClick={() => setIsChartModalOpen(false)}
                  className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageUpdate; 