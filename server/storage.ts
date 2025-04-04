import { 
  users, type User, type InsertUser,
  courses, type Course, type InsertCourse,
  contactMessages, type ContactMessage, type InsertContactMessage,
  blogPosts, type BlogPost, type InsertBlogPost,
  courseMilestones, type CourseMilestone, type InsertCourseMilestone,
  courseEnrollments, type CourseEnrollment, type InsertCourseEnrollment,
  userMilestoneProgress, type UserMilestoneProgress, type InsertUserMilestoneProgress,
  courseContent, type CourseContent, type InsertCourseContent
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, like, inArray, sql, or } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User>;
  updateUserXp(userId: number, xpToAdd: number): Promise<User>;
  updateUserLevel(userId: number, newLevel: number): Promise<User>;
  updateUserBadges(userId: number, badges: any[]): Promise<User>;
  updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User>;
  updateStripeSubscriptionId(userId: number, stripeSubscriptionId: string): Promise<User>;
  updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User>;
  
  // Course methods
  getAllCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  getFeaturedCourses(): Promise<Course[]>;
  getRecommendedCourses(userId: number, limit?: number): Promise<Course[]>;
  searchCourses(query: string, filters?: any): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Course milestone methods
  getCourseMilestones(courseId: number): Promise<CourseMilestone[]>;
  getCourseMilestoneById(id: number): Promise<CourseMilestone | undefined>;
  createCourseMilestone(milestone: InsertCourseMilestone): Promise<CourseMilestone>;
  
  // Course enrollment methods
  enrollUserInCourse(enrollment: InsertCourseEnrollment): Promise<CourseEnrollment>;
  getUserEnrollments(userId: number): Promise<CourseEnrollment[]>;
  getCourseEnrollments(courseId: number): Promise<CourseEnrollment[]>;
  getUserCourses(userId: number): Promise<Course[]>;
  updateEnrollmentProgress(enrollmentId: number, progress: number): Promise<CourseEnrollment>;
  updateEnrollmentStatus(enrollmentId: number, status: string): Promise<CourseEnrollment>;
  isUserEnrolledInCourse(userId: number, courseId: number): Promise<boolean>;
  
  // User progress methods
  getUserMilestoneProgress(userId: number, milestoneId: number): Promise<UserMilestoneProgress | undefined>;
  updateUserMilestoneProgress(userId: number, milestoneId: number, completed: boolean, xpEarned?: number): Promise<UserMilestoneProgress>;
  getUserCompletedMilestones(userId: number, courseId: number): Promise<number[]>;
  
  // Course content methods
  getCourseContent(courseId: number): Promise<CourseContent[]>;
  getCourseContentById(id: number): Promise<CourseContent | undefined>;
  createCourseContent(content: InsertCourseContent): Promise<CourseContent>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Blog post methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getRecentBlogPosts(limit: number): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }
  
  async updateUserXp(userId: number, xpToAdd: number): Promise<User> {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) throw new Error("User not found");
    
    const currentXp = user.xpPoints || 0;
    const newXp = currentXp + xpToAdd;
    
    // Check if user should level up
    const currentLevel = user.level || 1;
    let newLevel = currentLevel;
    
    // Simple level up formula: each level requires level*100 XP
    if (newXp >= currentLevel * 100) {
      newLevel = Math.floor(newXp / 100) + 1;
    }
    
    const [updatedUser] = await db
      .update(users)
      .set({ 
        xpPoints: newXp,
        level: newLevel
      })
      .where(eq(users.id, userId))
      .returning();
      
    return updatedUser;
  }
  
  async updateUserLevel(userId: number, newLevel: number): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({ level: newLevel })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }
  
  async updateUserBadges(userId: number, badges: any[]): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({ badges: badges })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }
  
  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({ stripeCustomerId })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }
  
  async updateStripeSubscriptionId(userId: number, stripeSubscriptionId: string): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({ stripeSubscriptionId })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }
  
  async updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        stripeCustomerId: stripeInfo.stripeCustomerId,
        stripeSubscriptionId: stripeInfo.stripeSubscriptionId
      })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  // Course methods
  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async getFeaturedCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.featured, true));
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }
  
  async getRecommendedCourses(userId: number, limit: number = 3): Promise<Course[]> {
    // In a real implementation, this would use user preferences, past enrollments, and machine learning
    // For simplicity, we'll get courses matching the user's level first, then get random ones if needed
    
    // Get user's level from their profile to determine appropriate course difficulty
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    
    if (!user) {
      return this.getFeaturedCourses(); // Fallback to featured courses
    }
    
    // Get courses the user is already enrolled in to exclude them
    const enrolledCourseIds = await this.getUserEnrollments(userId)
      .then(enrollments => enrollments.map(e => e.courseId));
    
    // Determine appropriate course level based on user experience
    let recommendedLevel = "Beginner";
    if (user.level && user.level >= 5) {
      recommendedLevel = "Advanced";
    } else if (user.level && user.level >= 3) {
      recommendedLevel = "Intermediate";
    }
    
    // Get courses matching the user's experience level that they're not enrolled in
    let recommendedCourses = await db.select()
      .from(courses)
      .where(
        and(
          eq(courses.level, recommendedLevel),
          !enrolledCourseIds.length ? sql`TRUE` : sql`${courses.id} NOT IN (${enrolledCourseIds.join(',')})`
        )
      )
      .limit(limit);
    
    // If we don't have enough courses, get more from other levels
    if (recommendedCourses.length < limit) {
      const remainingLimit = limit - recommendedCourses.length;
      const additionalCourses = await db.select()
        .from(courses)
        .where(
          and(
            !enrolledCourseIds.length ? sql`TRUE` : sql`${courses.id} NOT IN (${enrolledCourseIds.join(',')})`,
            sql`${courses.id} NOT IN (${recommendedCourses.map(c => c.id).join(',')})`
          )
        )
        .limit(remainingLimit);
        
      recommendedCourses = [...recommendedCourses, ...additionalCourses];
    }
    
    return recommendedCourses;
  }
  
  async searchCourses(query: string, filters: any = {}): Promise<Course[]> {
    // Start with a base query
    let coursesQuery = db.select().from(courses);
    
    // Add search condition if query is provided
    if (query) {
      coursesQuery = coursesQuery.where(
        or(
          like(courses.title, `%${query}%`),
          like(courses.description, `%${query}%`)
        )
      );
    }
    
    // Add filters
    if (filters.level) {
      if (Array.isArray(filters.level)) {
        coursesQuery = coursesQuery.where(inArray(courses.level, filters.level));
      } else {
        coursesQuery = coursesQuery.where(eq(courses.level, filters.level));
      }
    }
    
    // Add price range filter
    if (filters.minPrice !== undefined) {
      coursesQuery = coursesQuery.where(sql`${courses.priceUsd} >= ${filters.minPrice}`);
    }
    
    if (filters.maxPrice !== undefined) {
      coursesQuery = coursesQuery.where(sql`${courses.priceUsd} <= ${filters.maxPrice}`);
    }
    
    // Add featured filter
    if (filters.featured !== undefined) {
      coursesQuery = coursesQuery.where(eq(courses.featured, filters.featured));
    }
    
    // Execute the query
    return await coursesQuery;
  }

  // Course milestone methods
  async getCourseMilestones(courseId: number): Promise<CourseMilestone[]> {
    return await db
      .select()
      .from(courseMilestones)
      .where(eq(courseMilestones.courseId, courseId))
      .orderBy(asc(courseMilestones.order));
  }

  async getCourseMilestoneById(id: number): Promise<CourseMilestone | undefined> {
    const [milestone] = await db
      .select()
      .from(courseMilestones)
      .where(eq(courseMilestones.id, id));
    return milestone || undefined;
  }

  async createCourseMilestone(insertMilestone: InsertCourseMilestone): Promise<CourseMilestone> {
    const [milestone] = await db
      .insert(courseMilestones)
      .values(insertMilestone)
      .returning();
    return milestone;
  }
  
  // Course enrollment methods
  async enrollUserInCourse(enrollment: InsertCourseEnrollment): Promise<CourseEnrollment> {
    const [newEnrollment] = await db
      .insert(courseEnrollments)
      .values(enrollment)
      .returning();
    return newEnrollment;
  }
  
  async getUserEnrollments(userId: number): Promise<CourseEnrollment[]> {
    return await db
      .select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.userId, userId));
  }
  
  async getCourseEnrollments(courseId: number): Promise<CourseEnrollment[]> {
    return await db
      .select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.courseId, courseId));
  }
  
  async getUserCourses(userId: number): Promise<Course[]> {
    const enrollments = await this.getUserEnrollments(userId);
    const courseIds = enrollments.map(e => e.courseId);
    
    if (courseIds.length === 0) {
      return [];
    }
    
    return await db
      .select()
      .from(courses)
      .where(inArray(courses.id, courseIds));
  }
  
  async updateEnrollmentProgress(enrollmentId: number, progress: number): Promise<CourseEnrollment> {
    const [updatedEnrollment] = await db
      .update(courseEnrollments)
      .set({ progress })
      .where(eq(courseEnrollments.id, enrollmentId))
      .returning();
    
    return updatedEnrollment;
  }
  
  async updateEnrollmentStatus(enrollmentId: number, status: string): Promise<CourseEnrollment> {
    const [updatedEnrollment] = await db
      .update(courseEnrollments)
      .set({ status })
      .where(eq(courseEnrollments.id, enrollmentId))
      .returning();
    
    return updatedEnrollment;
  }
  
  async isUserEnrolledInCourse(userId: number, courseId: number): Promise<boolean> {
    const results = await db
      .select()
      .from(courseEnrollments)
      .where(
        and(
          eq(courseEnrollments.userId, userId),
          eq(courseEnrollments.courseId, courseId)
        )
      );
    
    return results.length > 0;
  }
  
  // User progress methods
  async getUserMilestoneProgress(userId: number, milestoneId: number): Promise<UserMilestoneProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userMilestoneProgress)
      .where(
        and(
          eq(userMilestoneProgress.userId, userId),
          eq(userMilestoneProgress.milestoneId, milestoneId)
        )
      );
    
    return progress;
  }
  
  async updateUserMilestoneProgress(
    userId: number, 
    milestoneId: number, 
    completed: boolean, 
    xpEarned: number = 10
  ): Promise<UserMilestoneProgress> {
    const existingProgress = await this.getUserMilestoneProgress(userId, milestoneId);
    
    if (existingProgress) {
      const [updatedProgress] = await db
        .update(userMilestoneProgress)
        .set({ 
          completed, 
          completionDate: completed ? new Date() : null,
          xpEarned: completed ? xpEarned : 0
        })
        .where(eq(userMilestoneProgress.id, existingProgress.id))
        .returning();
      
      // Add XP to user if milestone is newly completed
      if (completed && !existingProgress.completed) {
        await this.updateUserXp(userId, xpEarned);
      }
      
      return updatedProgress;
    } else {
      const [newProgress] = await db
        .insert(userMilestoneProgress)
        .values({
          userId,
          milestoneId,
          completed,
          completionDate: completed ? new Date() : null,
          xpEarned: completed ? xpEarned : 0
        })
        .returning();
      
      // Add XP to user if milestone is completed
      if (completed) {
        await this.updateUserXp(userId, xpEarned);
      }
      
      return newProgress;
    }
  }
  
  async getUserCompletedMilestones(userId: number, courseId: number): Promise<number[]> {
    // Get all milestones for this course
    const milestones = await this.getCourseMilestones(courseId);
    const milestoneIds = milestones.map(m => m.id);
    
    if (milestoneIds.length === 0) {
      return [];
    }
    
    // Get completed milestone progress entries
    const completedProgress = await db
      .select()
      .from(userMilestoneProgress)
      .where(
        and(
          eq(userMilestoneProgress.userId, userId),
          inArray(userMilestoneProgress.milestoneId, milestoneIds),
          eq(userMilestoneProgress.completed, true)
        )
      );
    
    return completedProgress.map(p => p.milestoneId);
  }
  
  // Course content methods
  async getCourseContent(courseId: number): Promise<CourseContent[]> {
    return await db
      .select()
      .from(courseContent)
      .where(eq(courseContent.courseId, courseId))
      .orderBy(asc(courseContent.order));
  }
  
  async getCourseContentById(id: number): Promise<CourseContent | undefined> {
    const [content] = await db
      .select()
      .from(courseContent)
      .where(eq(courseContent.id, id));
    
    return content;
  }
  
  async createCourseContent(insertContent: InsertCourseContent): Promise<CourseContent> {
    const [content] = await db
      .insert(courseContent)
      .values(insertContent)
      .returning();
    
    return content;
  }

  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getRecentBlogPosts(limit: number): Promise<BlogPost[]> {
    return await db.select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  // Method to initialize data in the database
  async initializeData() {
    const courseCount = await db.select().from(courses).execute();
    
    if (courseCount.length === 0) {
      // Initialize with sample courses
      const sampleCourses: InsertCourse[] = [
        {
          title: "Cybersecurity Fundamentals",
          description: "Learn the basics of cybersecurity, including network security, encryption, and threat mitigation.",
          priceInr: 8000,
          priceUsd: 100,
          level: "Beginner",
          duration: "4 weeks",
          imagePath: "/images/courses/cybersecurity-fundamentals.jpg",
          featured: true
        },
        {
          title: "Ethical Hacking",
          description: "Explore ethical hacking techniques and learn to identify and exploit vulnerabilities in computer systems.",
          priceInr: 12000,
          priceUsd: 150,
          level: "Intermediate",
          duration: "6 weeks",
          imagePath: "/images/courses/ethical-hacking.jpg",
          featured: true
        },
        {
          title: "Kali Linux",
          description: "Master Kali Linux, the OS used for penetration testing, and learn how to use its tools for security assessments.",
          priceInr: 10000,
          priceUsd: 125,
          level: "Intermediate",
          duration: "5 weeks",
          imagePath: "/images/courses/kali-linux.jpg",
          featured: false
        },
        {
          title: "Network Security",
          description: "Learn essential network security concepts such as firewalls, VPNs, and IDS/IPS systems.",
          priceInr: 12000,
          priceUsd: 150,
          level: "Intermediate",
          duration: "6 weeks",
          imagePath: "/images/courses/network-security.jpg",
          featured: false
        },
        {
          title: "Wireless Network Security",
          description: "Understand how to secure wireless networks and protect against common wireless attacks like rogue access points.",
          priceInr: 9000,
          priceUsd: 110,
          level: "Intermediate",
          duration: "4 weeks",
          imagePath: "/images/courses/wireless-security.jpg",
          featured: false
        },
        {
          title: "Web Application Security",
          description: "Learn to secure web applications from threats like SQL injection, XSS, and CSRF.",
          priceInr: 11000,
          priceUsd: 140,
          level: "Intermediate",
          duration: "5 weeks",
          imagePath: "/images/courses/web-app-security.jpg",
          featured: false
        },
        {
          title: "Penetration Testing",
          description: "Develop hands-on skills in penetration testing to identify and exploit vulnerabilities in systems and applications.",
          priceInr: 14000,
          priceUsd: 175,
          level: "Advanced",
          duration: "8 weeks",
          imagePath: "/images/courses/penetration-testing.jpg",
          featured: true
        },
        {
          title: "Bug Bounty Hunting",
          description: "Discover how to find vulnerabilities in websites and earn rewards by participating in bug bounty programs.",
          priceInr: 10000,
          priceUsd: 125,
          level: "Intermediate",
          duration: "5 weeks",
          imagePath: "/images/courses/bug-bounty.jpg",
          featured: false
        },
        {
          title: "Digital Forensics",
          description: "Learn how to investigate and recover data from compromised systems to uncover cybercrime.",
          priceInr: 15000,
          priceUsd: 190,
          level: "Advanced",
          duration: "8 weeks",
          imagePath: "/images/courses/digital-forensics.jpg",
          featured: false
        },
        {
          title: "Advanced Ethical Hacking Techniques",
          description: "Dive deeper into advanced hacking techniques and exploit complex vulnerabilities.",
          priceInr: 18000,
          priceUsd: 225,
          level: "Advanced",
          duration: "10 weeks",
          imagePath: "/images/courses/advanced-hacking.jpg",
          featured: false
        },
        {
          title: "Red Teaming and Blue Teaming",
          description: "Learn both offensive and defensive strategies to simulate real-world cyber attacks and responses.",
          priceInr: 15000,
          priceUsd: 190,
          level: "Advanced",
          duration: "8 weeks",
          imagePath: "/images/courses/red-blue-team.jpg",
          featured: false
        },
        {
          title: "Red Team vs Blue Team Training (Advanced)",
          description: "Take your Red Team and Blue Team skills to the next level with advanced tactics and real-world simulations.",
          priceInr: 20000,
          priceUsd: 250,
          level: "Advanced",
          duration: "12 weeks",
          imagePath: "/images/courses/advanced-red-blue.jpg",
          featured: false
        }
      ];

      for (const course of sampleCourses) {
        await this.createCourse(course);
      }

      // Initialize with sample blog posts
      const sampleBlogPosts: InsertBlogPost[] = [
        {
          title: "Top 10 Cybersecurity Threats in 2025",
          content: "As technology evolves, so do cyber threats. In this post, we explore the top 10 cybersecurity threats that organizations and individuals need to be aware of in 2025, including advanced phishing techniques, AI-powered attacks, and new ransomware strategies.\n\nPhishing attacks continue to evolve, with attackers using machine learning to create more convincing and targeted messages. Ransomware has now evolved to include extortion tactics, where data is stolen before being encrypted. IoT vulnerabilities are increasing as more devices connect to networks without proper security measures.\n\nSupply chain attacks have become more sophisticated, targeting software development pipelines rather than end-user systems. Cloud misconfigurations remain a major source of data breaches, as organizations struggle to secure their increasingly complex environments. API vulnerabilities are exposing critical data and functionality as more businesses rely on interconnected services.\n\nDeepfakes and synthetic media are being weaponized for social engineering, creating convincing fake videos or audio to manipulate victims. Quantum computing threats are on the horizon, potentially breaking current encryption standards. Zero-day exploits are being discovered and weaponized faster than ever before. Finally, insider threats continue to be a significant risk, with compromised credentials and malicious employees causing major breaches.",
          summary: "Learn about the emerging cybersecurity threats of 2025 and how to prepare your defenses against these evolving risks.",
          author: "Security Expert",
          readTime: 8,
          imagePath: "/images/blog/cyber-threats-2025.jpg",
          createdAt: new Date()
        },
        {
          title: "How to Implement Zero Trust Security in Your Organization",
          content: "Zero Trust has become a crucial security model in today's digital landscape. This comprehensive guide walks you through the steps to implement a Zero Trust architecture in your organization, regardless of size.\n\nThe traditional perimeter-based security model is no longer effective in a world of cloud services, remote work, and sophisticated attacks. Zero Trust operates on the principle of 'never trust, always verify,' treating all access attempts as potential threats regardless of where they originate.\n\nStart your Zero Trust journey by identifying your sensitive data and mapping how it flows through your organization. Implement strong identity verification for all users through multi-factor authentication and continuous validation. Apply the principle of least privilege, giving users only the access they need for their specific roles.\n\nSegment your network to contain breaches and limit lateral movement, using micro-segmentation techniques to create secure zones. Implement continuous monitoring and validation to detect unusual behavior that might indicate a compromise. Finally, automate your security responses where possible to quickly address threats when they're detected.\n\nRemember that Zero Trust is not a single product but a comprehensive strategy that requires changes to technology, processes, and organizational culture. Start with small, high-value projects to demonstrate success before expanding to your entire organization.",
          summary: "Discover a step-by-step approach to implementing Zero Trust security principles in your organization to better protect against modern threats.",
          author: "Network Specialist",
          readTime: 10,
          imagePath: "/images/blog/zero-trust.jpg",
          createdAt: new Date(Date.now() - 86400000) // 1 day ago
        },
        {
          title: "The Role of AI in Modern Cybersecurity Defense",
          content: "Artificial Intelligence is revolutionizing cybersecurity defense mechanisms. Learn how AI and machine learning are being used to detect and respond to threats faster than ever before, and how this technology is becoming an essential part of security operations.\n\nTraditional security tools rely on known signatures and rules, making them ineffective against zero-day attacks and advanced threats. AI systems can analyze vast amounts of data to establish baselines of normal behavior and identify anomalies that might indicate a compromise, even for previously unseen threats.\n\nMachine learning models are being used to improve threat detection by continuously learning from new data and adapting to evolving attack techniques. These systems can correlate events across different security tools and network segments, providing a comprehensive view of potential security incidents. AI-powered automation is reducing response times by initiating containment measures immediately when threats are detected.\n\nNatural Language Processing is helping security teams by analyzing threat intelligence from various sources, extracting relevant information, and providing actionable insights. Computer vision algorithms are being used to detect visual phishing attempts and identify manipulated images or videos used in social engineering attacks.\n\nWhile AI offers powerful capabilities for cybersecurity defense, it's important to remember that it complements human expertise rather than replacing it. The most effective security operations combine AI's processing power and pattern recognition with human judgment and contextual understanding.",
          summary: "Explore how artificial intelligence and machine learning are transforming cybersecurity defenses and enabling faster threat detection and response.",
          author: "AI Security Researcher",
          readTime: 12,
          imagePath: "/images/blog/ai-cybersecurity.jpg",
          createdAt: new Date(Date.now() - 172800000) // 2 days ago
        }
      ];

      for (const post of sampleBlogPosts) {
        await this.createBlogPost(post);
      }
      
      // Initialize with sample course milestones for the first course
      const milestonesCount = await db.select().from(courseMilestones).execute();
      if (milestonesCount.length === 0) {
        const firstCourse = await db.select().from(courses).limit(1);
        if (firstCourse.length > 0) {
          const courseId = firstCourse[0].id;
          
          const sampleMilestones: InsertCourseMilestone[] = [
            {
              courseId,
              title: "Security Basics Mastered",
              description: "Completed the core fundamentals of cybersecurity principles and practices.",
              order: 1,
              shareableText: "I've mastered the security basics in the Cybersecurity Fundamentals course @Securityella! #CyberSecurity #Learning",
              achievementBadge: "/images/badges/security-basics.svg"
            },
            {
              courseId,
              title: "Network Defender",
              description: "Successfully completed all network security modules and practical exercises.",
              order: 2,
              shareableText: "Proud to be a certified Network Defender after completing this module @Securityella! #NetworkSecurity #CyberDefense",
              achievementBadge: "/images/badges/network-defender.svg"
            },
            {
              courseId,
              title: "Encryption Expert",
              description: "Demonstrated proficiency in encryption techniques and secure communications.",
              order: 3,
              shareableText: "Just became an Encryption Expert in my cybersecurity journey @Securityella! #Encryption #DataSecurity",
              achievementBadge: "/images/badges/encryption-expert.svg"
            },
            {
              courseId,
              title: "Threat Hunter",
              description: "Learned to identify and mitigate various cybersecurity threats and vulnerabilities.",
              order: 4,
              shareableText: "Now I can spot cyber threats like a pro! Completed the Threat Hunter module @Securityella #ThreatHunting #Cybersecurity",
              achievementBadge: "/images/badges/threat-hunter.svg"
            },
            {
              courseId,
              title: "Cybersecurity Fundamentals Graduate",
              description: "Successfully completed the entire Cybersecurity Fundamentals course with all assessments.",
              order: 5,
              shareableText: "I did it! Graduated from the Cybersecurity Fundamentals course @Securityella! Ready to protect the digital world. #CyberGrad #NewSkills",
              achievementBadge: "/images/badges/cyber-graduate.svg"
            }
          ];
          
          for (const milestone of sampleMilestones) {
            await this.createCourseMilestone(milestone);
          }
        }
      }
    }
  }
}

export const storage = new DatabaseStorage();

// Initialize the database with sample data
storage.initializeData().catch(console.error);
