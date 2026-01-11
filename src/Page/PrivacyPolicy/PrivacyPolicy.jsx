import React from "react";
import { Link } from "react-router";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8 md:p-12">
        
        {/* Header */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Privacy Policy</h1>
          <p className="text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to <strong>Digital Life Lesson</strong>. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-2">We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Identity Data:</strong> Includes first name, last name, username, or similar identifier (often via Google/Social Login).</li>
              <li><strong>Contact Data:</strong> Includes email address.</li>
              <li><strong>User Content:</strong> The Life Lessons, stories, and comments you voluntarily post on the platform.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Register you as a new user.</li>
              <li>Manage your account and authentication.</li>
              <li>Enable you to post, edit, and delete your Life Lessons.</li>
              <li>Improve our website functionality and user experience.</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-lg font-bold text-blue-900 mb-2">4. Publicly Visible Information</h2>
            <p className="text-blue-800 text-sm">
              Please be aware that <strong>Life Lessons</strong> you post are intended for public viewing. 
              Any information you disclose in these lessons becomes public information. 
              We advise you not to share sensitive personal information (like phone numbers or home addresses) within your lesson content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. 
              We use secure authentication methods (like Firebase) to ensure your account remains safe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p>
              We use cookies to enhance your experience. These are small files stored on your device that help us remember your login status and preferences. 
              You can choose to disable cookies through your browser settings, but some parts of the site may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Third-Party Links</h2>
            <p>
              This website may include links to third-party websites, plug-ins, and applications. Clicking on those links may allow third parties to collect or share data about you. 
              We do not control these third-party websites and are not responsible for their privacy statements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="mt-2 font-semibold">Email: malam2331103bscse.uiu.ac.bd</p>
          </section>

        </div>

        {/* Footer / Back Button */}
        <div className="mt-10 border-t pt-6 flex justify-between items-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Digital Life Lesson. All rights reserved.</p>
            <Link to="/" className="btn btn-primary btn-outline">Back to Home</Link>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;