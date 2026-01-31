const nodemailer = require('nodemailer');

// Create transporter (configure in production)
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  
  // For development, use ethereal.email
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'test@ethereal.email',
      pass: 'test'
    }
  });
};

const transporter = createTransporter();

/**
 * Send email
 */
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || '"Unidigitalcom" <noreply@unidigitalcom.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('📧 Email sent:', info.messageId);
    
    // Preview URL for ethereal emails
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('❌ Email send error:', error);
    throw error;
  }
};

/**
 * Send order confirmation email
 */
const sendOrderConfirmation = async (order, user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Thank you for your order!</h1>
      <p>Dear ${user.firstName},</p>
      <p>Your order <strong>#${order.orderNumber}</strong> has been received and is being processed.</p>
      
      <h2>Order Summary</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Item</th>
          <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Qty</th>
          <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
        </tr>
        ${order.items.map(item => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${item.price}</td>
          </tr>
        `).join('')}
      </table>
      
      <p><strong>Total: $${order.total}</strong></p>
      <p>Status: ${order.orderStatus}</p>
      
      <p>You can track your order in your account dashboard.</p>
      <p>Thank you for shopping with Unidigitalcom!</p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: `Order Confirmation #${order.orderNumber}`,
    html
  });
};

/**
 * Send welcome email
 */
const sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Welcome to Unidigitalcom!</h1>
      <p>Dear ${user.firstName},</p>
      <p>Thank you for creating an account with us. We're excited to have you on board!</p>
      <p>Start exploring our wide range of products and enjoy a seamless shopping experience.</p>
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Happy shopping!</p>
      <p>The Unidigitalcom Team</p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: 'Welcome to Unidigitalcom!',
    html
  });
};

module.exports = {
  sendEmail,
  sendOrderConfirmation,
  sendWelcomeEmail
};