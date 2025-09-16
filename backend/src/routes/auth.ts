import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { User } from '../models/User';
import { logger } from '../utils/logger';
import { generateToken } from '../utils/jwt';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Unauthorized
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
      return;
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
      return;
    }

    // Find user by email and include password hash
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      isActive: true
    }).select('+passwordHash');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      username: user.username
    });

    logger.info(`Successful login for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    //   user: {
    //     id: user._id,
    //     email: user.email,
    //     username: user.username,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     fullName: `${user.firstName} ${user.lastName}`,
    //     experience: user.experience,
    //     emailVerified: user.emailVerified,
    //     lastLogin: user.lastLogin,
    //     stats: user.stats
    //   }
    });

  } catch (error: any) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: newuser@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               username:
 *                 type: string
 *                 example: johndoe
 *               experience:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced, expert]
 *                 example: beginner
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: User already exists
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, username, experience = 'beginner' } = req.body;

    // Basic validation
    if (!email || !password || !firstName || !lastName || !username) {
      res.status(400).json({
        success: false,
        message: 'All fields are required: email, password, firstName, lastName, username'
      });
      return;
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
      return;
    }

    // Validate username format
    if (username.length < 3 || username.length > 30) {
      res.status(400).json({
        success: false,
        message: 'Username must be between 3 and 30 characters'
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });

    if (existingUser) {
      const field = existingUser.email === email.toLowerCase() ? 'email' : 'username';
      res.status(409).json({
        success: false,
        message: `User with this ${field} already exists`
      });
      return;
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      passwordHash,
      experience,
      preferences: {
        travelStyle: 'adventure',
        difficulty: 'moderate',
        interests: [],
        notifications: {
          email: true,
          push: true,
          tripReminders: true,
          weatherAlerts: true
        }
      },
      stats: {
        totalDistance: 0,
        trailsCompleted: 0,
        adventurePoints: 0,
        totalElevationGain: 0,
        averageRating: 0,
        reviewsCount: 0
      },
      achievements: [],
      location: {
        country: '',
        city: ''
      },
      isActive: true,
      emailVerified: false
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = generateToken({
      userId: savedUser._id,
      email: savedUser.email,
      username: savedUser.username
    });

    // Log successful registration
    logger.info(`New user registered: ${savedUser.email} (${savedUser.username})`);

    // Return success response (without password hash)
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        fullName: `${savedUser.firstName} ${savedUser.lastName}`,
        experience: savedUser.experience,
        emailVerified: savedUser.emailVerified,
        createdAt: savedUser.createdAt
      }
    });

  } catch (error: any) {
    logger.error('Registration error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = error.keyPattern?.email ? 'email' : 'username';
      res.status(409).json({
        success: false,
        message: `User with this ${field} already exists`
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', async (req: Request, res: Response) => {
  try {
    // TODO: Implement token invalidation logic
    logger.info('User logout');
    
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/me', async (req: Request, res: Response) => {
  try {
    // TODO: Implement token verification and user retrieval
    logger.info('Get current user profile');
    
    res.status(200).json({
      success: true,
      user: {
        id: '12345',
        email: 'test@example.com',
        name: 'Test User'
      }
    });
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
