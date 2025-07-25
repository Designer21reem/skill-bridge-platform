const Footer = () => {
  return (
    <footer className="w-full bg-[#D8F2FF] text-black py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Top Section - Contact, Email, Social */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8 mx-20">
          {/* Contact Info - moves to top on mobile */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-600 text-center lg:text-left">Email: info@example.com</p>
            <p className="text-gray-600 text-center lg:text-left">Phone: +1 234 567 890</p>
          </div>

          {/* Email Subscription - full width on mobile, centered on tablet+ */}
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="flex flex-col items-center w-full mx-auto">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-center font-['Abhaya+Libre']">
                Start Your Learning Journey Today!
              </h3>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl text-center font-['Murecho'] mb-4">
                Browse courses and unlock new skills to reach your goals and get a job.
              </p>
              <div className="relative w-full max-w-md mx-auto md:w-full">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-[#F7F7F7] rounded-lg px-4 py-3 w-full pr-24"
                />
                <button className="bg-blue-600 text-[10px] md:text-[16px] absolute top-0 right-0 h-full text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Social Media - moves to bottom on mobile */}
          <div className="flex flex-col items-center lg:items-end">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <img src="/assets/Facebook.png" alt="Facebook" className="h-8 w-8 cursor-pointer hover:opacity-80" />
              <img src="/assets/X.png" alt="Twitter" className="h-8 w-8 cursor-pointer hover:opacity-80" />
              <img src="/assets/Instagram.png" alt="Instagram" className="h-8 w-8 cursor-pointer hover:opacity-80" />
              <img src="/assets/YouTube.png" alt="YouTube" className="h-8 w-8 cursor-pointer hover:opacity-80" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-6" />

        {/* Middle Section - Logo and Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6 mx-20">
          <img src="/assets/logo.png" className="w-40 md:w-48" alt="Company Logo" />
          
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition duration-300 text-sm md:text-base">Home</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition duration-300 text-sm md:text-base">Webinars</a>
            <a href="/services" className="text-gray-700 hover:text-blue-600 transition duration-300 text-sm md:text-base">Tech</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 transition duration-300 text-sm md:text-base">Affiliate Program</a>
          </nav>

          <div className="flex flex-wrap justify-center gap-2">
            <a href="/" className="text-blue-600 hover:text-blue-500 transition duration-300 text-sm md:text-base">Terms & Conditions</a>
            <span className="text-gray-400 hidden md:inline">|</span>
            <a href="/" className="text-blue-600 hover:text-blue-500 transition duration-300 text-sm md:text-base">Privacy Policy</a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-6" />

        {/* Bottom Section - Copyright and Payments */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full mx-auto gap-4 md:mx-20">
          <p className="text-gray-600 text-sm text-center md:text-left">
           copy right © 2025 Your Company. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <img src="/assets/Visa.png" alt="Visa" className="h-8 md:h-10" />
            <img src="/assets/MasterCard.png" alt="MasterCard" className="h-8 md:h-10" />
            <img src="/assets/GooglePay.png" alt="Google Pay" className="h-8 md:h-10" />
            <img src="/assets/AmazonPay.png" alt="Amazon Pay" className="h-8 md:h-10" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;