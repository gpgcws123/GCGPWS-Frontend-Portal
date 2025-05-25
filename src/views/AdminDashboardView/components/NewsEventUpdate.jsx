import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const NewsEventUpdate = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    type: 'news',
    description: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    // Event specific
    venue: '',
    startTime: '',
    endTime: '',
    organizer: '',
    contactPerson: '',
    registrationLink: '',
    // Cultural specific
    category: '',
    participants: [],
    schedule: [],
    status: 'active'
  });
  const [editingId, setEditingId] = useState(null);
  const [participant, setParticipant] = useState('');
  const [scheduleItem, setScheduleItem] = useState({
    time: '',
    activity: ''
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/news-events');
      setItems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news/events:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/news-events/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/news-events', formData);
      }
      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Error saving news/event:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:8000/api/news-events/${id}`);
        fetchItems();
      } catch (error) {
        console.error('Error deleting news/event:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      date: new Date(item.date).toISOString().split('T')[0],
      startTime: item.startTime || '',
      endTime: item.endTime || '',
      participants: item.participants || [],
      schedule: item.schedule || [],
      status: item.status || 'active'
    });
    setEditingId(item._id);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'news',
      description: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      venue: '',
      startTime: '',
      endTime: '',
      organizer: '',
      contactPerson: '',
      registrationLink: '',
      category: '',
      participants: [],
      schedule: [],
      status: 'active'
    });
    setEditingId(null);
    setParticipant('');
    setScheduleItem({ time: '', activity: '' });
  };

  const addParticipant = () => {
    if (participant && !formData.participants.includes(participant)) {
      setFormData({
        ...formData,
        participants: [...formData.participants, participant]
      });
      setParticipant('');
    }
  };

  const removeParticipant = (index) => {
    setFormData({
      ...formData,
      participants: formData.participants.filter((_, i) => i !== index)
    });
  };

  const addScheduleItem = () => {
    if (scheduleItem.time && scheduleItem.activity) {
      setFormData({
        ...formData,
        schedule: [...formData.schedule, scheduleItem]
      });
      setScheduleItem({ time: '', activity: '' });
    }
  };

  const removeScheduleItem = (index) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== index)
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">News & Events Management</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="news">News</option>
              <option value="event">Event</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {(formData.type === 'event' || formData.type === 'cultural') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Link</label>
                <input
                  type="url"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          )}

          {formData.type === 'cultural' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={participant}
                    onChange={(e) => setParticipant(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Add participant"
                  />
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.participants.map((p, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{p}</span>
                      <button
                        type="button"
                        onClick={() => removeParticipant(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="time"
                    value={scheduleItem.time}
                    onChange={(e) => setScheduleItem({ ...scheduleItem, time: e.target.value })}
                    className="w-1/3 p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={scheduleItem.activity}
                    onChange={(e) => setScheduleItem({ ...scheduleItem, activity: e.target.value })}
                    className="flex-1 p-2 border rounded"
                    placeholder="Activity description"
                  />
                  <button
                    type="button"
                    onClick={addScheduleItem}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.schedule.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{item.time} - {item.activity}</span>
                      <button
                        type="button"
                        onClick={() => removeScheduleItem(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={resetForm}
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'active' ? 'bg-green-100 text-green-800' :
                    item.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                    item.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    item.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
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

export default NewsEventUpdate; 