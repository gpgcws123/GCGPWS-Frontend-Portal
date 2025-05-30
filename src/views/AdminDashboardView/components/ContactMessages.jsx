import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaUser, FaCalendarAlt, FaCheck, FaTrash, FaEdit, FaTimes, FaSave } from 'react-icons/fa';

const BACKEND_URL = 'http://localhost:5000';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch contact messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the public endpoint to fetch messages
        const response = await axios.get(`${BACKEND_URL}/api/contact/public/messages`);
        
        if (response.data.success) {
          setMessages(response.data.data);
        } else {
          setError('Failed to load messages');
        }
      } catch (error) {
        console.error('Error fetching contact messages:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Status code:', error.response.status);
          
          if (error.response.status === 401) {
            setError('Your session has expired. Please log in again.');
            // Clear invalid token
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            // Optionally redirect to login
            // window.location.href = '/login';
          } else if (error.response.status === 403) {
            setError('You do not have admin permissions to access this content.');
          } else {
            setError(`Server error: ${error.response.data.message || 'Please try again later.'}`);
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
          setError('Unable to connect to the server. Please check your internet connection.');
        } else {
          console.error('Error:', error.message);
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  // Mark message as read
  const markAsRead = async (id) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/contact/messages/${id}/read`);
      
      if (response.data.success) {
        // Update local state
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, read: true } : msg
        ));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      setError('Failed to mark message as read');
    }
  };

  // Start editing a message
  const startEditing = (id, currentMessage) => {
    setEditingId(id);
    setEditedMessage(currentMessage);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditedMessage('');
  };

  // Save edited message
  const saveEditedMessage = async (id) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/contact/messages/${id}`,
        { message: editedMessage }
      );
      
      if (response.data.success) {
        // Update local state
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, message: editedMessage } : msg
        ));
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error updating message:', error);
      setError('Failed to update message');
    }
  };

  // Delete message
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`${BACKEND_URL}/api/contact/messages/${id}`);
        // Update local state
        setMessages(messages.filter(msg => msg._id !== id));
      } catch (error) {
        console.error('Error deleting message:', error);
        setError('Failed to delete message');
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Contact Messages</h2>
        <p className="text-sm text-gray-600">Manage messages from contact form</p>
      </div>

      {messages.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <FaEnvelope className="mx-auto text-4xl mb-2" />
          <p>No messages received yet</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          {/* Message List - Left Column */}
          <div className="w-full md:w-1/3 border-r">
            <div className="overflow-y-auto max-h-[600px]">
              {messages.map((message) => (
                <div 
                  key={message._id} 
                  onClick={() => setSelectedMessage(message)}
                  className={`border-b p-4 cursor-pointer transition hover:bg-gray-50 ${
                    selectedMessage && selectedMessage._id === message._id ? 'bg-blue-50' : ''
                  } ${!message.read ? 'font-semibold' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <FaUser className="text-gray-500 mr-2" />
                      {editingId === message._id ? (
                        <textarea
                          value={editedMessage}
                          onChange={(e) => setEditedMessage(e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      ) : (
                        <p className="text-gray-700">{message.message}</p>
                      )}
                    </div>
                    {!message.read && (
                      <span className="bg-blue-500 rounded-full w-3 h-3"></span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 truncate">{message.email}</div>
                  <div className="text-sm text-gray-500 mt-1 flex items-center">
                    <FaCalendarAlt className="mr-1 text-xs" />
                    {formatDate(message.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail - Right Column */}
          <div className="w-full md:w-2/3 p-6">
            {selectedMessage ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium">Message Details</h3>
                  <div className="flex gap-2">
                    <div className="flex items-center space-x-2">
                      {editingId === selectedMessage._id ? (
                        <>
                          <button
                            onClick={() => saveEditedMessage(selectedMessage._id)}
                            className="p-1 text-green-600 hover:text-green-800"
                            title="Save changes"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1 text-gray-600 hover:text-gray-800"
                            title="Cancel editing"
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(selectedMessage._id, selectedMessage.message)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Edit message"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(selectedMessage._id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete message"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-500 text-sm mb-1">From</label>
                    <div className="font-medium">{selectedMessage.name}</div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-500 text-sm mb-1">Email</label>
                    <div className="font-medium">{selectedMessage.email}</div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-500 text-sm mb-1">Received</label>
                    <div>{formatDate(selectedMessage.createdAt)}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 text-sm mb-2">Message</label>
                  <div className="bg-white border rounded-lg p-4 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {selectedMessage.read && (
                  <div className="mt-4 text-sm text-gray-500">
                    Read on {formatDate(selectedMessage.updatedAt)}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FaEnvelope className="text-5xl mb-4" />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
