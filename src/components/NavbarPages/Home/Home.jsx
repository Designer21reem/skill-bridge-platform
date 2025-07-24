
import React from 'react';
import Header from './Header';
import OurCourses from './OurCourses';
import { main } from 'framer-motion/client';
import OurKeyFeatures from './OurKeyFeatures';
import OurTrustedPartners from  './OurTrustedPartners';
import SubscriptionPlans from './SubscriptionPlans';
import Testimonials from './Testimonials';
const Home = () => {
  return (
    
   <main>
      <Header />
      <OurCourses />
      <OurKeyFeatures />
      <SubscriptionPlans/>
      <Testimonials/>
   </main>
  
 
  );
};

export default Home;