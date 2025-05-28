import { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const STATUS_MESSAGES = {
  approved: "Your application has been successfully approved! You can now come to college for further proceedings.",
  rejected: "Your application has been rejected due to missing or incomplete information. Please contact the admin office for more details.",
  pending: "Your application is under review."
};

const EMAIL_TEMPLATES = {
  approved: {
    subject: "Application Approved - Welcome to Our College!",
    body: `Dear {firstName},

Congratulations! Your application has been approved. We are pleased to welcome you to our college.

Application Details:
- Name: {firstName} {lastName}
- Course: {course}
- Application ID: {applicationId}

Next Steps:
1. Please visit the college with the following documents:
   - Original Matriculation Certificate
   - Original Intermediate Certificate
   - Original ID Proof
   - 4 Passport Size Photographs
2. Complete the admission process within 7 working days
3. Pay the required fees at the accounts office

If you have any questions, please contact the admission office.

Best regards,
College Administration`
  },
  rejected: {
    subject: "Application Status Update - Important Information",
    body: `Dear {firstName},

Thank you for your interest in our college. After careful review of your application, we regret to inform you that we are unable to approve your application at this time.

Application Details:
- Name: {firstName} {lastName}
- Course: {course}
- Application ID: {applicationId}

For more information about your application status or to discuss the next steps, please visit our admission office.

Best regards,
College Administration`
  }
};

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingApplication, setViewingApplication] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admissions/all`);
      const apps = Array.isArray(response.data) ? response.data : [];
      setApplications(apps);
      setError(null);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      console.log('Updating application status:', { applicationId, status });
      
      // First update the status
      const statusResponse = await axios.put(`${API_URL}/admissions/${applicationId}/status`, {
        status,
        message: STATUS_MESSAGES[status]
      });

      if (!statusResponse.data) {
        throw new Error('No response data from status update');
      }

      // Update local state
      setApplications(prevApps =>
        prevApps.map(app =>
          app._id === applicationId
            ? { ...app, status, statusMessage: STATUS_MESSAGES[status] }
            : app
        )
      );

      // Get the application details for email
      const application = applications.find(app => app._id === applicationId);
      
      if (!application) {
        throw new Error('Application not found in local state');
      }

      // Send email notification
      try {
        const emailResponse = await axios.post(`${API_URL}/notifications/send-email`, {
          to: application.email,
          subject: EMAIL_TEMPLATES[status].subject,
          body: EMAIL_TEMPLATES[status].body
            .replace(/{firstName}/g, application.firstName)
            .replace(/{lastName}/g, application.lastName)
            .replace(/{course}/g, formatCourseType(application.course))
            .replace(/{applicationId}/g, application._id)
        });

        console.log('Email notification sent:', emailResponse.data);
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't throw here, we still want to show the status update success
      }

      // Show success notification
      setNotificationMessage(
        status === 'approved'
          ? 'Application approved and email sent!'
          : 'Application rejected and email sent!'
      );
      setNotificationType('success');
      setShowNotification(true);

      // If viewing the application, update the modal
      if (viewingApplication?._id === applicationId) {
        setViewingApplication(prev => ({
          ...prev,
          status,
          statusMessage: STATUS_MESSAGES[status]
        }));
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      setNotificationMessage(
        `Failed to update status: ${error.response?.data?.error || error.message}`
      );
      setNotificationType('error');
      setShowNotification(true);
    } finally {
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCourseType = (course) => {
    const courses = {
      'btech': 'B.Tech',
      'bsc': 'B.Sc',
      'mtech': 'M.Tech',
      'mba': 'MBA',
      'msc': 'M.Sc',
      'mca': 'MCA',
      'fsc': 'FSC',
      'premedical': 'Pre-Medical',
      'ics': 'ICS',
      'icom': 'ICOM'
    };
    return courses[course] || course;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading applications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Applications</p>
              <p className="text-2xl font-bold">{applications.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Approvals</p>
              <p className="text-2xl font-bold">
                {applications.filter(app => !app.status || app.status === 'pending').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Approved Applications</p>
              <p className="text-2xl font-bold">
                {applications.filter(app => app.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Enhanced Notification with Email Status */}
      {showNotification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
          notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white z-50 flex items-center`}>
          {notificationType === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <XCircle className="w-5 h-5 mr-2" />
          )}
          <span>{notificationMessage}</span>
          {notificationMessage.includes('email') && (
            <Mail className="w-5 h-5 ml-2" />
          )}
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {app.firstName} {app.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatCourseType(app.course)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        {getStatusIcon(app.status)}
                        <span className={`ml-2 ${getStatusColor(app.status)}`}>
                          {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => setViewingApplication(app)}
                        className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Application Modal */}
      {viewingApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="text-lg font-bold">Application Details</h3>
                <div className={`ml-4 flex items-center ${getStatusColor(viewingApplication.status)}`}>
                  {getStatusIcon(viewingApplication.status)}
                  <span className="ml-2">
                    {viewingApplication.status ? viewingApplication.status.charAt(0).toUpperCase() + viewingApplication.status.slice(1) : 'Pending'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setViewingApplication(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Personal Information</h4>
                  <p>Name: {viewingApplication.firstName} {viewingApplication.lastName}</p>
                  <p>Email: {viewingApplication.email}</p>
                  <p>Phone: {viewingApplication.phone}</p>
                  <p>Address: {viewingApplication.address}</p>
                  <p>City: {viewingApplication.city}</p>
                  <p>State: {viewingApplication.state}</p>
                  <p>Zip Code: {viewingApplication.zipCode}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Course Information</h4>
                  <p>Course: {formatCourseType(viewingApplication.course)}</p>
                  <p>Admission Year: {viewingApplication.admissionYear}</p>
                  <p>Date Applied: {formatDate(viewingApplication.createdAt)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Matriculation Details</h4>
                  <p>School: {viewingApplication.matricSchool}</p>
                  <p>Board: {viewingApplication.matricBoard}</p>
                  <p>Passing Year: {viewingApplication.matricPassingYear}</p>
                  <p>Percentage: {viewingApplication.matricPercentage}%</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Intermediate Details</h4>
                  <p>College: {viewingApplication.interCollege}</p>
                  <p>Board: {viewingApplication.interBoard}</p>
                  <p>Passing Year: {viewingApplication.interPassingYear}</p>
                  <p>Percentage: {viewingApplication.interPercentage}%</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-2">Documents</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {viewingApplication.photoUrl && (
                    <a
                      href={viewingApplication.photoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <img src={viewingApplication.photoUrl} alt="Student" className="w-20 h-20 object-cover rounded-lg mb-2" />
                      <span className="text-sm text-blue-600">Photo</span>
                    </a>
                  )}
                  {viewingApplication.matricMarksheetUrl && (
                    <a
                      href={viewingApplication.matricMarksheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <FileText className="w-20 h-20 text-gray-400 mb-2" />
                      <span className="text-sm text-blue-600">Matric Marksheet</span>
                    </a>
                  )}
                  {viewingApplication.interMarksheetUrl && (
                    <a
                      href={viewingApplication.interMarksheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <FileText className="w-20 h-20 text-gray-400 mb-2" />
                      <span className="text-sm text-blue-600">Inter Marksheet</span>
                    </a>
                  )}
                  {viewingApplication.idProofUrl && (
                    <a
                      href={viewingApplication.idProofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <FileText className="w-20 h-20 text-gray-400 mb-2" />
                      <span className="text-sm text-blue-600">ID Proof</span>
                    </a>
                  )}
                </div>
              </div>

              {(!viewingApplication.status || viewingApplication.status === 'pending') && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                    Application Status
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    This application is pending review. Please review the documents and details before making a decision.
                    An email notification will be sent to the applicant.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleStatusUpdate(viewingApplication._id, 'approved')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve & Send Email
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(viewingApplication._id, 'rejected')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject & Send Email
                    </button>
                  </div>
                </div>
              )}

              {viewingApplication.status && (
                <div className={`mb-6 p-4 rounded-lg ${
                  viewingApplication.status === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                } border`}>
                  <h4 className="font-medium mb-2 flex items-center">
                    {viewingApplication.status === 'approved' ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    Status Message
                  </h4>
                  <p className="text-sm text-gray-600">
                    {viewingApplication.statusMessage || STATUS_MESSAGES[viewingApplication.status]}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setViewingApplication(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications; 