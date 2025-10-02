"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "contact",
          timestamp: new Date().toISOString()
        })
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Track analytics
      if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
        ((window as unknown as { gtag: Function }).gtag)("event", "contact_submit");
      }
    } catch (error) {
      console.error("Failed to submit contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=Hi, I'd like to know more about your services`;

  return (
    <>
      {/* Header */}
      <div className="bg-neutral-50 py-12 sm:py-16">
        <div className="container-custom">
          <div className="mb-4 text-sm text-neutral-600">
            <span>Home</span> <span className="mx-2">/</span> <span>Contact</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            We're here to help you find your dream property
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✓</div>
                  <h2 className="text-2xl font-serif font-bold mb-2">Thank You!</h2>
                  <p className="text-neutral-600 mb-6">
                    We&apos;ve received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-serif font-bold mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full py-3"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-accent text-2xl mr-4">📞</div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-neutral-600">Available on WhatsApp</p>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
                            ((window as unknown as { gtag: Function }).gtag)("event", "whatsapp_click", {
                              source: "contact_page"
                            });
                          }
                        }}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Chat on WhatsApp →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-accent text-2xl mr-4">📧</div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-neutral-600">info@cloudsevenrealty.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-accent text-2xl mr-4">⏰</div>
                    <div>
                      <h3 className="font-semibold mb-1">Hours</h3>
                      <p className="text-neutral-600">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 rounded-2xl p-6">
                <h3 className="font-semibold text-lg mb-3">Why Choose Us?</h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Verified legal titles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>On-ground support team</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Quick response on WhatsApp</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>100+ successful deals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
