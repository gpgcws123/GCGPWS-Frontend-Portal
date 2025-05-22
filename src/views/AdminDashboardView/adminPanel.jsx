import { useState, useEffect } from 'react';
import { Home, Users, FileText, Menu, X, Bell, Search } from 'lucide-react';
import { db } from '../../config/firebase';
import { 
  collection, 
  getDocs, 
  deleteDoc,
  doc, 
  getDoc,
  query, 
  orderBy, 
  limit,
  where,
  updateDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Clear session storage
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('userId');
        navigate('/', { replace: true });
        return;
      }

      try {
        const studentsQuery = query(
          collection(db, 'students'),
          where('uid', '==', user.uid),
          where('role', '==', 'admin')
        );
        
        const querySnapshot = await getDocs(studentsQuery);
        
        if (querySnapshot.empty) {
          console.error('User is not an admin');
          // Clear session storage
          sessionStorage.removeItem('isAuthenticated');
          sessionStorage.removeItem('userRole');
          sessionStorage.removeItem('userId');
          navigate('/', { replace: true });
          return;
        }

        const adminData = querySnapshot.docs[0].data();
        setAdminData(adminData);
        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />;
      case 'students':
        return <StudentsRecord />;
      case 'applications':
        return <Applications />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-black text-white transition-all duration-300 flex flex-col`}>
        {/* Logo Area */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-800">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection('home')}
                className={`flex items-center p-3 rounded-lg w-full ${
                  activeSection === 'home' ? 'bg-yellow text-black' : 'hover:bg-gray-800'
                }`}
              >
                <Home size={20} />
                {sidebarOpen && <span className="ml-4">Homepage</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('students')}
                className={`flex items-center p-3 rounded-lg w-full ${
                  activeSection === 'students' ? 'bg-yellow text-black' : 'hover:bg-gray-800'
                }`}
              >
                <Users size={20} />
                {sidebarOpen && <span className="ml-4">Students Record</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('applications')}
                className={`flex items-center p-3 rounded-lg w-full ${
                  activeSection === 'applications' ? 'bg-yellow text-black' : 'hover:bg-gray-800'
                }`}
              >
                <FileText size={20} />
                {sidebarOpen && <span className="ml-4">Applications</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {adminData?.name ? adminData.name[0].toUpperCase() : 'A'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{adminData?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-400">{adminData?.email}</p>
                </div>
              </div>
              <button 
                onClick={async () => {
                  try {
                    const auth = getAuth();
                    await signOut(auth);
                    // Clear session storage
                    sessionStorage.removeItem('isAuthenticated');
                    sessionStorage.removeItem('userRole');
                    sessionStorage.removeItem('userId');
                    // Navigate to home page
                    navigate('/', { replace: true });
                  } catch (error) {
                    console.error('Error signing out:', error);
                  }
                }}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Search..."
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-yellow rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function HomePage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    newApplications: 0,
    pendingApprovals: 0,
    recentActivity: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const auth = getAuth();
        if (!auth.currentUser) return;

        // Get total students
        const studentsQuery = query(collection(db, "students"));
        const studentsSnapshot = await getDocs(studentsQuery);
        const totalStudents = studentsSnapshot.size;

        setStats(prevStats => ({
          ...prevStats,
          totalStudents
        }));

      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Students" value={stats.totalStudents} icon={<Users size={24} />} color="bg-yellow" />
        <StatCard title="New Applications" value={stats.newApplications} icon={<FileText size={24} />} color="bg-black" />
        <StatCard title="Pending Approvals" value={stats.pendingApprovals} icon={<Bell size={24} />} color="bg-gray" />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center border-b border-gray-200 pb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <Users size={16} />
              </div>
              <div>
                <p className="font-medium">{activity.type} - {activity.student}</p>
                <p className="text-sm text-gray-500">
                  {activity.timestamp?.toLocaleString() || 'Recent'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentsRecord() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const studentsPerPage = 7;
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStudents(studentsData);
        setError(null);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to load students data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        throw new Error('Not authenticated');
      }

      // First check if user is admin
      const adminQuery = query(
        collection(db, 'students'),
        where('uid', '==', auth.currentUser.uid)
      );
      
      const adminSnapshot = await getDocs(adminQuery);
      if (!adminSnapshot.empty && adminSnapshot.docs[0].data().role === 'admin') {
        // Delete the student document
        await deleteDoc(doc(db, "students", studentId));
        
        // Update local state
        setStudents(prevStudents => 
          prevStudents.filter(student => student.id !== studentId)
        );
        alert('Student deleted successfully');
      } else {
        throw new Error('Not authorized - Admin access required');
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert('Failed to delete student: ' + error.message);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        throw new Error('Not authenticated');
      }

      // First check if user is admin
      const adminQuery = query(
        collection(db, 'students'),
        where('uid', '==', auth.currentUser.uid)
      );
      
      const adminSnapshot = await getDocs(adminQuery);
      if (!adminSnapshot.empty && adminSnapshot.docs[0].data().role === 'admin') {
        // Get current student data to preserve sensitive fields
        const studentDoc = await getDoc(doc(db, "students", editingStudent.id));
        const currentData = studentDoc.data();

        // Prepare update data (allow role update)
        const updateData = {
          ...currentData,          // Keep existing data
          name: updatedData.name,
          email: updatedData.email,
          class: updatedData.class,
          rollNumber: updatedData.rollNumber,
          imageUrl: updatedData.imageUrl || currentData.imageUrl,
          role: updatedData.role, // allow role update
          updatedAt: new Date(),
          updatedBy: auth.currentUser.uid
        };

        // Update the document
        await updateDoc(doc(db, "students", editingStudent.id), updateData);
        
        // Update local state
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student.id === editingStudent.id
              ? { ...student, ...updateData }
              : student
          )
        );

        alert('Student updated successfully');
        setEditingStudent(null);
      } else {
        throw new Error('Not authorized - Admin access required');
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert('Failed to update student: ' + error.message);
    }
  };

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const paginatedStudents = students.slice(
    (page - 1) * studentsPerPage,
    page * studentsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{student.rollNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{student.class}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.imageUrl ? (
                    <img 
                      src={student.imageUrl} 
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No IMG</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button 
                    onClick={() => handleEdit(student)}
                    className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(student.id)} // Use document ID instead of uid
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing {paginatedStudents.length} of {students.length} students</p>
        <div className="flex space-x-1">
          <button 
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setPage(page => Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button 
              key={index} 
              className={`px-3 py-1 ${page === index + 1 ? 'bg-yellow' : 'bg-gray-200'} rounded hover:bg-yellow-600`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button 
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setPage(page => Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {editingStudent && (
        <StudentEditModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: 'All Types', status: 'All Status' });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "applications"));
        const applicationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().createdAt?.toDate().toLocaleDateString()
        }));
        setApplications(applicationsData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    const typeMatch = filters.type === 'All Types' || app.type === filters.type;
    const statusMatch = filters.status === 'All Status' || app.status === filters.status;
    return typeMatch && statusMatch;
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium">Applications Overview</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatusCard title="Total" count="124" color="bg-black" />
          <StatusCard title="Pending" count="42" color="bg-yellow" />
          <StatusCard title="Approved" count="65" color="bg-green-500" />
          <StatusCard title="Rejected" count="17" color="bg-red-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-lg font-medium">Recent Applications</h3>
          <div className="flex space-x-2">
            <select name="type" value={filters.type} onChange={handleFilterChange} className="border rounded px-3 py-1 bg-white">
              <option>All Types</option>
              <option>Admission</option>
              <option>Scholarship</option>
              <option>Transfer</option>
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="border rounded px-3 py-1 bg-white">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{app.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{app.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{app.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{app.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 5 of 124 applications</p>
          <div className="flex space-x-1">
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Previous</button>
            <button className="px-3 py-1 bg-yellow rounded hover:bg-yellow-600">1</button>
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">2</button>
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">3</button>
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className={`${color} rounded-lg p-4 text-white mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function StatusCard({ title, count, color }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center">
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white mr-4`}>
        {count}
      </div>
      <p className="font-medium">{title}</p>
    </div>
  );
}

function StudentEditModal({ student, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: student.name || '',
    email: student.email || '',
    class: student.class || '',
    rollNumber: student.rollNumber || '',
    imageUrl: student.imageUrl || '',
    role: student.role || 'student',
    studentImage: null
  });
  const [previewImage, setPreviewImage] = useState(student.imageUrl || '');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Validate image
      if (file.size > 5000000) { // 5MB
        throw new Error('File size must be less than 5MB');
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('File must be JPG, PNG or JPEG');
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData(prev => ({
        ...prev,
        studentImage: file
      }));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let updatedData = { ...formData };
      delete updatedData.studentImage;

      // If new image is selected, upload it
      if (formData.studentImage) {
        const imageFormData = new FormData();
        imageFormData.append('file', formData.studentImage);
        imageFormData.append('upload_preset', 'student_profiles_unsigned');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dkcdjdlqs/image/upload',
          imageFormData
        );

        updatedData.imageUrl = response.data.secure_url;
      }

      await onUpdate(updatedData);
      onClose();
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500">No IMG</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Other Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-1 w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <input
                type="text"
                value={formData.class}
                onChange={(e) => setFormData({...formData, class: e.target.value})}
                className="mt-1 w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Roll Number</label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
                className="mt-1 w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="mt-1 w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}