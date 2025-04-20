const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to PennyPlan!',
      html: `
        <h1>Welcome to PennyPlan!</h1>
        <p>Thank you for registering with us. Your account has been successfully created.</p>
        <p>You can now start managing your finances effectively with our tools.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Google OAuth callback
exports.googleCallback = async (req, res) => {
  try {
    const { user } = req;
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // If this is a new user, send welcome email
    if (user.createdAt && Date.now() - user.createdAt.getTime() < 1000) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Welcome to PennyPlan!',
        html: `
          <h1>Welcome to PennyPlan!</h1>
          <p>Thank you for signing up with Google. Your account has been successfully created.</p>
          <p>You can now start managing your finances effectively with our tools.</p>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

// Verify Google token
exports.verifyGoogleToken = async (req, res) => {
  try {
    console.log("Received Google token verification request");
    const { token } = req.body;

    if (!token) {
      console.error("No token provided");
      return res.status(400).json({ message: "No token provided" });
    }

    console.log("Verifying token with Google...");
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    console.log("Google payload received:", { email: payload.email, name: payload.name });
    const { email, name, picture, sub: googleId } = payload;

    // Check if user exists
    let user = await User.findOne({ email });
    console.log("Existing user found:", !!user);

    if (!user) {
      console.log("Creating new user...");
      // Create new user
      user = new User({
        username: name,
        email,
        googleId,
        picture
      });
      await user.save();
      console.log("New user created");

      // Send welcome email
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Welcome to PennyPlan!',
          html: `
            <h1>Welcome to PennyPlan!</h1>
            <p>Thank you for signing up with Google. Your account has been successfully created.</p>
            <p>You can now start managing your finances effectively with our tools.</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent");
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // Don't fail the registration if email fails
      }
    } else if (!user.googleId) {
      console.log("Linking Google account to existing user...");
      // Link Google account to existing user
      user.googleId = googleId;
      user.picture = picture;
      await user.save();
      console.log("Google account linked");
    }

    // Generate JWT token
    console.log("Generating JWT token...");
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("Sending response...");
    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        picture: user.picture
      }
    });
  } catch (error) {
    console.error('Google verification error:', error);
    res.status(401).json({ 
      message: "Invalid Google token",
      error: error.message 
    });
  }
};
