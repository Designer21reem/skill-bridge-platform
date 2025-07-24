const OurTrustedPartners = () => {
  return (
    <div className="our-trusted-partners">
      {/* horizontal line */}
      <hr className="border-gray-300 mb-6 mx-10" />
      {/* Title and description */}
      <div className="text-center mb-8 flex flex-col items-center">
        <p className="text-gray-600 border-2 mb-12 border-[#888888] w-[180px] mt-[-24px] text-center rounded-full px-4 py-1">Our Trusted Partners</p>

     </div>

        <div className="bg-[#d4efff] flex flex-col items-center justify-between container mx-auto text-center px-4 py-8 w-[800px] rounded-2xl
        absolute top-[3761px] left-[350px] z-[-1]">
          <h1 className="text-[50px] font-['Abhaya+Libre'] mt-10 font-bold text-black mb-6"> Our Trusted Partners</h1>
          <p className="text-gray-700 font-['Murecho'] w-[500px]">We collaborate with industry leaders and organizations to bring you the best resources, expertise ,and opportunities for success.</p>
           
           <div className="flex flex-wrap justify-center mt-8 w-[600px]">
            <img src="/assets/microsoft.png" alt="Partner 1" className="w-[150px] h-auto mx-2 my-4" /><img src="/assets/google.png" alt="Partner 1" className="w-[150px] h-auto mx-2 my-4" />
           <img src="/assets/linkedin.png" alt="Partner 7" className="w-[80px] h-[80px]  mx-2 my-4" />
            <img src="/assets/meta.png" alt="Partner 2" className="w-[150px] h-auto mx-2 my-4" />
            <img src="/assets/ibm.png" alt="Partner 3" className="w-[150px] h-auto mx-2 my-4" />
            <img src="/assets/amazon.png" alt="Partner 4" className="w-[150px] h-auto mx-2 my-4" />
            {/* <img src="/assets/google.png" alt="Partner 5" className="w-[150px] h-auto mx-2 my-4" /> */}
            <img src="/assets/google-meet.png" alt="Partner 6" className="w-[80px] h-[80px] mx-2 my-4" />
           </div>
        </div>
    
    </div>
  );
}

export default OurTrustedPartners;