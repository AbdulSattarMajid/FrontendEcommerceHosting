import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order through your dashboard once logged in.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for eligible items. Terms and conditions apply.",
  },
  {
    question: "How can I contact support?",
    answer: "Fill out the form on this page or email us at support@example.com.",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message submitted:", form);
    alert("Message submitted!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gray-100 px-4 md:px-8 flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* FAQ Section */}
        <div className="p-6 md:p-8 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-b pb-4"
            >
              <details className="cursor-pointer">
                <summary className="text-base md:text-lg font-semibold text-gray-700">
                  {faq.question}
                </summary>
                <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
              </details>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-blue-50 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-blue-500 text-sm md:text-base"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-blue-500 text-sm md:text-base"
              required
            />
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-blue-500 text-sm md:text-base"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-blue-500 text-sm md:text-base"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 text-sm md:text-base"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
