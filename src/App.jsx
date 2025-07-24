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

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavbarPages/Navbar';
import Home from './components/NavbarPages/Home/Home';
import Webinars from './components/NavbarPages/Webinars';
import Tech from './components/NavbarPages/Tech';
import Affiliate from './components/NavbarPages/Affiliate';
import Footer from './components/NavbarPages/Footer'; // Assuming you have a Footer component
const App = () => {
  return (
    <Router>
      <div className="min-h-screen pt-16"> {/* Padding top for fixed navbar */}
        <Navbar />
        <Routes>
          {/* الصفحة الرئيسية */}
          <Route path="/" element={<Home />} />
          {/* صفحة الويبينارات */}
          <Route path="/webinars" element={<Webinars />} />
          {/* صفحة التقنية */}
          <Route path="/tech" element={<Tech />} />
          {/* صفحة برنامج الشركاء */}
          <Route path="/affiliate" element={<Affiliate />} />
          {/* إعادة التوجيه للصفحة الرئيسية إذا لم يتم العثور على مسار */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;