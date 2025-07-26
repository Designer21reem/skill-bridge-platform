import React, { useState, useRef } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../../firebase/firebase';
import { IoClose, IoCamera } from 'react-icons/io5';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding } from 'react-icons/fa';

const SignupPage = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    company: '',
    photoURL: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.match('image.*')) {
        setError('Please select an image file (JPEG, PNG)');
        return;
      }

      // التحقق من حجم الملف (2MB كحد أقصى)
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }

      setProfileImage(file);
      setError('');

      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async (userId) => {
    if (!profileImage) return null;

    try {
      // إنشاء مرجع للتخزين
      const storageRef = ref(storage, `profile_images/${userId}/${profileImage.name}`);
      
      // رفع الملف إلى Storage
      const snapshot = await uploadBytes(storageRef, profileImage);
      
      // الحصول على رابط التنزيل
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (err) {
      console.error("Error uploading image:", err);
      throw new Error("Failed to upload profile image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // التحقق من صحة البيانات
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // 1. إنشاء المستخدم في Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      let photoURL = '';

      // 2. رفع الصورة إذا وجدت
      if (profileImage) {
        photoURL = await handleUploadImage(user.uid);
      }

      // 3. تحديث ملف التعريف في Authentication
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: photoURL || null
      });

      // 4. حفظ البيانات الإضافية في Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        company: formData.company,
        photoURL: photoURL || null,
        createdAt: new Date(),
        lastLogin: new Date(),
        role: 'user', // يمكنك إضافة أدوار للمستخدمين
        emailVerified: false
      });

      onClose(); // إغلاق النافذة بعد التسجيل الناجح
    } catch (err) {
      setError(formatFirebaseError(err.message));
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatFirebaseError = (message) => {
    if (message.includes('email-already-in-use')) return 'Email already in use';
    if (message.includes('weak-password')) return 'Password should be at least 6 characters';
    if (message.includes('invalid-email')) return 'Invalid email address';
    return 'Signup failed. Please try again.';
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-y-auto max-h-screen">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sign up</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <IoClose size={24} />
            </button>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* صورة البروفايل */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={triggerFileInput}
              >
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <IoCamera size={24} />
                    <span className="text-xs mt-1">Add Photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUser className="text-gray-400" />
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Last Name:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUser className="text-gray-400" />
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="text-gray-400" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example@domain.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Mobile No.:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaPhone className="text-gray-400" />
                </span>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1234567890"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Company Name:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaBuilding className="text-gray-400" />
                </span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your company name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Password:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-gray-400" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Confirm Password:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-gray-400" />
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Sign up'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;