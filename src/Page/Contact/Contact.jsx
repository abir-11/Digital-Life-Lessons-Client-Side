import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Swal from "sweetalert2";
const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default form submit

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;

        // Optional: you can validate here

        // Trigger default mailto
        window.location.href = `mailto:support@digitallifelesson.com?subject=Message from ${name}&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

        // SweetAlert2 success
        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Your email client should open now. Check your draft or sent folder.",
            confirmButtonText: "OK",
        });

        // Reset the form
        form.reset();
    };

    return (
        <section className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Contact <span className="text-primary">Us</span>
                    </h1>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        No SMS required. You can contact us easily via email or WhatsApp.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-2xl shadow">
                        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

                        <div className="space-y-5 text-gray-700">
                            <div className="flex items-center gap-4">
                                <Mail className="text-primary" />
                                <div className="flex flex-col">
                                    {/* Default mail app */}
                                    <a
                                        href="mailto:malam2331103@bscse.ac.bd"
                                        className="hover:underline text-primary"
                                    >
                                        malam2331103@bscse.ac.bd
                                    </a>

                                    {/* Gmail fallback */}
                                    <a
                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=malam2331103@bscse.ac.bd"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-gray-500 hover:underline"
                                    >
                                        Open in Gmail
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Phone className="text-primary" />
                                <a
                                    href="https://wa.me/8801306979918"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline"
                                >
                                    WhatsApp: +880 1306 979 918
                                </a>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="text-primary" />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>

                        <p className="mt-6 text-gray-600">
                            We usually reply within 24 hours through email or WhatsApp.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow">
                        <h2 className="text-2xl font-semibold mb-6">Send Message via Email</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block mb-1 font-medium">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Message</label>
                                <textarea
                                    rows="4"
                                    name="message"
                                    required
                                    placeholder="Write your message here"
                                    className="textarea textarea-bordered w-full"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                Send Email
                            </button>
                        </form>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-semibold mb-3">We’re Here to Help</h3>
                    <p className="text-gray-600">
                        Contact us anytime — no SMS, no extra steps.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
