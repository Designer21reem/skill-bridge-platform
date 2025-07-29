import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { IoClose } from 'react-icons/io5';
import { FaEnvelope, FaLock } from 'react-icons/fa';


const LoginPage = ({ onClose, onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     onClose(); // إغلاق النافذة بعد تسجيل الدخول الناجح
  //   } catch (err) {
  //     setError(formatFirebaseError(err.message));
  //   } finally {
  //     setLoading(false);
  //   }
//   // };
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError('');

//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     onClose(); // إغلاق النافذة
//     // تمرير بيانات المستخدم إلى المكون الأب
//     onLoginSuccess({
//       uid: userCredential.user.uid,
//       email: userCredential.user.email,
//       displayName: userCredential.user.displayName || email.split('@')[0],
//       photoURL: userCredential.user.photoURL
//     });
//   } catch (err) {
//     setError(formatFirebaseError(err.message));
//   } finally {
//     setLoading(false);
//   }
// };
// تحديث دالة handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // تخزين بيانات المستخدم
    localStorage.setItem('currentUser', JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || email.split('@')[0],
      photoURL: user.photoURL
    }));

    onClose();
    onLoginSuccess({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || email.split('@')[0],
      photoURL: user.photoURL
    });
  } catch (err) {
    setError(formatFirebaseError(err.message));
  } finally {
    setLoading(false);
  }
};
  const formatFirebaseError = (message) => {
    if (message.includes('invalid-email')) return 'Invalid email format';
    if (message.includes('user-not-found')) return 'User not found';
    if (message.includes('wrong-password')) return 'Incorrect password';
    return 'Login failed. Please try again.';
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Login into your account</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <IoClose size={24} />
            </button>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email Id:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="text-gray-400" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="info@provistechnologies.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-gray-400" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center"
            >
             {loading && (
  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
)}
              Login now
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-blue-600 hover:underline font-medium"
              >
                Signup now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;