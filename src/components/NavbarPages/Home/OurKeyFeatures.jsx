const OurKeyFeatures = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
            <p>Learn from industry leaders with years of experience.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
            <p>Study at your own pace with our online courses.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Certification</h3>
            <p>Receive a certificate upon course completion.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurKeyFeatures;