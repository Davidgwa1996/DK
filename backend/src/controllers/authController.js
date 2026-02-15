const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

// ------------------------------------------------------------------
// Generate JWT Token
// ------------------------------------------------------------------
const generateToken = (id, market = 'US', rememberMe = false) => {
  const expiresIn = rememberMe ? '90d' : '30d';
  return jwt.sign({ id, market }, process.env.JWT_SECRET, { expiresIn });
};

// ------------------------------------------------------------------
// SendGrid configuration with validation and detailed logging
// ------------------------------------------------------------------
console.log('🔧 Initializing SendGrid...');
console.log('SENDGRID_API_KEY exists:', !!process.env.SENDGRID_API_KEY);
console.log('SENDGRID_FROM_EMAIL:', process.env.SENDGRID_FROM_EMAIL);
console.log('SENDGRID_FROM_NAME:', process.env.SENDGRID_FROM_NAME);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

if (!process.env.SENDGRID_API_KEY) {
  console.error('❌ SENDGRID_API_KEY is not set in environment variables');
} else if (!process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  console.error('❌ SENDGRID_API_KEY must start with "SG."');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid API key configured successfully');
}

// Helper to send emails using SendGrid with proper error handling and logging
const sendEmail = async ({ to, subject, html }) => {
  console.log(`📧 Preparing to send email to: ${to}`);
  console.log(`📧 Subject: ${subject}`);
  
  // Validate required fields
  if (!process.env.SENDGRID_FROM_EMAIL) {
    console.error('❌ SENDGRID_FROM_EMAIL is not set');
    throw new Error('SENDGRID_FROM_EMAIL is not set');
  }
  if (!process.env.SENDGRID_API_KEY) {
    console.error('❌ SENDGRID_API_KEY is not set');
    throw new Error('SENDGRID_API_KEY is not set');
  }

  const msg = {
    to,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME || 'UniDigital Marketplace',
    },
    subject,
    html,
  };
  
  console.log('📧 Message object:', JSON.stringify(msg, null, 2));
  
  try {
    const result = await sgMail.send(msg);
    console.log('✅ Email sent successfully to:', to);
    console.log('📧 SendGrid response:', result);
    return result;
  } catch (error) {
    console.error('❌ SendGrid error details:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('SendGrid response body:', error.response.body);
    }
    if (error.code) {
      console.error('Error code:', error.code);
    }
    throw error;
  }
};

// ------------------------------------------------------------------
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
// ------------------------------------------------------------------
const registerUser = async (req, res) => {
  console.log('📝 Registration attempt started');
  console.log('Request body:', { 
    ...req.body, 
    password: '[REDACTED]' 
  });
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { 
      firstName,
      lastName,
      email, 
      password, 
      phone, 
      market = 'US',
      acceptTerms 
    } = req.body;

    if (!acceptTerms) {
      console.log('❌ Terms not accepted');
      return res.status(400).json({
        success: false,
        message: 'You must accept the terms and conditions'
      });
    }

    if (!firstName || !lastName) {
      console.log('❌ Missing first or last name');
      return res.status(400).json({
        success: false,
        message: 'First name and last name are required'
      });
    }

    console.log('🔍 Checking if user exists:', email);
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    console.log('👤 Creating new user...');
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      password,
      phone,
      market,
      preferences: {
        currency: market === 'GB' ? 'GBP' : market === 'JP' ? 'JPY' : market === 'CN' ? 'CNY' : 'USD',
        language: 'en',
        notifications: true
      }
    });
    console.log('✅ User created with ID:', user._id);

    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = verificationToken;
    user.verificationExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    console.log('🔑 Verification token generated and saved');

    // Send verification email
    console.log('📧 Attempting to send verification email to:', user.email);
    try {
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
      console.log('🔗 Verification URL:', verificationUrl);
      
      await sendEmail({
        to: user.email,
        subject: 'Verify Your Email - UniDigital Marketplace',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #2563eb;">Welcome to UniDigital Marketplace!</h2>
            <p>Hello <strong>${firstName}</strong>,</p>
            <p>Please verify your email address by clicking the button below:</p>
            <a href="${verificationUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; font-weight: 600;">
              Verify Email
            </a>
            <p style="color: #666;">This link will expire in 24 hours.</p>
            <p style="color: #666;">If you didn't create an account, you can ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              UniDigital Marketplace – Global Tech & Automotive
            </p>
          </div>
        `
      });
      console.log('✅ Verification email sent successfully');
    } catch (emailError) {
      console.error('❌ Failed to send verification email:');
      console.error('Error details:', emailError);
      // Continue - user still created
    }

    const token = generateToken(user._id, market);
    console.log('✅ Registration completed successfully for:', user.email);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        market: user.market,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// ------------------------------------------------------------------
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ------------------------------------------------------------------
const loginUser = async (req, res) => {
  console.log('🔐 Login attempt for:', req.body.email);
  
  try {
    const { email, password, market = 'US', rememberMe = false } = req.body;

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Please enter email and password'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    console.log('🔍 User found:', !!user);

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('✅ User verified status:', user.isVerified);
    if (!user.isVerified) {
      console.log('❌ User not verified');
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in',
        requiresVerification: true
      });
    }

    if (!user.isActive) {
      console.log('❌ Account deactivated');
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    console.log('🔑 Password match:', isPasswordMatch);

    if (!isPasswordMatch) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      user.lastFailedLogin = new Date();
      
      if (user.failedLoginAttempts >= 5) {
        user.isLocked = true;
        user.lockUntil = Date.now() + 30 * 60 * 1000;
        console.log('🔒 Account locked due to too many attempts');
      }
      
      await user.save();
      
      return res.status(401).json({
        success: false,
        message: user.isLocked 
          ? 'Account locked due to too many failed attempts. Try again in 30 minutes.'
          : 'Invalid email or password',
        attemptsRemaining: 5 - (user.failedLoginAttempts || 0)
      });
    }

    // Reset failed attempts on success
    user.failedLoginAttempts = 0;
    user.isLocked = false;
    user.lockUntil = undefined;
    user.lastLogin = new Date();
    user.market = market;
    await user.save();
    console.log('✅ Login successful for:', user.email);

    const token = generateToken(user._id, market, rememberMe);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        market: user.market,
        role: user.role,
        avatar: user.avatar,
        preferences: user.preferences,
        cart: user.cart || { items: [], total: 0 },
        wishlist: user.wishlist || []
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// ------------------------------------------------------------------
// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
// ------------------------------------------------------------------
const verifyEmail = async (req, res) => {
  console.log('🔐 Email verification attempt for token:', req.params.token);
  
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() }
    });
    console.log('🔍 User found for verification:', !!user);

    if (!user) {
      console.log('❌ Invalid or expired token');
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();
    console.log('✅ Email verified for user:', user.email);

    res.json({
      success: true,
      message: 'Email verified successfully! You can now login.'
    });
  } catch (error) {
    console.error('❌ Verify email error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Email verification failed'
    });
  }
};

// ------------------------------------------------------------------
// @desc    Resend verification email
// @route   POST /api/auth/resend-verification
// @access  Public
// ------------------------------------------------------------------
const resendVerification = async (req, res) => {
  console.log('📧 Resend verification attempt for:', req.body.email);
  
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('🔍 User found:', !!user);

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isVerified) {
      console.log('✅ Email already verified');
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = verificationToken;
    user.verificationExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    console.log('🔑 New verification token generated');

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    console.log('🔗 Verification URL:', verificationUrl);
    
    await sendEmail({
      to: user.email,
      subject: 'Verify Your Email - UniDigital Marketplace',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #2563eb;">Verify Your Email</h2>
          <p>Hello <strong>${user.firstName}</strong>,</p>
          <p>Click the button below to verify your email:</p>
          <a href="${verificationUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; font-weight: 600;">
            Verify Email
          </a>
          <p style="color: #666;">This link will expire in 24 hours.</p>
        </div>
      `
    });
    console.log('✅ Verification email resent to:', user.email);

    res.json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    console.error('❌ Resend verification error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to resend verification email'
    });
  }
};

// ------------------------------------------------------------------
// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
// ------------------------------------------------------------------
const forgotPassword = async (req, res) => {
  console.log('🔐 Forgot password request for:', req.body.email);
  
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('🔍 User found:', !!user);

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({
        success: false,
        message: 'No account found with this email'
      });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    console.log('🔑 Password reset token generated');

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log('🔗 Reset URL:', resetUrl);
    
    await sendEmail({
      to: user.email,
      subject: 'Password Reset - UniDigital Marketplace',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #2563eb;">Reset Your Password</h2>
          <p>Hello <strong>${user.firstName}</strong>,</p>
          <p>You requested a password reset. Click the button below to reset your password:</p>
          <a href="${resetUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; font-weight: 600;">
            Reset Password
          </a>
          <p style="color: #666;">This link will expire in 1 hour.</p>
          <p style="color: #666;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    });
    console.log('✅ Password reset email sent to:', user.email);

    res.json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset'
    });
  }
};

// ------------------------------------------------------------------
// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
// ------------------------------------------------------------------
const resetPassword = async (req, res) => {
  console.log('🔐 Password reset attempt with token');
  
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    console.log('🔍 User found for reset:', !!user);

    if (!user) {
      console.log('❌ Invalid or expired reset token');
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    console.log('✅ Password reset successful for:', user.email);

    res.json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.'
    });
  } catch (error) {
    console.error('❌ Reset password error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
};

// ------------------------------------------------------------------
// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
// ------------------------------------------------------------------
const getMe = async (req, res) => {
  console.log('👤 Fetching profile for user ID:', req.user.id);
  
  try {
    const user = await User.findById(req.user.id)
      .populate('wishlist')
      .populate({ path: 'cart.items.product', model: 'Product', select: 'name price image market' })
      .populate('orders')
      .select('-password -resetPasswordToken -resetPasswordExpires -verificationToken -verificationExpires');

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('✅ Profile fetched for:', user.email);
    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        market: user.market,
        role: user.role,
        avatar: user.avatar,
        preferences: user.preferences,
        address: user.address,
        isVerified: user.isVerified,
        isActive: user.isActive,
        createdAt: user.createdAt,
        cart: user.cart || { items: [], total: 0 },
        wishlist: user.wishlist || [],
        orders: user.orders || [],
        stats: {
          totalOrders: user.orders?.length || 0,
          totalSpent: user.orders?.reduce((sum, order) => sum + order.totalAmount, 0) || 0
        }
      }
    });
  } catch (error) {
    console.error('❌ Get me error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile'
    });
  }
};

// ------------------------------------------------------------------
// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
// ------------------------------------------------------------------
const updateProfile = async (req, res) => {
  console.log('👤 Updating profile for user ID:', req.user.id);
  
  try {
    const { firstName, lastName, phone, address, market, preferences } = req.body;
    const userId = req.user.id;

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (market) updateData.market = market;
    if (preferences) updateData.preferences = { ...preferences };

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select('-password');

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('✅ Profile updated for:', user.email);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('❌ Update profile error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// ------------------------------------------------------------------
// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
// ------------------------------------------------------------------
const changePassword = async (req, res) => {
  console.log('🔐 Password change attempt for user ID:', req.user.id);
  
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      console.log('❌ Missing password fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    if (currentPassword === newPassword) {
      console.log('❌ New password same as current');
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password'
      });
    }

    if (newPassword.length < 6) {
      console.log('❌ Password too short');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    const user = await User.findById(userId).select('+password');
    console.log('🔍 User found:', !!user);

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isMatch = await user.comparePassword(currentPassword);
    console.log('🔑 Current password match:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Current password incorrect');
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    user.password = newPassword;
    await user.save();
    console.log('✅ Password changed for:', user.email);

    // Optional: send notification
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Changed - UniDigital Marketplace',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #2563eb;">Password Changed Successfully</h2>
            <p>Hello <strong>${user.firstName}</strong>,</p>
            <p>Your password was changed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.</p>
            <p style="color: #666;">If you didn't make this change, please contact support immediately.</p>
          </div>
        `
      });
      console.log('✅ Password change notification sent');
    } catch (emailError) {
      console.error('❌ Password change email failed:', emailError);
    }

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('❌ Change password error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
};

// ------------------------------------------------------------------
// @desc    Upload profile picture
// @route   POST /api/auth/upload-avatar
// @access  Private
// ------------------------------------------------------------------
const uploadAvatar = async (req, res) => {
  console.log('🖼️ Avatar upload attempt for user ID:', req.user.id);
  
  try {
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    console.log('📁 File received:', req.file.filename);
    const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
    const avatarUrl = `${baseUrl}/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.user.id, { avatar: avatarUrl }, { new: true }).select('-password');
    console.log('✅ Avatar updated for:', user.email);

    res.json({
      success: true,
      message: 'Profile picture updated',
      avatar: user.avatar
    });
  } catch (error) {
    console.error('❌ Upload avatar error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to upload profile picture'
    });
  }
};

// ------------------------------------------------------------------
// @desc    Delete account (soft delete)
// @route   DELETE /api/auth/delete-account
// @access  Private
// ------------------------------------------------------------------
const deleteAccount = async (req, res) => {
  console.log('🗑️ Account deletion attempt for user ID:', req.user.id);
  
  try {
    const { password } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId).select('+password');
    console.log('🔍 User found:', !!user);

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isMatch = await user.comparePassword(password);
    console.log('🔑 Password match:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password incorrect');
      return res.status(400).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    user.isActive = false;
    user.deletedAt = new Date();
    await user.save();
    console.log('✅ Account deactivated for:', user.email);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete account error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account'
    });
  }
};

// ------------------------------------------------------------------
// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
// ------------------------------------------------------------------
const logoutUser = async (req, res) => {
  console.log('🚪 Logout for user ID:', req.user.id);
  
  try {
    await User.findByIdAndUpdate(req.user.id, { lastActive: new Date() });
    console.log('✅ Logout successful');
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('❌ Logout error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to logout'
    });
  }
};

// ------------------------------------------------------------------
// ✅ EXPORT ALL CONTROLLER FUNCTIONS
// ------------------------------------------------------------------
module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
  updateProfile,
  changePassword,
  uploadAvatar,
  deleteAccount,
  logoutUser,
  generateToken
};