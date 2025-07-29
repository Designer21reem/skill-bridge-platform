// import React, { useState } from 'react';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { useAuth } from '../../../../firebase/AuthContext';

// const TaskModal = ({ task, onClose, onSubmit }) => {
//   const [files, setFiles] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadError, setUploadError] = useState(null);
//   const { currentUser } = useAuth();

//   const handleFileChange = (e) => {
//     setFiles([...e.target.files]);
//     setUploadError(null);
//   };

//   const handleSubmit = async () => {
//     if (!files.length || !currentUser) return;

//     setIsUploading(true);
//     setUploadProgress(0);
//     setUploadError(null);

//     try {
//       const storage = getStorage();
//       const uploadedUrls = [];
      
//       for (const file of files) {
//         try {
//           // إنشاء مسار فريد للملف
//           const fileExt = file.name.split('.').pop();
//           const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
//           const storageRef = ref(storage, `tasks/${currentUser.uid}/${fileName}`);
          
//           // رفع الملف
//           await uploadBytes(storageRef, file);
//           const url = await getDownloadURL(storageRef);
//           uploadedUrls.push(url);
          
//           // تحديث التقدم (محاكاة)
//           setUploadProgress((prev) => prev + (100 / files.length));
//         } catch (error) {
//           console.error("Error uploading file:", error);
//           throw error;
//         }
//       }
      
//       onSubmit(uploadedUrls);
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       setUploadError("Failed to upload files. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Submit Task: {task.title}</h2>
        
//         {uploadError && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//             {uploadError}
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Upload Files:</label>
//           <input 
//             type="file" 
//             multiple 
//             onChange={handleFileChange}
//             className="w-full p-2 border rounded mb-2"
//             disabled={isUploading}
//           />
//           {isUploading && (
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div 
//                 className="bg-blue-600 h-2.5 rounded-full" 
//                 style={{ width: `${uploadProgress}%` }}
//               ></div>
//             </div>
//           )}
//         </div>
        
//         <div className="flex justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//             disabled={isUploading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={isUploading || files.length === 0}
//             className={`px-4 py-2 rounded text-white ${
//               isUploading || files.length === 0 
//                 ? 'bg-blue-400 cursor-not-allowed' 
//                 : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {isUploading ? 'Uploading...' : 'Submit'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskModal;
// TaskModal.jsx
import React, { useState } from 'react';

const TaskModal = ({ task, onClose, onSubmit, isLocalOnly = true }) => {
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setError(null);
  };

  const handleSubmit = () => {
    if (!files.length) {
      setError("Please select at least one file");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // في الوضع المحلي، نمرر الملفات مباشرة دون رفعها
      onSubmit(files);
    } catch (err) {
      console.error("Error submitting files:", err);
      setError("Failed to submit files");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Submit Task: {task.title}</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {isLocalOnly ? "Select Files (Local storage only)" : "Upload Files"}
          </label>
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange}
            className="w-full p-2 border rounded mb-2"
            disabled={isSubmitting}
          />
          
          {files.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Selected files:</p>
              <ul className="list-disc pl-5 text-sm">
                {Array.from(files).map((file, index) => (
                  <li key={index}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || files.length === 0}
            className={`px-4 py-2 rounded text-white ${
              isSubmitting || files.length === 0 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;