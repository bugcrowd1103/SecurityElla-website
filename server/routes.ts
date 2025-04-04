import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertContactMessageSchema, insertBlogPostSchema, insertCourseMilestoneSchema, insertCourseEnrollmentSchema } from "@shared/schema";
import express from "express";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  const apiRouter = express.Router();

  // Course routes
  apiRouter.get("/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching courses" });
    }
  });

  apiRouter.get("/courses/featured", async (req, res) => {
    try {
      const featuredCourses = await storage.getFeaturedCourses();
      res.json(featuredCourses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured courses" });
    }
  });

  apiRouter.get("/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourseById(courseId);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Error fetching course" });
    }
  });
  
  // Course milestone routes
  apiRouter.get("/courses/:courseId/milestones", async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      
      if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      
      const course = await storage.getCourseById(courseId);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Try-catch within this function to better handle errors
      try {
        const milestones = await storage.getCourseMilestones(courseId);
        res.json(milestones);
      } catch (milestoneErr) {
        console.error("Error fetching milestones:", milestoneErr);
        // Return an empty array instead of error to avoid UI breaks
        res.json([]);
      }
    } catch (error) {
      console.error("Error in course milestones route:", error);
      res.status(500).json({ message: "Error fetching course milestones" });
    }
  });
  
  apiRouter.get("/milestones/:id", async (req, res) => {
    try {
      const milestoneId = parseInt(req.params.id);
      const milestone = await storage.getCourseMilestoneById(milestoneId);
      
      if (!milestone) {
        return res.status(404).json({ message: "Milestone not found" });
      }
      
      res.json(milestone);
    } catch (error) {
      res.status(500).json({ message: "Error fetching milestone" });
    }
  });
  
  apiRouter.post("/courses/:courseId/milestones", async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const course = await storage.getCourseById(courseId);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      const milestoneData = { ...req.body, courseId };
      const validatedData = insertCourseMilestoneSchema.parse(milestoneData);
      const newMilestone = await storage.createCourseMilestone(validatedData);
      
      res.status(201).json(newMilestone);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create milestone" });
      }
    }
  });

  // Blog post routes
  apiRouter.get("/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog posts" });
    }
  });

  apiRouter.get("/blog/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const recentPosts = await storage.getRecentBlogPosts(limit);
      res.json(recentPosts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent blog posts" });
    }
  });

  apiRouter.get("/blog/:id", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const post = await storage.getBlogPostById(postId);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog post" });
    }
  });

  apiRouter.post("/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const newPost = await storage.createBlogPost(validatedData);
      res.status(201).json(newPost);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create blog post" });
      }
    }
  });

  // User routes
  apiRouter.post("/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      const newUser = await storage.createUser(validatedData);
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  // Login (mock functionality)
  apiRouter.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // For demo purposes - in production you would verify password with proper hashing
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Contact form submission
  apiRouter.post("/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });
  
  // Course recommendation routes
  apiRouter.get("/courses/recommended", async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Valid user ID is required" });
      }
      
      const recommendedCourses = await storage.getRecommendedCourses(userId, limit);
      res.json(recommendedCourses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recommended courses" });
    }
  });
  
  // Course enrollment routes
  apiRouter.post("/courses/:courseId/enroll", async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const userIdNum = parseInt(userId);
      
      // Check if user is already enrolled
      const isEnrolled = await storage.isUserEnrolledInCourse(userIdNum, courseId);
      if (isEnrolled) {
        return res.status(400).json({ message: "User is already enrolled in this course" });
      }
      
      const enrollmentData = {
        userId: userIdNum,
        courseId,
        enrollmentDate: new Date(),
        progress: 0,
        status: "active"
      };
      
      const validatedData = insertCourseEnrollmentSchema.parse(enrollmentData);
      const enrollment = await storage.enrollUserInCourse(validatedData);
      
      res.status(201).json(enrollment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to enroll in course" });
      }
    }
  });
  
  apiRouter.get("/users/:userId/enrollments", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const enrollments = await storage.getUserEnrollments(userId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user enrollments" });
    }
  });
  
  apiRouter.get("/users/:userId/courses", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const courses = await storage.getUserCourses(userId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user courses" });
    }
  });
  
  apiRouter.get("/courses/:courseId/enrollment-status", async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const userId = req.query.userId ? parseInt(req.query.userId as string) : null;
      
      if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      
      if (!userId || isNaN(userId)) {
        // Instead of error, return not enrolled for invalid users
        return res.json({ isEnrolled: false });
      }
      
      try {
        const isEnrolled = await storage.isUserEnrolledInCourse(userId, courseId);
        res.json({ isEnrolled });
      } catch (enrollErr) {
        console.error("Error checking enrollment:", enrollErr);
        // Default to not enrolled on error to avoid UI breaks
        res.json({ isEnrolled: false });
      }
    } catch (error) {
      console.error("Error in enrollment status route:", error);
      // Return default response instead of error to prevent UI issues
      res.json({ isEnrolled: false });
    }
  });
  
  // User progress tracking
  apiRouter.get("/users/:userId/milestones/:courseId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const courseId = parseInt(req.params.courseId);
      const completedMilestones = await storage.getUserCompletedMilestones(userId, courseId);
      res.json(completedMilestones);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user progress" });
    }
  });
  
  apiRouter.post("/users/:userId/milestones/:milestoneId/complete", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const milestoneId = parseInt(req.params.milestoneId);
      const { xpEarned } = req.body;
      
      const progress = await storage.updateUserMilestoneProgress(
        userId, 
        milestoneId, 
        true, 
        xpEarned || 10
      );
      
      // Get updated user info with new XP and level
      const user = await storage.getUser(userId);
      
      res.json({ progress, user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to update milestone progress" });
      }
    }
  });
  
  // Course content
  apiRouter.get("/courses/:courseId/content", async (req, res) => {
    try {
      const courseId = parseInt(req.params.courseId);
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      
      // If userId provided, verify enrollment
      if (userId) {
        const isEnrolled = await storage.isUserEnrolledInCourse(userId, courseId);
        if (!isEnrolled) {
          return res.status(403).json({ message: "User not enrolled in this course" });
        }
      }
      
      const content = await storage.getCourseContent(courseId);
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Error fetching course content" });
    }
  });
  
  // Stripe payment routes
  apiRouter.post("/create-payment-intent", async (req, res) => {
    try {
      const { amount, courseId, userId, metadata } = req.body;
      
      if (!amount || !courseId || !userId) {
        return res.status(400).json({ message: "Amount, course ID, and user ID are required" });
      }
      
      // Create a payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          courseId: courseId.toString(),
          userId: userId.toString(),
          ...metadata
        },
      });
      
      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create payment intent" });
      }
    }
  });
  
  apiRouter.post("/payment-success", async (req, res) => {
    try {
      const { paymentIntentId } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ message: "Payment intent ID is required" });
      }
      
      // Verify payment was successful
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({ message: "Payment has not succeeded" });
      }
      
      const { userId, courseId } = paymentIntent.metadata;
      
      if (!userId || !courseId) {
        return res.status(400).json({ message: "User ID or course ID missing from payment" });
      }
      
      // Enroll the user in the course
      const userIdNum = parseInt(userId);
      const courseIdNum = parseInt(courseId);
      
      // Check if already enrolled
      const isEnrolled = await storage.isUserEnrolledInCourse(userIdNum, courseIdNum);
      
      if (!isEnrolled) {
        const enrollment = await storage.enrollUserInCourse({
          userId: userIdNum,
          courseId: courseIdNum,
          enrollmentDate: new Date(),
          progress: 0,
          status: "active"
        });
        
        res.json({ success: true, enrollment });
      } else {
        res.json({ success: true, message: "User already enrolled" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to process payment success" });
      }
    }
  });

  // Use the API router with prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
