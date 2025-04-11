const Contact = require('../schemas/contact');

exports.sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
  }

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();

    res.json({ message: 'Tin nhắn của bạn đã được lưu!' });
  } catch (error) {
    console.error('Lỗi khi lưu tin nhắn:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại!' });
  }
};
