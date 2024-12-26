import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-cyan-800 text-white">
        <h2 className="text-4xl font-bold text-green-300">Become a Volunteer</h2>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse justify-around">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQArVdjcmvVSnCAlgDe039Z9jK98tarBJKn-Q&s"
            className="rounded-lg shadow-2xl"
          />
          <div>
            <p className="py-6">
            Volunteers are the backbone of Agamis daily operations. These are but some of the tasks taken on by our volunteers: delivering supplies or teaching classes in schools, monitoring project impacts, writing about Agami’s operations and impact, and assisting our fundraising efforts. Every day, our volunteers help to address the challenges faced in Agamis ambitious mission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
