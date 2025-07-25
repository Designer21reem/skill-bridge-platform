
import React from 'react';
import Header from './Header';
import OurCourses from './OurCourses';
import OurKeyFeatures from './OurKeyFeatures';
import OurTrustedPartners from  './OurTrustedPartners';
import SubscriptionPlans from './SubscriptionPlans';
import Testimonials from './Testimonials';
import EventsWebinars from './EventsWebinars';

const Home = () => {
  return (
    
   <main className="overflow-x-hidden">
      <Header />
      <OurCourses />
      <OurKeyFeatures />
      <OurTrustedPartners/>
      <SubscriptionPlans/>
      <Testimonials/>
      <EventsWebinars />
   </main>
  
 
  );
};

export default Home;