
const certificatesData = [
  // ==========================================
  // 1. Accounting & Finance (Tally, GST, Banking)
  // ==========================================
  {
    id: 1,
    title: "Tally Prime with GST",
    branch: "Accounting",
    description: "Complete accounting with GST compliance.",
    fullDescription: "Master Tally Prime software. Learn voucher entry, inventory management, payroll, and GST return filing.",
    duration: "4 Weeks",
    originalPrice: "₹4,000",
    price: "₹399"
  },
  {
    id: 2,
    title: "Advanced Excel for Finance",
    branch: "Accounting",
    description: "Financial modeling and analysis.",
    fullDescription: "Excel for accountants. Learn pivot tables, VLOOKUP, macros, and financial functions like PMT, IRR, NPV.",
    duration: "3 Weeks",
    originalPrice: "₹3,500",
    price: "₹299"
  },
  {
    id: 3,
    title: "Income Tax E-Filing",
    branch: "Accounting",
    description: "File ITR confidently.",
    fullDescription: "Learn to file Income Tax Returns (ITR-1, ITR-4) online. Understand tax slabs, deductions (80C, 80D), and refunds.",
    duration: "2 Weeks",
    originalPrice: "₹2,500",
    price: "₹249"
  },
  {
    id: 4,
    title: "Banking & Finance Basics",
    branch: "Accounting",
    description: "Core banking operations.",
    fullDescription: "Understand the banking sector. Learn about loans, deposits, KYC norms, NEFT/RTGS, and digital banking.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 5,
    title: "Stock Market for Beginners",
    branch: "Finance",
    description: "Investing and trading basics.",
    fullDescription: "Start your investment journey. Learn about shares, IPOs, demat accounts, dividends, and basic technical analysis.",
    duration: "2 Weeks",
    originalPrice: "₹5,000",
    price: "₹299"
  },
  {
    id: 6,
    title: "Mutual Funds Distributor",
    branch: "Finance",
    description: "NISM series preparation basics.",
    fullDescription: "Understand mutual funds. Learn about NAV, SIP, SWP, equity vs debt funds, and portfolio management.",
    duration: "3 Weeks",
    originalPrice: "₹4,500",
    price: "₹399"
  },
  {
    id: 7,
    title: "Payroll Management",
    branch: "HR/Admin",
    description: "Employee salary processing.",
    fullDescription: "Manage employee compensation. Learn salary structure calculation, PF, ESI, TDS deduction, and slip generation.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹299"
  },
  {
    id: 8,
    title: "QuickBooks Online",
    branch: "Accounting",
    description: "Cloud accounting software.",
    fullDescription: "Manage US/UK freelance clients. Learn invoicing, expense tracking, and bank reconciliation on QuickBooks.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹499"
  },
  {
    id: 9,
    title: "Goods & Services Tax (GST) Expert",
    branch: "Accounting",
    description: "In-depth GST laws and filing.",
    fullDescription: "Become a GST practitioner. Detailed study of GST act, registration process, e-way bills, and annual returns.",
    duration: "1 Month",
    originalPrice: "₹6,000",
    price: "₹499"
  },
  {
    id: 10,
    title: "Cost Accounting Basics",
    branch: "Accounting",
    description: "Cost control and tracking.",
    fullDescription: "Optimize business costs. Learn about fixed vs variable costs, break-even analysis, and budgeting.",
    duration: "2 Weeks",
    originalPrice: "₹2,500",
    price: "₹199"
  },

  // ==========================================
  // 2. IT & Software (Programming, Web, Data)
  // ==========================================
  {
    id: 11,
    title: "HTML5 & CSS3 Mastery",
    branch: "CS/IT",
    description: "Responsive web design.",
    fullDescription: "Build modern websites. Learn semantic HTML, flexbox, grid, and media queries for mobile-responsive layouts.",
    duration: "3 Weeks",
    originalPrice: "₹4,999",
    price: "₹299"
  },
  {
    id: 12,
    title: "JavaScript Logic Building",
    branch: "CS/IT",
    description: "Programming logic and algorithms.",
    fullDescription: "Master coding logic. Learn loops, arrays, objects, functions, and solving basic algorithmic problems in JS.",
    duration: "4 Weeks",
    originalPrice: "₹5,999",
    price: "₹399"
  },
  {
    id: 13,
    title: "Python Data Structures",
    branch: "CS/IT",
    description: "Lists, Dicts, Sets, Tuples.",
    fullDescription: "Deep dive into Python. Master data structures and efficient data manipulation techniques.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹349"
  },
  {
    id: 14,
    title: "C Programming Foundation",
    branch: "CS/IT",
    description: "Mother of all languages.",
    fullDescription: "Build a strong base. Learn memory management, pointers, structures, and file handling in C.",
    duration: "4 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 15,
    title: "C++ OOP Concepts",
    branch: "CS/IT",
    description: "Object-Oriented Programming.",
    fullDescription: "Master OOPs. Learn classes, objects, inheritance, polymorphism, and encapsulation in C++.",
    duration: "4 Weeks",
    originalPrice: "₹4,500",
    price: "₹349"
  },
  {
    id: 16,
    title: "Core Java Programming",
    branch: "CS/IT",
    description: "Java SE fundamentals.",
    fullDescription: "Learn platform-independent coding. Covers JVM architecture, exception handling, collections, and multi-threading.",
    duration: "1 Month",
    originalPrice: "₹6,000",
    price: "₹499"
  },
  {
    id: 17,
    title: "SQL Database Management",
    branch: "CS/IT",
    description: "MySQL and RDBMS concepts.",
    fullDescription: "Manage data effectively. Learn E-R diagrams, normalization, and complex SQL queries involving joins and subqueries.",
    duration: "3 Weeks",
    originalPrice: "₹4,000",
    price: "₹399"
  },
  {
    id: 18,
    title: "PHP & MySQL Web Dev",
    branch: "CS/IT",
    description: "Dynamic backend development.",
    fullDescription: "Build dynamic sites. Learn to connect HTML forms to databases, sessions, cookies, and CRUD operations.",
    duration: "1 Month",
    originalPrice: "₹5,500",
    price: "₹449"
  },
  {
    id: 19,
    title: "WordPress Development",
    branch: "CS/IT",
    description: "No-code website building.",
    fullDescription: "Create professional sites. Learn theme customization, plugin management, and Elementor page builder.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹299"
  },
  {
    id: 20,
    title: "Linux Command Line",
    branch: "CS/IT",
    description: "Terminal proficiency.",
    fullDescription: "Navigate Linux like a pro. Learn file permissions, grep, piping, bash scripting, and system monitoring.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 21,
    title: "Git & GitHub Version Control",
    branch: "CS/IT",
    description: "Code collaboration tool.",
    fullDescription: "Essential for devs. Learn committing, branching, merging, pull requests, and resolving conflicts.",
    duration: "1 Week",
    originalPrice: "₹2,500",
    price: "₹149"
  },
  {
    id: 22,
    title: "Ethical Hacking Basics",
    branch: "CS/IT",
    description: "Intro to offensive security.",
    fullDescription: "Think like a hacker. Learn reconnaissance, scanning, and basic vulnerability assessment techniques.",
    duration: "3 Weeks",
    originalPrice: "₹6,000",
    price: "₹499"
  },
  {
    id: 23,
    title: "Cyber Security Awareness",
    branch: "CS/IT",
    description: "Safe internet practices.",
    fullDescription: "Stay safe online. Learn to identify phishing, secure passwords, use 2FA, and protect personal data.",
    duration: "1 Week",
    originalPrice: "₹2,000",
    price: "₹99"
  },
  {
    id: 24,
    title: "Cloud Computing Basics (AWS)",
    branch: "CS/IT",
    description: "Intro to cloud services.",
    fullDescription: "Move to the cloud. Understand EC2, S3, IAM, and cloud deployment models on AWS.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 25,
    title: "Android App Basics",
    branch: "CS/IT",
    description: "Build simple Android apps.",
    fullDescription: "Start mobile dev. Learn XML layouts, activities, and basic Java/Kotlin for Android Studio.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹399"
  },
  {
    id: 26,
    title: "Artificial Intelligence Intro",
    branch: "CS/IT",
    description: "Concepts of AI & ML.",
    fullDescription: "Future tech today. Understand neural networks, machine learning types, and real-world AI applications.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹249"
  },
  {
    id: 27,
    title: "Power BI Data Visualization",
    branch: "CS/IT",
    description: "Business intelligence reports.",
    fullDescription: "Visualize data. Learn to import data, create relationships, DAX formulas, and interactive dashboards.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹399"
  },
  {
    id: 28,
    title: "Software Testing Manual",
    branch: "CS/IT",
    description: "QA fundamentals.",
    fullDescription: "Find bugs. Learn STLC, writing test cases, bug reporting, and types of testing (Blackbox/Whitebox).",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹249"
  },
  {
    id: 29,
    title: "RPA UiPath Basics",
    branch: "CS/IT",
    description: "Robotic Process Automation.",
    fullDescription: "Automate tasks. Learn to build simple bots to automate repetitive desktop and web tasks.",
    duration: "2 Weeks",
    originalPrice: "₹4,500",
    price: "₹299"
  },
  {
    id: 30,
    title: "Arduino Robotics",
    branch: "Electronics",
    description: "Hardware programming.",
    fullDescription: "Build robots. Learn Arduino architecture, sensor interfacing, and motor control programming.",
    duration: "3 Weeks",
    originalPrice: "₹4,000",
    price: "₹349"
  },

  // ==========================================
  // 3. Office Productivity & Operations
  // ==========================================
  {
    id: 31,
    title: "Computer Fundamentals (DCA)",
    branch: "Office",
    description: "Basic computer operations.",
    fullDescription: "Computer literacy. Learn OS navigation, file management, internet usage, and hardware basics.",
    duration: "3 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 32,
    title: "MS Word Advanced",
    branch: "Office",
    description: "Document formatting mastery.",
    fullDescription: "Create professional docs. Learn mail merge, styles, table of contents, and references management.",
    duration: "1 Week",
    originalPrice: "₹2,000",
    price: "₹149"
  },
  {
    id: 33,
    title: "MS Excel Intermediate",
    branch: "Office",
    description: "Data handling skills.",
    fullDescription: "Beyond basics. Learn conditional formatting, charts, data validation, and basic formulas.",
    duration: "2 Weeks",
    originalPrice: "₹2,500",
    price: "₹199"
  },
  {
    id: 34,
    title: "MS PowerPoint Presentation",
    branch: "Office",
    description: "Impactful slide design.",
    fullDescription: "Present with confidence. Learn animations, transitions, master slides, and embedding media.",
    duration: "1 Week",
    originalPrice: "₹2,000",
    price: "₹149"
  },
  {
    id: 35,
    title: "Google Workspace Mastery",
    branch: "Office",
    description: "Docs, Sheets, Slides, Forms.",
    fullDescription: "Cloud collaboration. Master real-time collaboration on Google Drive tools and Google Forms.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 36,
    title: "Typing Speed Master",
    branch: "Vocational",
    description: "Touch typing course.",
    fullDescription: "Type faster (40+ WPM). Learn correct finger placement and practice drills for speed and accuracy.",
    duration: "2 Weeks",
    originalPrice: "₹1,500",
    price: "₹99"
  },
  {
    id: 37,
    title: "Data Entry Operator",
    branch: "Vocational",
    description: "Accuracy and speed.",
    fullDescription: "Job-ready skill. Learn data transcription, form filling, and OCR tools with high accuracy.",
    duration: "2 Weeks",
    originalPrice: "₹2,500",
    price: "₹149"
  },
  {
    id: 38,
    title: "Virtual Assistant Basics",
    branch: "Admin",
    description: "Remote administrative support.",
    fullDescription: "Work remotely. Learn email management, scheduling, travel booking, and CRM basics.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹249"
  },
  {
    id: 39,
    title: "Store Keeping & Inventory",
    branch: "Management",
    description: "Warehouse management.",
    fullDescription: "Manage stock. Learn FIFO/LIFO, stock audit, goods receipt, and dispatch documentation.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹299"
  },
  {
    id: 40,
    title: "Front Desk Executive",
    branch: "Admin",
    description: "Reception management.",
    fullDescription: "First impression matters. Learn visitor management, EPABX usage, and office hospitality.",
    duration: "2 Weeks",
    originalPrice: "₹2,500",
    price: "₹199"
  },

  // ==========================================
  // 4. Digital Marketing & Content
  // ==========================================
  {
    id: 41,
    title: "Digital Marketing Foundation",
    branch: "Marketing",
    description: "Overview of online marketing.",
    fullDescription: "Go digital. Understand SEO, SEM, SMM, Email Marketing, and how they work together.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 42,
    title: "SEO Strategies",
    branch: "Marketing",
    description: "Search Engine Optimization.",
    fullDescription: "Rank #1. Learn keyword research, on-page optimization, backlinking, and technical SEO.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹399"
  },
  {
    id: 43,
    title: "Social Media Marketing (SMM)",
    branch: "Marketing",
    description: "FB, Insta, LinkedIn growth.",
    fullDescription: "Build a brand. Learn content calendar creation, organic growth strategies, and community management.",
    duration: "3 Weeks",
    originalPrice: "₹4,500",
    price: "₹349"
  },
  {
    id: 44,
    title: "Google Ads (PPC)",
    branch: "Marketing",
    description: "Paid search advertising.",
    fullDescription: "Run profitable ads. Learn campaign setup, bidding strategies, keyword match types, and ad extensions.",
    duration: "3 Weeks",
    originalPrice: "₹5,500",
    price: "₹449"
  },
  {
    id: 45,
    title: "Content Writing Mastery",
    branch: "Content",
    description: "Copywriting and blogging.",
    fullDescription: "Write that sells. Learn SEO writing, blog formatting, headline formulas, and plagiarism checking.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹249"
  },
  {
    id: 46,
    title: "Affiliate Marketing 101",
    branch: "Marketing",
    description: "Earn passive income.",
    fullDescription: "Commission-based earning. Learn to choose niches, find affiliate programs (Amazon), and promote links.",
    duration: "1 Week",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 47,
    title: "Email Marketing Automation",
    branch: "Marketing",
    description: "Tools like Mailchimp.",
    fullDescription: "Automate followup. Learn list building, segmentation, drip campaigns, and analyzing open rates.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹299"
  },
  {
    id: 48,
    title: "YouTube Channel Growth",
    branch: "Content",
    description: "Video content strategy.",
    fullDescription: "Become a Tuber. Learn thumbnail design, title optimization, analytics, and monetization policies.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹299"
  },
  {
    id: 49,
    title: "Canva Pro Design",
    branch: "Design",
    description: "Advanced graphic creation.",
    fullDescription: "Design without degree. Master Canva for social media posts, presentations, reels, and printables.",
    duration: "1 Week",
    originalPrice: "₹2,000",
    price: "₹149"
  },
  {
    id: 50,
    title: "Blogging for Profit",
    branch: "Content",
    description: "WordPress blogging.",
    fullDescription: "Start a blog. Learn niche selection, content strategy, AdSense approval, and monetization.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹249"
  },

  // ==========================================
  // 5. Design, Multimedia & Animation
  // ==========================================
  {
    id: 51,
    title: "Graphic Design Basics",
    branch: "Design",
    description: "Color, Typography, Layout.",
    fullDescription: "Design theory. Learn the fundamental principles of design composition, color psychology, and resizing.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 52,
    title: "Adobe Photoshop Essential",
    branch: "Design",
    description: "Image editing mastery.",
    fullDescription: "Edit photos. Learn layers, masking, selection tools, retouching, and photo manipulation.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹399"
  },
  {
    id: 53,
    title: "CorelDRAW Vector Graphics",
    branch: "Design",
    description: "Print design (Logos, Banners).",
    fullDescription: "Vector art. Learn to design logos, visiting cards, brochures, and flex banners suitable for printing.",
    duration: "3 Weeks",
    originalPrice: "₹4,500",
    price: "₹349"
  },
  {
    id: 54,
    title: "Video Editing (Premiere Pro)",
    branch: "Design",
    description: "Professional video cutting.",
    fullDescription: "Edit like a pro. Learn timeline, transitions, color correction, audio syncing, and export settings.",
    duration: "1 Month",
    originalPrice: "₹6,000",
    price: "₹499"
  },
  {
    id: 55,
    title: "Mobile Video Editing",
    branch: "Design",
    description: "VN / CapCut mastery.",
    fullDescription: "Create reels. Learn to edit high-quality videos and reels directly on your smartphone.",
    duration: "1 Week",
    originalPrice: "₹2,000",
    price: "₹149"
  },
  {
    id: 56,
    title: "Adobe Illustrator Basics",
    branch: "Design",
    description: "Digital illustration.",
    fullDescription: "Create icons and art. Learn pen tool, shape builder, and vector illustration techniques.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹399"
  },
  {
    id: 57,
    title: "UI/UX Design Fundamentals",
    branch: "Design",
    description: "User Interface concepts.",
    fullDescription: "Design apps. Learn wireframing, prototyping, and user journey mapping using Figma.",
    duration: "3 Weeks",
    originalPrice: "₹5,500",
    price: "₹399"
  },
  {
    id: 58,
    title: "2D Animation Basics",
    branch: "Design",
    description: "Motion graphics intro.",
    fullDescription: "Make things move. Learn keyframing, timing, and basic character animation concepts.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 59,
    title: "Audio Editing (Audacity)",
    branch: "Multimedia",
    description: "Podcast & voiceover edit.",
    fullDescription: "Clear sound. Learn noise reduction, equalization, compression, and mixing audio tracks.",
    duration: "1 Week",
    originalPrice: "₹2,500",
    price: "₹199"
  },
  {
    id: 60,
    title: "Interior Design Basics",
    branch: "Design",
    description: "Space planning intro.",
    fullDescription: "Decorate spaces. Learn color schemes, furniture layout, lighting basics, and material selection.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },

  // ==========================================
  // 6. Hardware, Networking & Tech Support
  // ==========================================
  {
    id: 61,
    title: "PC Hardware & Assembly",
    branch: "Hardware",
    description: "Build your own PC.",
    fullDescription: "Hardware tech. Learn identifying components, assembling a desktop, and BIOS configuration.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹249"
  },
  {
    id: 62,
    title: "Windows Troubleshooting",
    branch: "Hardware",
    description: "OS repair & maintenance.",
    fullDescription: "Fix PC issues. Learn formatting, driver installation, virus removal, and registry fixes.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 63,
    title: "Networking Basics (LAN/WAN)",
    branch: "Hardware",
    description: "Connect computers.",
    fullDescription: "Understand networks. Learn IP addressing, cabling (RJ45), routers, switches, and setting up Wi-Fi.",
    duration: "3 Weeks",
    originalPrice: "₹4,500",
    price: "₹349"
  },
  {
    id: 64,
    title: "CCTV Installation",
    branch: "Hardware",
    description: "Security surveillance setup.",
    fullDescription: "Install cameras. Learn about DVR/NVR, camera types, cabling, and remote viewing configuration.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 65,
    title: "Computer Printer Repair",
    branch: "Hardware",
    description: "Basics of printer maintenance.",
    fullDescription: "Fix printers. Learn cartridge refilling, head cleaning, and troubleshooting Laser/Inkjet printers.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹249"
  },
  {
    id: 66,
    title: "Mobile Repairing Basics",
    branch: "Hardware",
    description: "Smartphone software fixes.",
    fullDescription: "Fix phones. Learn flashing, unlocking, diagnosing hardware faults, and component replacing.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹399"
  },

  // ==========================================
  // 7. Soft Skills & Management
  // ==========================================
  {
    id: 67,
    title: "Public Speaking Mastery",
    branch: "Soft Skills",
    description: "Overcome stage fear.",
    fullDescription: "Speak confidently. Learn speech structuring, body language, voice modulation, and audience engagement.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 68,
    title: "Corporate Email Etiquette",
    branch: "Soft Skills",
    description: "Professional writing.",
    fullDescription: "Write professionally. Learn formal salutations, tone, conciseness, and email signature best practices.",
    duration: "3 Days",
    originalPrice: "₹1,500",
    price: "₹99"
  },
  {
    id: 69,
    title: "Leadership Fundamentals",
    branch: "Management",
    description: "Team leading skills.",
    fullDescription: "Lead teams. Learn delegation, motivation, conflict resolution, and decision-making styles.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹249"
  },
  {
    id: 70,
    title: "Interview Cracker",
    branch: "Jobs",
    description: "HR Round preparation.",
    fullDescription: "Get hired. Learn to answer 'Tell me about yourself', strengths/weaknesses, and salary negotiation.",
    duration: "1 Week",
    originalPrice: "₹2,000",
    price: "₹149"
  },
  {
    id: 71,
    title: "Spoken English - Basic",
    branch: "Language",
    description: "Daily conversation skills.",
    fullDescription: "Speak English. Learn basic grammar, daily vocabulary, and sentence construction for conversation.",
    duration: "1 Month",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 72,
    title: "Business English",
    branch: "Language",
    description: "Corporate communication.",
    fullDescription: "Professional fluency. Learn vocabulary for meetings, presentations, negotiations, and reports.",
    duration: "3 Weeks",
    originalPrice: "₹4,500",
    price: "₹349"
  },
  {
    id: 73,
    title: "Time Management",
    branch: "Soft Skills",
    description: "Boost productivity.",
    fullDescription: "Stop procrastinating. Learn prioritization matrices, goal setting, and daily planning techniques.",
    duration: "1 Week",
    originalPrice: "₹2,000",
    price: "₹99"
  },
  {
    id: 74,
    title: "Stress Management",
    branch: "Health",
    description: "Work-life balance.",
    fullDescription: "Stay calm. Learn mindfulness, coping mechanisms, and relaxation techniques for workplace stress.",
    duration: "1 Week",
    originalPrice: "₹2,000",
    price: "₹99"
  },
  {
    id: 75,
    title: "Entrepreneurship 101",
    branch: "Management",
    description: "Starting a business.",
    fullDescription: "Be a founder. Learn idea validation, business model canvas, and basic startup legalities.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 76,
    title: "Event Management Basics",
    branch: "Management",
    description: "Planning and execution.",
    fullDescription: "Organize events. Learn vendor management, budgeting, logistics, and coordinating corporate events.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹249"
  },

  // ==========================================
  // 8. Vocational & Miscellaneous
  // ==========================================
  {
    id: 77,
    title: "Yoga & Wellness Coach",
    branch: "Health",
    description: "Basic yoga poses.",
    fullDescription: "Health is wealth. Learn surya namaskar, pranayama, and basic asanas for daily fitness.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 78,
    title: "Diet & Nutrition Basics",
    branch: "Health",
    description: "Healthy eating habits.",
    fullDescription: "Eat right. Understand macros, micros, calorie counting, and meal planning for fitness.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 79,
    title: "Beautician Course (Basic)",
    branch: "Vocational",
    description: "Skincare and makeup.",
    fullDescription: "Beauty skills. Learn facials, threading, waxing, and basic party makeup techniques.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹399"
  },
  {
    id: 80,
    title: "Tailoring & Stitching",
    branch: "Vocational",
    description: "Basic clothing repair.",
    fullDescription: "Sewing basics. Learn measurements, cutting, and stitching kurtas/blouses.",
    duration: "1 Month",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 81,
    title: "Mobile App Marketing (ASO)",
    branch: "Marketing",
    description: "App Store Optimization.",
    fullDescription: "Rank apps. Learn to optimize mobile app listings for Google Play and App Store.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹249"
  },
  {
    id: 82,
    title: "Freelancing Mastery",
    branch: "Career",
    description: "Winning clients online.",
    fullDescription: "Work on Upwork/Fiverr. Learn profile building, proposal writing, and pricing your services.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 83,
    title: "Customer Service Rep",
    branch: "Jobs",
    description: "Handling customer queries.",
    fullDescription: "Support skills. Learn empathy, conflict de-escalation, and handling difficult customers.",
    duration: "2 Weeks",
    originalPrice: "₹2,500",
    price: "₹149"
  },
  {
    id: 84,
    title: "Safety Management (HSE)",
    branch: "Industrial",
    description: "Workplace safety basics.",
    fullDescription: "Safety first. Learn fire safety, PPE usage, and hazard identification in industries.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹249"
  },
  {
    id: 85,
    title: "Solar Panel Installation",
    branch: "Technical",
    description: "Renewable energy skills.",
    fullDescription: "Go green. Learn basics of solar PV systems, mounting structures, and connections.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 86,
    title: "Agriculture & Organic Farming",
    branch: "Agriculture",
    description: "Modern farming basics.",
    fullDescription: "Grow food. Learn composting, organic fertilizers, and sustainable farming methods.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 87,
    title: "Travel & Tourism Basics",
    branch: "Service",
    description: "Ticketing and guiding.",
    fullDescription: "Tourism industry. Learn itinerary planning, ticketing codes, and tour guiding basics.",
    duration: "3 Weeks",
    originalPrice: "₹4,500",
    price: "₹299"
  },
  {
    id: 88,
    title: "Hotel Management Intro",
    branch: "Service",
    description: "Hospitality basics.",
    fullDescription: "Hospitality sector. Learn housekeeping, front office, and food & beverage service basics.",
    duration: "3 Weeks",
    originalPrice: "₹5,000",
    price: "₹399"
  },
  {
    id: 89,
    title: "Journalism & Reporting",
    branch: "Media",
    description: "News writing basics.",
    fullDescription: "Report news. Learn news gathering, interviewing, and writing for print/digital media.",
    duration: "3 Weeks",
    originalPrice: "₹4,500",
    price: "₹349"
  },
  {
    id: 90,
    title: "Psychology Basics",
    branch: "Humanities",
    description: "Understanding human mind.",
    fullDescription: "Human behavior. Introduction to cognitive, behavioral, and developmental psychology.",
    duration: "3 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 91,
    title: "Teacher Training (Nursery)",
    branch: "Education",
    description: "Early childhood education.",
    fullDescription: "Teach kids. Learn child psychology, playful teaching methods, and lesson planning.",
    duration: "1 Month",
    originalPrice: "₹5,000",
    price: "₹399"
  },
  {
    id: 92,
    title: "Legal Literacy (Indian Law)",
    branch: "Law",
    description: "Know your rights.",
    fullDescription: "Basic laws. Learn about consumer rights, RTI, FIR procedure, and fundamental rights.",
    duration: "2 Weeks",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 93,
    title: "Hindi Typing (Remington)",
    branch: "Vocational",
    description: "Govt job typing skill.",
    fullDescription: "Type in Hindi. Learn Keys layout (Remington/Inscript) for government exams.",
    duration: "3 Weeks",
    originalPrice: "₹2,500",
    price: "₹199"
  },
  {
    id: 94,
    title: "Calligraph Design",
    branch: "Art",
    description: "Beautiful handwriting.",
    fullDescription: "Art of writing. Learn brush lettering, faux calligraphy, and creating artistic fonts.",
    duration: "1 Week",
    originalPrice: "₹2,000",
    price: "₹149"
  },
  {
    id: 95,
    title: "Music Production Basics",
    branch: "Multimedia",
    description: "FL Studio Intro.",
    fullDescription: "Make beats. Learn interface of DAW, beat making, and basic mixing techniques.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 96,
    title: "Fashion Designing Basics",
    branch: "Design",
    description: "Sketching and fabrics.",
    fullDescription: "Fashion world. Learn fashion illustration, color theory for clothes, and fabric types.",
    duration: "3 Weeks",
    originalPrice: "₹4,500",
    price: "₹349"
  },
  {
    id: 97,
    title: "Supply Chain Logistics",
    branch: "Management",
    description: "Moving products.",
    fullDescription: "Logistics basics. Learn transport modes, warehousing, and inventory flow.",
    duration: "2 Weeks",
    originalPrice: "₹3,500",
    price: "₹249"
  },
  {
    id: 98,
    title: "SharePoint Basics",
    branch: "IT",
    description: "Document management.",
    fullDescription: "Corporate IT. Learn to manage sites, libraries, and lists in Microsoft SharePoint.",
    duration: "2 Weeks",
    originalPrice: "₹4,000",
    price: "₹299"
  },
  {
    id: 99,
    title: "Six Sigma White Belt",
    branch: "Management",
    description: "Process improvement.",
    fullDescription: "Quality management. Introduction to DMAIC framework and lean principles.",
    duration: "1 Week",
    originalPrice: "₹3,000",
    price: "₹199"
  },
  {
    id: 100,
    title: "Drone Piloting Basics",
    branch: "Technical",
    description: "Flying regulations.",
    fullDescription: "Fly drones. Learn drone rules, safety checks, and basic flying maneuvers.",
    duration: "1 Week",
    originalPrice: "₹3,500",
    price: "₹299"
  },
  {
    id: 101,
    title: "Blockchain Fundamentals",
    branch: "CS/IT",
    description: "Crypto technology.",
    fullDescription: "Web3 intro. Understand how blockchain works, mining, hashing, and smart contracts.",
    duration: "2 Weeks",
    originalPrice: "₹4,500",
    price: "₹299"
  },
  {
    id: 102,
    title: "Prompt Engineering",
    branch: "CS/IT",
    description: "Mastering AI prompts.",
    fullDescription: "Talk to AI. Learn to craft effective prompts for ChatGPT, Midjourney to get desired results.",
    duration: "1 Week",
    originalPrice: "₹2,500",
    price: "₹199"
  }
];

export default certificatesData;
