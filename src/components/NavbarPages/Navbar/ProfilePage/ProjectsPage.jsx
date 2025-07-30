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
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!currentUser) {
          setError("You must be logged in to view projects");
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects: ", error);
        setError("Failed to load projects. Please check your permissions.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("You must be logged in to add projects");
      return;
    }

    try {
      const tagsArray = newProject.tags.split(',').map(tag => tag.trim());
      
      const projectData = {
        ...newProject,
        tags: tagsArray,
        createdAt: new Date(),
        createdBy: currentUser.uid
      };

      // إضافة المشروع الجديد إلى Firestore
      const docRef = await addDoc(collection(db, 'projects'), projectData);
      
      // تحديث القائمة المحلية باستخدام المعرف الفعلي من Firestore
      setProjects(prev => [...prev, { ...projectData, id: docRef.id }]);
      
      setShowModal(false);
      setNewProject({
        name: '',
        description: '',
        tags: '',
        link: ''
      });
    } catch (error) {
      console.error("Error adding project: ", error);
      setError("Failed to add project. Please check your permissions.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      // التحقق من أن المستخدم هو منشئ المشروع
      const projectToDelete = projects.find(p => p.id === projectId);
      if (!projectToDelete || projectToDelete.createdBy !== currentUser?.uid) {
        setError("You can only delete your own projects");
        return;
      }

      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(prev => prev.filter(project => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project: ", error);
      setError("Failed to delete project. Please check your permissions.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        {currentUser && (
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiPlus /> Add New Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No projects found
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg">{project.name}</h3>
                {project.createdBy === currentUser?.uid && (
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-gray-400 hover:text-red-500"
                    aria-label="Delete project"
                  >
                    <FiX />
                  </button>
                )}
              </div>
              <p className="text-gray-600 mt-2">{project.description}</p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags?.map((tag, index) => (
                  <span key={`${project.id}-tag-${index}`} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
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
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Project</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
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