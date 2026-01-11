import React from 'react';
import { Link } from 'react-router';

const TermsConditions = () => {
    return (
       <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8 md:p-12">
        
        {/* Header */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Terms & Conditions</h1>
          <p className="text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing and using <strong>Digital Life Lesson</strong>, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. User Accounts</h2>
            <p>
              To access certain features of the platform (like posting lessons), you may be required to register for an account. You are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Maintaining the confidentiality of your account credentials.</li>
              <li>All activities that occur under your account.</li>
              <li>Providing accurate and current information during registration.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. User-Generated Content</h2>
            <p className="mb-2">
              Our platform allows you to post life lessons, stories, and comments. You retain ownership of your content, but you grant <strong>Digital Life Lesson</strong> a license to display and share it on the platform.
            </p>
            <p className="font-semibold text-red-500 mt-2">You agree NOT to post content that:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>Is hateful, discriminatory, or promotes violence.</li>
              <li>Violates copyright or intellectual property rights.</li>
              <li>Contains spam, scams, or misleading information.</li>
              <li>Discloses sensitive private information of others.</li>
            </ul>
            <p className="mt-2 text-sm italic">
              We reserve the right to remove any content that violates these terms without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
            <p>
              The platform itself, including its branding, logo, code, and design, is the property of <strong>Digital Life Lesson</strong>. 
              You may not copy, modify, or distribute the platform's proprietary materials without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Termination</h2>
            <p>
              We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p>
              <strong>Digital Life Lesson</strong> is provided on an "AS IS" and "AS AVAILABLE" basis. We are not liable for any direct, indirect, incidental, 
              or consequential damages resulting from your use of the service or any content posted by other users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any significant changes by updating the date at the top of this page. 
              Your continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <p className="mt-2 font-semibold">Email: malam2331103bscse.uiu.ac.bd</p>
          </section>

        </div>

        {/* Footer / Buttons */}
        <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
               © {new Date().getFullYear()} Digital Life Lesson. All rights reserved.
            </div>
            <div className="flex gap-4">
                <Link to="/privacy-policy" className="btn btn-ghost btn-sm">Privacy Policy</Link>
                <Link to="/" className="btn btn-primary btn-outline btn-sm">Back to Home</Link>
            </div>
        </div>

      </div>
    </div>
    );
};

export default TermsConditions;