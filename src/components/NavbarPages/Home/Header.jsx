import React from 'react';
import { GoPeople } from "react-icons/go";
import { FaStar ,FaStarHalfAlt  } from "react-icons/fa";

const Header = () => {
    const imageUrl = new URL('/assets/person.png', import.meta.url).href;
    const imageUrl2 = new URL('/assets/image.png', import.meta.url).href;
    const imageUrl3 = new URL('/assets/image2.png', import.meta.url).href;
    const imageUrl4 = new URL('/assets/p1.png', import.meta.url).href;
    const imageUrl5 = new URL('/assets/p2.png', import.meta.url).href;
    const imageUrl6 = new URL('/assets/p3.png', import.meta.url).href;
    const imageUrl7 = new URL('/assets/p4.png', import.meta.url).href;



  return (
    <header className="bg-[#F4FBFF] text-blue-600  p-4 h-[800px] shadow-md">

    {/* left side */}
        <div className="flex flex-col justify-center h-full p-15 mt-[30px] ">

            <h1 className=" text-black text-[30px]  w-[230px] md:text-[50px] md:w-[590px] font-bold mb-5 font-['Abhaya+Libre']">
            Gaining <span className='text-[#ECCD00]'>skills</span> and getting  <br/>
            <span className='text-[#ECCD00]'> hired </span> 
            is now easier.</h1>
            <p className="sm:text-[14px] w-[270px] md:text-lg mb-8 md:w-[500px] text-[#3f3f3f] font-['Murecho']">From interactive courses to premium study groups, SkillBridge is a comprehensive global learning platform for all students and graduates. Explore, enroll, earn, acquire skills, and get hired—all in one platform.</p>
            <img src={imageUrl2} alt="Image 1" className=" absolute w-[600px] top-26 left-0 md:w-[1400px] md:left-0 md:top-10  rounded-lg " />

           <div className='flex flex-col space-y-3 md:flex-row  w-[220px] md:w-[500px] mt-8'>
            {/* <button className="bg-blue-600  font-['Murecho'] text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-700 transition duration-300">Get Started</button>
            <button className=" bg-[#D8F2FF]  font-['Murecho'] border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">Get free trial</button> */}
            <button className="bg-blue-600  font-['Murecho'] text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-700 transition duration-300">Get Started</button>
            <button className=" bg-[#D8F2FF] font-['Murecho'] text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">Get free trial </button>
           </div>
        </div>

      {/* right side */}

     <div className=" justify-end mt-[-110px] relative hidden lg:block">
         <img src={imageUrl3} alt="Image 2" className="absolute w-[600px] top-[-700px] right-10 rounded-lg" />
         <img src={imageUrl} alt="Person" className="absolute w-[340px] top-[-670px] right-[190px] rounded-full mr-4" />
       
        <div className=' flex flex-row space-x-2 bg-[#D8F2FF] p-4 rounded-2xl items-center justify-center absolute top-[-540px] right-[70px] text-center'>
            <GoPeople size={40} />
            <h2 className='font-["Murecho"] font-bold text-[#3f3f3f]'>2k+ Experienced <br /> Instructors</h2>
        </div>

        <div className='flex flex-col space-y-3 bg-[#D8F2FF] p-6 pl-10 pr-10 rounded-2xl items-center justify-center absolute top-[-190px] right-[125px] text-center'>
            <div className='flex flex-row items-center space-x-5'>
               {/* images */}
                <div className='flex flex-row space-x-[-22px]'>
                     <img className='w-[50px]'  src={imageUrl4} alt="p1" />
                     <img className='w-[50px]'  src={imageUrl5} alt="p2" />
                     <img  className='w-[50px]' src={imageUrl6} alt="p3" />
                     <img  className='w-[50px]' src={imageUrl7} alt="p4" />
                </div>
               {/* stars */}

                <div className='flex flex-row space-x-1'>
                   <FaStar size={20} className='text-[#ECCD00]' />
                   <FaStar size={20} className='text-[#ECCD00]' />    
                   <FaStar size={20} className='text-[#ECCD00]' />
                   <FaStar size={20} className='text-[#ECCD00]' />
                   <FaStarHalfAlt size={20} className='text-[#ECCD00]' />
                </div>
       
               {/* numbers */}
                <div className='flex flex-row space-x-1'>
                    <h2 className='font-["Murecho"] font-bold text-[#3f3f3f]'>4.5</h2>
                    <span className='text-[#3f3f3f]'>/5</span>
                    <span className='text-[#3f3f3f]'>(80k Reviews)</span>
                </div>
            </div>
                
            <div>
              <h4 className='font-["Murecho"]  text-[#3f3f3f] text-center'>Over 
                <span className='font-bold'>  50,000+  </span>
                 learners engaged globally today.</h4>
            </div>
        </div>

{/*  details */}
     <div className='flex flex-row space-x-16 px-20 py-8 bg-[#D8F2FF] p-4 rounded-2xl items-center justify-center absolute top-8 right-[15%] text-center'>
          <div className='flex flex-col items-center space-y-2'>
            <h2 className='font-["Murecho"] font-bold text-4xl text-[#3f3f3f]'>100%</h2>
            <p className='text-[#3f3f3f]'>Satisfaction rate</p>
          </div>

          <FaStar size={20} className='text-[#ECCD00]' />

          <div className='flex flex-col items-center space-y-2'>  
            <h2 className='font-["Murecho"] font-bold text-[#3f3f3f] text-4xl'>+10</h2>
            
            <span className='text-[#3f3f3f]'>Years of experience</span>
          </div>    

          <FaStar size={20} className='text-[#ECCD00]' />
          <div className='flex flex-col items-center space-y-2'>
            <h2 className='font-["Murecho"] font-bold text-[#3f3f3f] text-4xl'>+20k</h2>
            <p className='text-[#3f3f3f]'>Total Courses</p>
          </div>

           <FaStar size={20} className='text-[#ECCD00]' />
          <div className='flex flex-col items-center space-y-2'>
            <h2 className='font-["Murecho"] font-bold text-[#3f3f3f] text-4xl'>+90</h2>
            <p className='text-[#3f3f3f]'>Course Category</p>
          </div>

          
     </div>

      </div>
    </header>
  );
};

export default Header;