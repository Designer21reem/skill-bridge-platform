import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import { useAuth } from '../../../../firebase/AuthContext';
import { FiPlus, FiX, FiExternalLink } from 'react-icons/fi';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    tags: '',
    link: ''
  });
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // جلب المشاريع من Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = [];
        querySnapshot.forEach((doc) => {
          projectsData.push({ id: doc.id, ...doc.data() });
        });
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects: ", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const tagsArray = newProject.tags.split(',').map(tag => tag.trim());
      
      const projectData = {
        ...newProject,
        tags: tagsArray,
        createdAt: new Date(),
        createdBy: currentUser.uid
      };

      await addDoc(collection(db, 'projects'), projectData);
      
      // تحديث القائمة المحلية
      setProjects(prev => [...prev, { ...projectData, id: 'temp-id' }]);
      
      // إغلاق المودال وإعادة تعيين الحقول
      setShowModal(false);
      setNewProject({
        name: '',
        description: '',
        tags: '',
        link: ''
      });
      
      // إعادة جلب المشاريع للتأكد من التحديث
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectsData);
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(prev => prev.filter(project => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus /> Add New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg">{project.name}</h3>
              <button 
                onClick={() => handleDeleteProject(project.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <FiX />
              </button>
            </div>
            <p className="text-gray-600 mt-2">{project.description}</p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags?.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-blue-600 hover:underline"
              >
                <FiExternalLink className="mr-1" /> Visit Project
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Modal لإضافة مشروع جديد */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Project</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={newProject.tags}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="e.g. React, Node.js, Design"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Project Link (optional)</label>
                <input
                  type="url"
                  name="link"
                  value={newProject.link}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;