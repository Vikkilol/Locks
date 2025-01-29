import { useState, useRef, useEffect } from 'react';
import { Camera, Shield, Check, X } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

// Your Firebase config - you'll need to replace this with your actual config
const firebaseConfig = {
  // Get this from Firebase Console
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const BridgeLocks = () => {
  const [selectedLock, setSelectedLock] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    names: '',
    message: '',
    image: null
  });

  const [approvedLocks, setApprovedLocks] = useState([]);
  const [pendingLocks, setPendingLocks] = useState([]);

  // Check auth state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.3, // Compress to 300KB
      maxWidthOrHeight: 800,
      useWebWorker: true
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) { // 3MB
        alert("Image is too large. Compressing...");
      }
      
      try {
        setIsLoading(true);
        const compressedFile = await compressImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData({...formData, image: e.target.result});
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        alert("Error processing image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload compressed image to Firebase Storage
      let imageUrl = null;
      if (formData.image) {
        const imageRef = ref(storage, `locks/${Date.now()}`);
        const response = await fetch(formData.image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Add to Firestore
      const lockData = {
        title: formData.names,
        message: formData.message,
        image: imageUrl,
        submittedAt: new Date(),
        status: 'pending',
        x: Math.random() * 300 + 50,
        y: Math.random() * 100 + 150
      };

      const docRef = await addDoc(collection(db, 'locks'), lockData);

      // Send email notification using Cloud Function
      await fetch('your-cloud-function-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lockId: docRef.id,
          title: lockData.title,
          adminEmail: 'your-admin-email@example.com'
        })
      });

      setFormData({ names: '', message: '', image: null });
      setShowForm(false);
      alert("Your lock has been submitted for approval!");
    } catch (error) {
      alert("Error submitting lock. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      setAdminPassword('');
      setAdminEmail('');
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component code stays the same ...
};

export default BridgeLocks;
