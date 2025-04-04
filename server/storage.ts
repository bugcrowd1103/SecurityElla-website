import { 
  users, type User, type InsertUser,
  courses, type Course, type InsertCourse,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  getFeaturedCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private contactMessages: Map<number, ContactMessage>;
  private userCurrentId: number;
  private courseCurrentId: number;
  private contactMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.contactMessages = new Map();
    this.userCurrentId = 1;
    this.courseCurrentId = 1;
    this.contactMessageCurrentId = 1;
    
    // Initialize with cybersecurity courses
    this.initializeCourses();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getFeaturedCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.featured);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.courseCurrentId++;
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }

  private initializeCourses() {
    const coursesList = [
      {
        title: "Cybersecurity Fundamentals",
        description: "Learn the basics of cybersecurity, including network security, encryption, and threat mitigation.",
        priceInr: 8000,
        priceUsd: 100,
        level: "Beginner",
        featured: true
      },
      {
        title: "Ethical Hacking",
        description: "Explore ethical hacking techniques and learn to identify and exploit vulnerabilities in computer systems.",
        priceInr: 12000,
        priceUsd: 150,
        level: "Intermediate",
        featured: true
      },
      {
        title: "Kali Linux",
        description: "Master Kali Linux, the OS used for penetration testing, and learn how to use its tools for security assessments.",
        priceInr: 10000,
        priceUsd: 125,
        level: "Intermediate",
        featured: false
      },
      {
        title: "Network Security",
        description: "Learn essential network security concepts such as firewalls, VPNs, and IDS/IPS systems.",
        priceInr: 12000,
        priceUsd: 150,
        level: "Intermediate",
        featured: false
      },
      {
        title: "Wireless Network Security",
        description: "Understand how to secure wireless networks and protect against common wireless attacks like rogue access points.",
        priceInr: 9000,
        priceUsd: 110,
        level: "Intermediate",
        featured: false
      },
      {
        title: "Web Application Security",
        description: "Learn to secure web applications from threats like SQL injection, XSS, and CSRF.",
        priceInr: 11000,
        priceUsd: 140,
        level: "Intermediate",
        featured: false
      },
      {
        title: "Penetration Testing",
        description: "Develop hands-on skills in penetration testing to identify and exploit vulnerabilities in systems and applications.",
        priceInr: 14000,
        priceUsd: 175,
        level: "Advanced",
        featured: true
      },
      {
        title: "Bug Bounty Hunting",
        description: "Discover how to find vulnerabilities in websites and earn rewards by participating in bug bounty programs.",
        priceInr: 10000,
        priceUsd: 125,
        level: "Intermediate",
        featured: false
      },
      {
        title: "Digital Forensics",
        description: "Learn how to investigate and recover data from compromised systems to uncover cybercrime.",
        priceInr: 15000,
        priceUsd: 190,
        level: "Advanced",
        featured: false
      },
      {
        title: "Advanced Ethical Hacking Techniques",
        description: "Dive deeper into advanced hacking techniques and exploit complex vulnerabilities.",
        priceInr: 18000,
        priceUsd: 225,
        level: "Advanced",
        featured: false
      },
      {
        title: "Red Teaming and Blue Teaming",
        description: "Learn both offensive and defensive strategies to simulate real-world cyber attacks and responses.",
        priceInr: 15000,
        priceUsd: 190,
        level: "Advanced",
        featured: false
      },
      {
        title: "Red Team vs Blue Team Training (Advanced)",
        description: "Take your Red Team and Blue Team skills to the next level with advanced tactics and real-world simulations.",
        priceInr: 20000,
        priceUsd: 250,
        level: "Advanced",
        featured: false
      },
      {
        title: "Cybersecurity Risk Management",
        description: "Understand risk assessment, mitigation strategies, and how to manage cybersecurity risks effectively.",
        priceInr: 12000,
        priceUsd: 150,
        level: "Intermediate",
        featured: false
      },
      {
        title: "Artificial Intelligence (AI) in Cybersecurity",
        description: "Explore the use of AI and machine learning in detecting and responding to cybersecurity threats.",
        priceInr: 17000,
        priceUsd: 215,
        level: "Advanced",
        featured: false
      },
      {
        title: "Deep Web and Dark Web Investigation",
        description: "Learn how to investigate the Deep Web and Dark Web for cybercriminal activity and data leaks.",
        priceInr: 12500,
        priceUsd: 160,
        level: "Advanced",
        featured: false
      },
      {
        title: "Cybersecurity for Startups",
        description: "Discover cost-effective security practices designed specifically for startups and small businesses.",
        priceInr: 9000,
        priceUsd: 115,
        level: "Beginner",
        featured: false
      },
      {
        title: "Cybersecurity Leadership and Management",
        description: "Learn how to lead and manage cybersecurity teams, build security policies, and drive organizational change.",
        priceInr: 22000,
        priceUsd: 275,
        level: "Advanced",
        featured: false
      },
      {
        title: "Cyber Security Expert",
        description: "Comprehensive program to become a cybersecurity expert with hands-on training in all aspects of information security.",
        priceInr: 35000,
        priceUsd: 500,
        level: "Expert",
        featured: false
      }
    ];

    coursesList.forEach(course => {
      this.createCourse(course);
    });
  }
}

export const storage = new MemStorage();
