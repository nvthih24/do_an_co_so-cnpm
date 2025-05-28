// routes/contact.js
const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL, // ví dụ: 'Job Portal <admin@yourdomain.com>'
      to: to, // hoặc đổi tên thành 'recipientEmail'
      subject,
      html: `<p>${message}</p>`,
    });

    res.json({ message: 'Email sent successfully', id: result.id });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});


module.exports = router;
