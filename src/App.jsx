// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/NavbarPages/Navbar';
// import Home from './components/NavbarPages/Home/Home';
// import Webinars from './components/NavbarPages/Webinars';
// import Tech from './components/NavbarPages/Tech';
// import Affiliate from './components/NavbarPages/Affiliate';

// const App = () => {
//   return (
//     <Router>
//       <div className="min-h-screen pt-16"> {/* Padding top for fixed navbar */}
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/webinars" element={<Webinars />} />
//           <Route path="/tech" element={<Tech />} />
//           <Route path="/affiliate" element={<Affiliate />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/NavbarPages/Navbar/Navbar';
import Home from './components/NavbarPages/Home/Home';
import Webinars from './components/NavbarPages/Webinars';
import Tech from './components/NavbarPages/Tech';
import Affiliate from './components/NavbarPages/Affiliate';
import Footer from './components/NavbarPages/Footer';
import initializeData from './firebase/initData';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AddTask from './components/NavbarPages/Navbar/ProfilePage/AddTask';

const AppContent = () => {
  const location = useLocation();
  const isAddTaskPage = location.pathname === '/add-task';

  return (
    <div className="min-h-screen pt-16">
      {!isAddTaskPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/affiliate" element={<Affiliate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
      {!isAddTaskPage && <Footer />}
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await initializeData();
          if (!localStorage.getItem('currentUser')) {
            localStorage.setItem('currentUser', JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL
            }));
          }
        } catch (error) {
          console.error("Initialization error:", error);
        }
      } else {
        localStorage.removeItem('currentUser');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;