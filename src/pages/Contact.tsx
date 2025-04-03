import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: null });

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);

      if (error) throw error;

      setStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-24 pb-16 bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Get in Touch</h1>
        <div className="bg-black rounded-lg p-8">
          {status.message && (
            <div className={`mb-6 p-4 rounded-lg ${
              status.type === 'success' 
                ? 'bg-green-500/10 border border-green-500 text-green-500'
                : 'bg-red-500/10 border border-red-500 text-red-500'
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
            >
              Send Message
              <Send size={20} className="ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;