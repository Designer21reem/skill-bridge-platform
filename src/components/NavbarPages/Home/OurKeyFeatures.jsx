import { HiCheckCircle } from "react-icons/hi2";
import { FaArrowTrendUp } from "react-icons/fa6";


const OurKeyFeatures = () => {
  return (
    <div className="bg-white py-16 mt-[173px]">
        {/* horizontal line */}
      <hr className="border-gray-300 mb-6 mx-10" />
      {/* Title and description */}
      <div className="text-center mb-8 flex flex-col items-center">
        <p className="text-gray-600 border-2 mb-12 border-[#888888] w-[160px] mt-[-24px] text-center rounded-full px-4 py-1">Our Key Features</p>
     </div>

    <div className="flex flex-col w-full lg:flex-row items-center justify-between container mx-auto px-4 py-8">
               {/* left side */}
        <div className="hidden w-[600px] lg:block  pl-10 ">
            <img 
            src="/assets/hand.png" 
            alt="Key Features" 
            className="w-full h-auto "
            />

            {/* div contain progress bar 70% */}
            <div className="mt-8 absolute top-[3360px] left-[100px] bg-[#d5d0e6] w-[450px] px-8 py-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Progress Tracking</span>
                <span className="text-black text-[20px] font-bold">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            {/* last month div */}
            <div className="mt-8 absolute top-[3510px] left-[180px] bg-[#d5d0e6] w-[290px] px-5 py-3 rounded-4xl shadow-md">
                <div className="flex items-center justify-between  mb-2">
                    <div className="flex flex-row gap-2 items-center">
                        <h3 className="text-gray-600 text-[16px] mb-2">Last Month</h3>
                     <FaArrowTrendUp className="text-gray-600 text-xl mb-2" />
                    </div>
                     <p className="text-black text-[20px] font-bold">35.20 %</p>

                </div>

                <button className="bg-blue-600 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">View all  </button>
            </div>
            
        </div>
               
               
               
               
               
         {/* right side features  */}
     <div className="container text-center w-[600px] mx-auto px-4 py-8">
       
       <div className="flex flex-col align-items-center justify-center text-center mb-8">
           <h1 className="text-2xl w-[300px] md:text-[50px] font-bold text-center font-['Abhaya+Libre'] md:w-[540px] text-black mb-6">Powerful Features for
            Your Learning Journey</h1>
            <p className="text-[14px] w-[280px] md:text-lg mb-8 md:w-[500px] text-[#3f3f3f] font-['Murecho']">From personalized recommendations to interactive content, we’ve got everything you need to succeed.</p>
       </div>
     
     
      {/* features */}

      <div className="flex flex-col align-items-center justify-center gap-2">
        {/* feature 1 */}
        <div className="bg-white p-6 rounded-lg w-[306px] md:w-[620px] flex items-center border-b-1 border-gray-200">
          <div className="text-left ">
            <HiCheckCircle className="text-2xl md:text-3xl text-blue-600 mb-[-20px]" />
           <div className="ml-9 mt-[-30px] font-['Murecho']">
             <h3 className="text-[15px] md:text-xl font-semibold mb-2  ">AI-Powered Learning Paths</h3>
            <p className="text-gray-600 w-[220px] md:w-[600px]">Courses recommended based on each learner’s goals and performance.</p>
           </div>

          </div>
       </div>
       {/* feature 2 */}
        <div className="bg-white p-6 rounded-lg w-[306px] md:w-[620px] flex items-center border-b-1 border-gray-200">
          <div className="text-left">
            <HiCheckCircle className="text-2xl md:text-3xl text-blue-600 mb-[-20px]" />
           <div className="ml-9 mt-[-30px] font-['Murecho']">
             <h3 className="text-[15px] md:text-xl font-semibold mb-2 ">Project-Based Learning</h3>
            <p className="text-gray-600  w-[220px] md:w-[600px]">Work on real-world business challenges and interactive simulations.</p>
           </div>

          </div>
       </div>
         {/* feature 3 */}
          <div className="bg-white p-6 rounded-lg w-[306px] md:w-[620px] flex items-center border-b-1 border-gray-200">
             <div className="text-left">
                <HiCheckCircle className="text-2xl md:text-3xl text-blue-600 mb-[-20px]" />
              <div className="ml-9 mt-[-30px] font-['Murecho']">
                 <h3 className="text-[15px] md:text-xl font-semibold mb-2 ">Industry-Recognized Certifications</h3>
                <p className="text-gray-600  w-[220px] md:w-[600px]">Official partnerships with employers who recognize and value our certificates.</p>
              </div>
    
             </div>
          </div>
            {/* feature 4 */}
            <div className="bg-white p-6 rounded-lg w-[306px] md:w-[620px] flex items-center border-b-1 border-gray-200">
                 <div className="text-left">
                    <HiCheckCircle className="text-2xl md:text-3xl text-blue-600 mb-[-20px]" />
                <div className="ml-9 mt-[-30px] font-['Murecho']">
                     <h3 className="text-[15px] md:text-xl font-semibold mb-2 ">Direct Hiring Opportunities</h3>
                    <p className="text-gray-600  w-[220px] md:w-[600px]">Collaborations with companies to help learners get hired.</p>
                </div>
        
                 </div>

            </div>

    {/* feature 5 */}

     <div className="bg-white p-6 rounded-lg w-[306px] md:w-[620px] flex items-center border-b-1 border-gray-200">
          <div className="text-left">
            <HiCheckCircle className="text-2xl md:text-3xl text-blue-600 mb-[-20px]" />
           <div className="ml-9 mt-[-30px] font-['Murecho']">
             <h3 className="text-[15px] md:text-xl font-semibold mb-2 ">User-Friendly Engagement System</h3>
            <p className="text-gray-600  w-[220px] md:w-[600px]">Easy-to-use interface with tools to track progress and milestones.</p>
           </div>

          </div>
       </div>
       {/* feature 6 */}
       <div className="bg-white p-6 rounded-lg w-[306px] md:w-[620px] flex items-center border-b-1 border-gray-200">
          <div className="text-left">
            <HiCheckCircle className="text-2xl md:text-3xl text-blue-600 mb-[-20px]" />
           <div className="ml-9 mt-[-30px] font-['Murecho']">
             <h3 className="text-[15px] md:text-xl font-semibold mb-2 ">Points and Rewards</h3>
            <p className="text-gray-600  w-[220px] md:w-[600px]">Earn points by learning, redeem them for discounts or premium content.</p>
           </div>

          </div>
       </div>
         {/* feature 7 */}
      <div className="bg-white p-6 rounded-lg w-[306px] md:w-[620px]  flex items-center border-b-1 border-gray-200">
          <div className="text-left">
            <HiCheckCircle className="text-2xl md:text-3xl text-blue-600 mb-[-20px]" />
           <div className="ml-9 mt-[-30px] font-['Murecho']">
             <h3 className="text-[15px] md:text-xl font-semibold mb-2 ">Corporate Challenges</h3>
            <p className="text-gray-600  w-[220px] md:w-[600px]">Special events like a 3-day product design sprint with prizes like internships.</p>
           </div>

          </div>
       </div>


     </div>

</div>

          </div>



     </div>
   
  );
};
export default OurKeyFeatures;