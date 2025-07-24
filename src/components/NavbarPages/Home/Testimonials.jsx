import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "These courses completely transformed my career. I went from junior developer to team lead in just one year!",
      name: "Ahmed Khalid",
      role: "Senior Frontend Developer",
      avatar: "/assets/p1.png"
    },
    {
      id: 2,
      quote: "The practical approach helped me apply what I learned immediately. My salary increased by 60% after completing two courses.",
      name: "Sarah Mohammed",
      role: "UX Designer",
      avatar: "/assets/p2.png"
    },
    {
      id: 3,
      quote: "Best investment in my education. The instructors are industry experts who really care about student success.",
      name: "Omar Al-Farsi",
      role: "Digital Marketing Manager",
      avatar: "/assets/p3.png"
    },
    {
      id: 4,
      quote: "The quality of content exceeded my expectations. I was able to switch careers thanks to these courses.",
      name: "Layla Ahmed",
      role: "Data Scientist",
      avatar: "/assets/p4.png"
    },
    {
      id: 5,
      quote: "Flexible learning schedule and excellent support team. Highly recommended for working professionals.",
      name: "Khalid Hassan",
      role: "Product Manager",
      avatar: "/assets/p5.png"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex(prev => 
      prev >= testimonials.length - itemsToShow ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => 
      prev === 0 ? testimonials.length - itemsToShow : prev - 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex, 
    currentIndex + itemsToShow
  );

  // إذا وصلنا للنهاية ونعرض أقل من itemsToShow
  if (visibleTestimonials.length < itemsToShow) {
    const remaining = itemsToShow - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remaining));
  }

  return (
    <div className="max-w-7xl mt-[173px] mx-auto px-4 sm:px-6 py-12 md:py-16 relative overflow-hidden">
      {/* العنوان والوصف */}
      <div className="text-center mb-10 md:mb-12">
        <h1 className="text-2xl md:text-[50px] font-['Abhaya+Libre'] font-bold text-gray-900 mb-3 md:mb-4">
          What Our Learners Are Saying
        </h1>
        <p className="text-sm md:text-[20px] font-['Murecho'] text-gray-600 max-w-2xl mx-auto">
          Hear directly from our students about how our courses have transformed their careers.
        </p>
      </div>

      {/* بطاقات التعليقات */}
      <div className="relative">
        {/* أزرار التنقل */}
        <button 
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-4 z-10
                    bg-white p-2 rounded-full shadow-md hover:bg-gray-100
                    transition-all duration-300 hover:scale-110"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="text-gray-700 text-lg md:text-xl" />
        </button>
        
        <div className="mx-8 md:mx-12 lg:mx-16">
          <div className={`grid gap-6 md:gap-8 
              ${itemsToShow === 1 ? 'grid-cols-1' : ''}
              ${itemsToShow === 2 ? 'grid-cols-2' : ''}
              ${itemsToShow === 3 ? 'grid-cols-3' : ''}`}>
            {visibleTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg
                          transition-all duration-300 flex flex-col h-full"
              >
                <div className="text-blue-500 text-2xl mb-3 md:mb-4">
                  <FaQuoteLeft />
                </div>
                
                <p className="text-gray-700 italic mb-4 md:mb-6 text-sm md:text-base flex-grow">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center mt-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 mr-3 md:mr-4
                                overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-4 z-10
                    bg-white p-2 rounded-full shadow-md hover:bg-gray-100
                    transition-all duration-300 hover:scale-110"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="text-gray-700 text-lg md:text-xl" />
        </button>
      </div>

      {/* نقاط التوجيه */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: testimonials.length - itemsToShow + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300
                      ${currentIndex === index ? 'bg-blue-500 w-4 sm:w-6' : 'bg-gray-300'}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;