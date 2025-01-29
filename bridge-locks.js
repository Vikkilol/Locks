// BridgeLocks.js
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Shield, Check, X } from 'lucide-react';

const BridgeLocks = () => {
  const [selectedLock, setSelectedLock] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    names: '',
    message: '',
    image: null
  });

  // Sample data - replace with your database data later
  const [approvedLocks, setApprovedLocks] = useState([
    { id: 1, x: 100, y: 150, title: "Sarah & John", message: "Forever and always", image: null },
    { id: 2, x: 200, y: 180, title: "Mike & Anna", message: "Our love is eternal", image: null }
  ]);

  const [pendingLocks, setPendingLocks] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({...formData, image: e.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLock = {
      id: Date.now(),
      x: Math.random() * 300 + 50,
      y: Math.random() * 100 + 150,
      title: formData.names,
      message: formData.message,
      image: formData.image,
      submittedAt: new Date()
    };
    
    setPendingLocks([...pendingLocks, newLock]);
    setFormData({ names: '', message: '', image: null });
    setShowForm(false);
    alert("Your lock has been submitted for approval!");
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Simple password check - replace with proper authentication
    if (adminEmail === "admin@example.com" && adminPassword === "password") {
      setIsAdmin(true);
      setAdminEmail('');
      setAdminPassword('');
    } else {
      alert("Invalid credentials");
    }
  };

  const approveLock = (lock) => {
    setApprovedLocks([...approvedLocks, { ...lock, isNew: true }]);
    setPendingLocks(pendingLocks.filter(l => l.id !== lock.id));
    
    setTimeout(() => {
      setApprovedLocks(prev => 
        prev.map(l => l.id === lock.id ? { ...l, isNew: false } : l)
      );
    }, 1000);
  };

  const rejectLock = (lockId) => {
    setPendingLocks(pendingLocks.filter(lock => lock.id !== lockId));
  };

  return (
    <div className="relative w-full h-96 bg-gray-100">
      <div className="absolute top-4 right-4 flex space-x-2">
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Your Lock
        </button>
        <button 
          onClick={() => setShowAdmin(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          <Shield className="w-4 h-4" />
        </button>
      </div>

      {/* Bridge background */}
      <div className="absolute inset-0 bg-gray-400 mt-32 h-8" />
      
      {/* Approved Locks */}
      {approvedLocks.map(lock => (
        <div
          key={lock.id}
          className={`absolute cursor-pointer transition-all duration-500 ${
            lock.isNew ? 'animate-bounce scale-150 opacity-0' : 'opacity-100 hover:scale-110'
          }`}
          style={{ left: lock.x, top: lock.y }}
          onClick={() => setSelectedLock(lock)}
          title={lock.title}
        >
          <div className={`w-8 h-10 rounded-t-lg flex items-center justify-center text-xs overflow-hidden ${
            lock.image ? 'p-0' : 'bg-yellow-600'
          }`}>
            {lock.image ? (
              <img src={lock.image} alt="Lock" className="w-full h-full object-cover" />
            ) : (
              '🔒'
            )}
          </div>
        </div>
      ))}

      {/* Admin Panel */}
      {showAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            {!isAdmin ? (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Admin Login</h3>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Admin email"
                />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Password"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAdmin(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Login
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Admin Dashboard</h3>
                  <button
                    onClick={() => {
                      setIsAdmin(false);
                      setShowAdmin(false);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Logout
                  </button>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Pending Locks ({pendingLocks.length})</h4>
                  {pendingLocks.length === 0 ? (
                    <p className="text-gray-500">No pending locks</p>
                  ) : (
                    <div className="space-y-4">
                      {pendingLocks.map(lock => (
                        <div key={lock.id} className="border p-4 rounded-lg flex items-start space-x-4">
                          {lock.image && (
                            <img src={lock.image} alt="Lock" className="w-20 h-20 object-cover rounded" />
                          )}
                          <div className="flex-1">
                            <h5 className="font-bold">{lock.title}</h5>
                            <p className="text-gray-600">{lock.message}</p>
                            <p className="text-sm text-gray-400">
                              Submitted: {lock.submittedAt.toLocaleString()}
                            </p>
                          </div>
                          <div className="space-x-2">
                            <button
                              onClick={() => approveLock(lock)}
                              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => rejectLock(lock.id)}
                              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Submission Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Your Lock</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Names</label>
                <input
                  type="text"
                  value={formData.names}
                  onChange={(e) => setFormData({...formData, names: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="e.g. Sarah & John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-2 border rounded h-24"
                  placeholder="Write your message..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Lock Image (Optional)</label>
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500"
                >
                  {formData.image ? (
                    <div className="relative w-24 h-24 mx-auto">
                      <img 
                        src={formData.image} 
                        alt="Upload preview" 
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData({...formData, image: null});
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Camera className="w-8 h-8 mx-auto mb-2" />
                      <p>Click to upload lock image</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lock Details Popup */}
      {selectedLock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <div className="flex items-start space-x-4">
              {selectedLock.image && (
                <img 
                  src={selectedLock.image} 
                  alt="Lock" 
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{selectedLock.title}</h3>
                <p className="mb-4">{selectedLock.message}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedLock(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BridgeLocks;
