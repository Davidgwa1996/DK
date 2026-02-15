require('dotenv').config();
const sgMail = require('@sendgrid/mail');

console.log('SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
console.log('SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendTest() {
  try {
    const msg = {
      to: 'davidmaina3713413@gmail.com',
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: process.env.SENDGRID_FROM_NAME || 'UniDigital Marketplace',
      },
      subject: 'Test Email from UniDigital',
      html: '<p>If you receive this, SendGrid is working correctly.</p>',
    };
    
    const result = await sgMail.send(msg);
    console.log('✅ Test email sent successfully!', result);
  } catch (error) {
    console.error('❌ Test email failed:');
    console.error(error.response?.body || error);
  }
}

sendTest();