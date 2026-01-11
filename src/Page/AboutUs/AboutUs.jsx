import React from "react";

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="bg-gradient-to-r from-[#cca3b3] to-[#8a6b7a] bg-clip-text text-transparent">Digital Life Lesson</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Empowering learners with practical digital skills for today and the future.
          </p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Digital Life Lesson</strong> is a professional digital learning platform
              dedicated to helping students and professionals build essential skills
              in technology, digital literacy, and modern tools. We focus on making
              complex digital concepts simple, practical, and easy to apply in real life.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our lessons are designed to be industry-relevant, beginner-friendly,
              and aligned with current digital trends so learners can confidently
              move forward in their academic and professional journeys.
            </p>
          </div>

          {/* Right Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Our Core Values
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li>✔ Practical and skill-focused learning</li>
              <li>✔ Clear and easy-to-understand lessons</li>
              <li>✔ Updated and industry-relevant content</li>
              <li>✔ Supportive and learner-friendly environment</li>
            </ul>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to improve digital literacy and empower individuals
              with practical knowledge that helps them become confident, independent,
              and successful in the digital world.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              We envision a global learning community where anyone can gain
              digital skills, adapt to technological changes, and build a
              successful future through continuous learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
