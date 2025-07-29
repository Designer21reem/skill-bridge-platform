import React from 'react';

const Affiliate = () => {
  const commissionRates = [
    { tier: 'Basic', requirement: '1-10 referrals', rate: '10%' },
    { tier: 'Silver', requirement: '11-50 referrals', rate: '15%' },
    { tier: 'Gold', requirement: '51-100 referrals', rate: '20%' },
    { tier: 'Platinum', requirement: '100+ referrals', rate: '25%' },
  ];

  const successStories = [
    {
      name: 'Alex Johnson',
      role: 'University Student',
      earnings: '$1,200',
      quote: 'The affiliate program helped me earn while helping my classmates find great learning resources.'
    },
    {
      name: 'Sarah Miller',
      role: 'Career Counselor',
      earnings: '$3,450',
      quote: 'I recommend the platform to my students and earn commissions when they enroll in courses.'
    },
    {
      name: 'David Kim',
      role: 'Tech Blogger',
      earnings: '$5,800',
      quote: 'Sharing webinars and courses with my audience has been mutually beneficial.'
    },
  ];

  const marketingMaterials = [
    { name: 'Banners', formats: ['728x90', '300x250', '160x600'] },
    { name: 'Social Media Posts', formats: ['Facebook', 'Twitter', 'LinkedIn'] },
    { name: 'Email Templates', formats: ['HTML', 'Plain Text'] },
    { name: 'Video Previews', formats: ['30 sec', '60 sec'] },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-[#D8F2FF] text-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Earn While You Educate</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join our Affiliate Program and earn commissions by connecting learners with career-boosting opportunities
          </p>
          <a
            href="#signup"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Join the Program Now
          </a>
        </div>
      </header>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-6">
              <div className="bg-[#D8F2FF] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-600">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Sign Up</h3>
              <p className="text-gray-600">
                Register for free and get your unique affiliate link to share
              </p>
            </div>
            <div className="text-center px-6">
              <div className="bg-[#D8F2FF] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-600">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Share</h3>
              <p className="text-gray-600">
                Promote our platform through your website, social media, or personal network
              </p>
            </div>
            <div className="text-center px-6">
              <div className="bg-[#D8F2FF] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-600">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Earn</h3>
              <p className="text-gray-600">
                Get paid when your referrals enroll in courses or get hired through our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 bg-[#D8F2FF]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Commission Structure</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-600">
              <div className="grid grid-cols-4 bg-blue-600 text-white font-bold">
                <div className="p-4">Tier</div>
                <div className="p-4">Requirements</div>
                <div className="p-4">Commission Rate</div>
                <div className="p-4">Bonus</div>
              </div>
              {commissionRates.map((tier, index) => (
                <div key={index} className={`grid grid-cols-4 ${index % 2 === 0 ? 'bg-white' : 'bg-[#D8F2FF]'}`}>
                  <div className="p-4 font-medium">{tier.tier}</div>
                  <div className="p-4">{tier.requirement}</div>
                  <div className="p-4 text-blue-600 font-semibold">{tier.rate}</div>
                  <div className="p-4">
                    {tier.tier === 'Gold' || tier.tier === 'Platinum' ? 'Exclusive Webinars' : '-'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                * Additional $50 bonus for every successful job placement referral
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Materials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Marketing Materials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingMaterials.map((material, index) => (
              <div key={index} className="bg-[#D8F2FF] rounded-lg p-6 hover:shadow-md transition-shadow border border-blue-600">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{material.name}</h3>
                <ul className="space-y-2">
                  {material.formats.map((format, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{format}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <a href="#" className="text-blue-600 font-medium hover:underline inline-flex items-center">
                    Download All
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-[#D8F2FF] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-600">
                <div className="flex items-center mb-4">
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4 border-2 border-blue-600">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{story.name}</h3>
                    <p className="text-gray-600 text-sm">{story.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{story.quote}"</p>
                <div className="bg-white text-blue-600 px-3 py-2 rounded-md inline-block border border-blue-600">
                  Earned: {story.earnings}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up CTA */}
      <section id="signup" className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join our affiliate program today and start monetizing your network
          </p>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8 text-gray-800">
              <h3 className="text-2xl font-bold mb-6">Affiliate Sign Up</h3>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-left text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-left text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-left text-gray-700 mb-2">Website or Social Media (optional)</label>
                    <input
                      type="url"
                      id="website"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label htmlFor="audience" className="block text-left text-gray-700 mb-2">Audience Size</label>
                    <select
                      id="audience"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="1-1k">1 - 1,000</option>
                      <option value="1k-10k">1,001 - 10,000</option>
                      <option value="10k-50k">10,001 - 50,000</option>
                      <option value="50k+">50,000+</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 mr-2"
                      required
                    />
                    <span className="text-gray-700 text-sm">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Affiliate Program Terms</a>
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-md font-bold hover:bg-blue-700 transition-colors"
                >
                  Apply to the Program
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="border border-[#D8F2FF] rounded-lg overflow-hidden">
                <button className="w-full flex justify-between items-center p-6 text-left bg-[#D8F2FF] hover:bg-blue-100 transition-colors">
                  <span className="text-lg font-medium text-gray-800">How do I get paid?</span>
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="p-6 bg-white border-t border-[#D8F2FF]">
                  <p className="text-gray-600">
                    We pay affiliates monthly via PayPal, bank transfer, or other payment methods. There's a minimum payout threshold of $50. Payments are processed by the 15th of each month for the previous month's earnings.
                  </p>
                </div>
              </div>
              <div className="border border-[#D8F2FF] rounded-lg overflow-hidden">
                <button className="w-full flex justify-between items-center p-6 text-left bg-[#D8F2FF] hover:bg-blue-100 transition-colors">
                  <span className="text-lg font-medium text-gray-800">How are referrals tracked?</span>
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="p-6 bg-white border-t border-[#D8F2FF]">
                  <p className="text-gray-600">
                    When someone clicks your unique affiliate link, we place a cookie in their browser that lasts for 30 days. Any enrollment or job placement that happens within that period will be credited to your account, even if they don't purchase immediately.
                  </p>
                </div>
              </div>
              <div className="border border-[#D8F2FF] rounded-lg overflow-hidden">
                <button className="w-full flex justify-between items-center p-6 text-left bg-[#D8F2FF] hover:bg-blue-100 transition-colors">
                  <span className="text-lg font-medium text-gray-800">Can I participate if I'm not an influencer?</span>
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="p-6 bg-white border-t border-[#D8F2FF]">
                  <p className="text-gray-600">
                    Absolutely! Many of our most successful affiliates are educators, career counselors, or simply passionate learners who share our resources with their personal networks. You don't need a large following to participate.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <a href="#" className="text-blue-600 font-medium hover:underline">
                View all FAQs →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliate;