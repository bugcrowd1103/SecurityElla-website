import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: text("role").default("student"),
  xpPoints: integer("xp_points").default(0),
  level: integer("level").default(1),
  badges: jsonb("badges").default([]),
  avatar: text("avatar"),
  bio: text("bio"),
  preferences: jsonb("preferences").default({}),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true,
  avatar: true,
  bio: true,
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priceInr: integer("price_inr").notNull(),
  priceUsd: integer("price_usd").notNull(),
  level: text("level").notNull(),
  duration: text("duration"),
  imagePath: text("image_path"),
  featured: boolean("featured").default(false),
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  priceInr: true,
  priceUsd: true,
  level: true,
  duration: true,
  imagePath: true,
  featured: true,
});

export const courseMilestones = pgTable("course_milestones", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  imagePath: text("image_path"),
  achievementBadge: text("achievement_badge"),
  shareableText: text("shareable_text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseMilestoneSchema = createInsertSchema(courseMilestones).pick({
  courseId: true,
  title: true,
  description: true,
  order: true,
  imagePath: true,
  achievementBadge: true,
  shareableText: true,
});

// User enrollments
export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  status: text("status").default("active"),
  enrollmentDate: timestamp("enrollment_date").defaultNow(),
  completionDate: timestamp("completion_date"),
  progress: integer("progress").default(0),
  certificateIssued: boolean("certificate_issued").default(false),
  paymentId: text("payment_id"),
  paymentAmount: integer("payment_amount"),
  paymentCurrency: text("payment_currency"),
  paymentStatus: text("payment_status"),
});

export const insertCourseEnrollmentSchema = createInsertSchema(courseEnrollments).pick({
  userId: true,
  courseId: true,
  status: true,
  enrollmentDate: true,
  progress: true,
  paymentId: true,
  paymentAmount: true,
  paymentCurrency: true,
  paymentStatus: true,
});

// User milestone progress
export const userMilestoneProgress = pgTable("user_milestone_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  milestoneId: integer("milestone_id").notNull(),
  completed: boolean("completed").default(false),
  completionDate: timestamp("completion_date"),
  xpEarned: integer("xp_earned").default(0),
});

export const insertUserMilestoneProgressSchema = createInsertSchema(userMilestoneProgress).pick({
  userId: true,
  milestoneId: true,
  completed: true,
  xpEarned: true,
});

// Course content
export const courseContent = pgTable("course_content", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  contentType: text("content_type").notNull(), // video, text, quiz, assignment
  order: integer("order").notNull(),
  content: text("content"),
  videoUrl: text("video_url"),
  duration: integer("duration"), // in minutes
  quizData: jsonb("quiz_data"),
  xpReward: integer("xp_reward").default(10),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseContentSchema = createInsertSchema(courseContent).pick({
  courseId: true,
  title: true,
  contentType: true,
  order: true,
  content: true,
  videoUrl: true,
  duration: true,
  quizData: true,
  xpReward: true,
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  subject: text("subject"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  message: true,
  subject: true,
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  author: text("author").notNull(),
  readTime: integer("read_time"),
  imagePath: text("image_path"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  content: true,
  summary: true,
  author: true,
  readTime: true,
  imagePath: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertCourseMilestone = z.infer<typeof insertCourseMilestoneSchema>;
export type CourseMilestone = typeof courseMilestones.$inferSelect;

export type InsertCourseEnrollment = z.infer<typeof insertCourseEnrollmentSchema>;
export type CourseEnrollment = typeof courseEnrollments.$inferSelect;

export type InsertUserMilestoneProgress = z.infer<typeof insertUserMilestoneProgressSchema>;
export type UserMilestoneProgress = typeof userMilestoneProgress.$inferSelect;

export type InsertCourseContent = z.infer<typeof insertCourseContentSchema>;
export type CourseContent = typeof courseContent.$inferSelect;
