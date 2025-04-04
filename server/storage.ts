import { 
  users, type User, type InsertUser,
  courses, type Course, type InsertCourse,
  contactMessages, type ContactMessage, type InsertContactMessage,
  blogPosts, type BlogPost, type InsertBlogPost
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  getFeaturedCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
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
          content: "As technology evolves, so do cyber threats. In this post, we explore the top 10 cybersecurity threats that organizations and individuals need to be aware of in 2025, including advanced phishing techniques, AI-powered attacks, and new ransomware strategies.",
          author: "Security Expert",
          imagePath: "/images/blog/cyber-threats-2025.jpg",
          createdAt: new Date()
        },
        {
          title: "How to Implement Zero Trust Security in Your Organization",
          content: "Zero Trust has become a crucial security model in today's digital landscape. This comprehensive guide walks you through the steps to implement a Zero Trust architecture in your organization, regardless of size.",
          author: "Network Specialist",
          imagePath: "/images/blog/zero-trust.jpg",
          createdAt: new Date(Date.now() - 86400000) // 1 day ago
        },
        {
          title: "The Role of AI in Modern Cybersecurity Defense",
          content: "Artificial Intelligence is revolutionizing cybersecurity defense mechanisms. Learn how AI and machine learning are being used to detect and respond to threats faster than ever before, and how this technology is becoming an essential part of security operations.",
          author: "AI Security Researcher",
          imagePath: "/images/blog/ai-cybersecurity.jpg",
          createdAt: new Date(Date.now() - 172800000) // 2 days ago
        }
      ];

      for (const post of sampleBlogPosts) {
        await this.createBlogPost(post);
      }
    }
  }
}

export const storage = new DatabaseStorage();

// Initialize the database with sample data
storage.initializeData().catch(console.error);
