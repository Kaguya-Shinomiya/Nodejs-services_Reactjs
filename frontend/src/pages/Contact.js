import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/contact', form);
      setStatus(res.data.message || 'Gửi thành công!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Đã xảy ra lỗi. Vui lòng thử lại!');
    }
  };

  return (
    <div className="contact-form">
      <h2 className="text-2xl font-bold text-blue-600 text-center">Liên hệ với chúng tôi</h2>
      <p className="text-center mb-4">Hãy để lại tin nhắn và chúng tôi sẽ phản hồi sớm nhất có thể.</p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          name="name"
          type="text"
          placeholder="Tên của bạn"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-2"
        />
        <textarea
          name="message"
          placeholder="Tin nhắn"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-2"
          rows="5"
        />
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">Gửi tin nhắn</button>
        {status && <p className="text-center mt-2">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
