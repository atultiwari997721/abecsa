const coursesData = [
  // --- Computer Science / IT / Software ---
  {
    id: 1,
    title: "Full Stack Web Development (MERN)",
    branch: "CS/IT",
    description: "Master MongoDB, Express, React, and Node.js to build dynamic web applications.",
    fullDescription: "Become a full-stack developer with this comprehensive MERN stack course. You will learn to build responsive front-end interfaces with React and robust back-end APIs with Node.js and Express. Database management with MongoDB is also covered in depth.",
    duration: "6 Months",
    originalPrice: "₹25,000",
    price: "₹15,000"
  },
  {
    id: 2,
    title: "Data Science with Python",
    branch: "CS/IT",
    description: "Analyze data and build predictive models using Python, Pandas, and Scikit-Learn.",
    fullDescription: "Unlock the power of data. This course covers data manipulation, visualization, and machine learning algorithms using Python's powerful libraries. Perfect for aspiring data scientists.",
    duration: "4 Months",
    originalPrice: "₹20,000",
    price: "₹12,000"
  },
  {
    id: 3,
    title: "Cyber Security Ethical Hacking",
    branch: "CS/IT",
    description: "Learn to secure networks and perform penetration testing.",
    fullDescription: "Dive into the world of cybersecurity. Learn ethical hacking techniques, network security, vulnerability assessment, and how to protect systems from cyber threats.",
    duration: "5 Months",
    originalPrice: "₹30,000",
    price: "₹18,000"
  },
  {
    id: 4,
    title: "Artificial Intelligence & ML",
    branch: "CS/IT",
    description: "Build intelligent systems using deep learning and neural networks.",
    fullDescription: "Explore the frontiers of AI. Learn about neural networks, deep learning, natural language processing, and computer vision using TensorFlow and PyTorch.",
    duration: "6 Months",
    originalPrice: "₹35,000",
    price: "₹20,000"
  },
  {
    id: 5,
    title: "Java Full Stack Development",
    branch: "CS/IT",
    description: "Enterprise application development using Java, Spring Boot, and Angular/React.",
    fullDescription: "A robust course for enterprise-level development. Master Core Java, Advanced Java, Spring Boot microservices, and connect them with a modern frontend.",
    duration: "6 Months",
    originalPrice: "₹26,000",
    price: "₹16,000"
  },
  {
    id: 6,
    title: "Cloud Computing (AWS/Azure)",
    branch: "CS/IT",
    description: "Deploy and manage scalable applications on cloud platforms.",
    fullDescription: "Prepare for cloud certifications. Learn to design, deploy, and manage scalable and secure applications on major cloud platforms like AWS or Azure.",
    duration: "3 Months",
    originalPrice: "₹22,000",
    price: "₹14,000"
  },
  {
    id: 7,
    title: "DevOps Engineering",
    branch: "CS/IT",
    description: "Master CI/CD pipelines, Docker, Kubernetes, and Jenkins.",
    fullDescription: "Bridge the gap between development and operations. Learn automation, containerization with Docker & Kubernetes, and continuous integration workflows.",
    duration: "4 Months",
    originalPrice: "₹25,000",
    price: "₹15,000"
  },
  {
    id: 8,
    title: "Blockchain Technology",
    branch: "CS/IT",
    description: "Understand decentralized ledgers, smart contracts, and Ethereum.",
    fullDescription: "Step into the future of finance and security. Learn the fundamentals of blockchain, cryptocurrency, and how to write smart contracts using Solidity.",
    duration: "3 Months",
    originalPrice: "₹30,000",
    price: "₹18,000"
  },
  {
    id: 9,
    title: "UI/UX Design Masterclass",
    branch: "Design",
    description: "Design user-friendly interfaces using Figma and Adobe XD.",
    fullDescription: "Create stunning digital experiences. Learn user research, wireframing, prototyping, and high-fidelity UI design using industry-standard tools.",
    duration: "3 Months",
    originalPrice: "₹16,000",
    price: "₹10,000"
  },
  {
    id: 10,
    title: "Mobile App Dev (Flutter)",
    branch: "CS/IT",
    description: "Build native Android and iOS apps with a single codebase.",
    fullDescription: "Learn Google's UI toolkit, Flutter, and the Dart language to build beautiful, natively compiled applications for mobile, web, and desktop.",
    duration: "4 Months",
    originalPrice: "₹22,000",
    price: "₹14,000"
  },
  // --- Electronics / Electrical ---
  {
    id: 11,
    title: "Embedded Systems & IoT",
    branch: "Electronics",
    description: "Programming microcontrollers like Arduino, ESP32, and ARM.",
    fullDescription: "Connect the physical world to the internet. Learn embedded C programming, sensor interfacing, and building IoT projects with various microcontrollers.",
    duration: "4 Months",
    originalPrice: "₹21,000",
    price: "₹13,000"
  },
  {
    id: 12,
    title: "PLC & SCADA Automation",
    branch: "Electrical",
    description: "Industrial automation using Programmable Logic Controllers.",
    fullDescription: "Master industrial automation. Learn ladder logic programming, HMI design, and SCADA system integration for manufacturing and process industries.",
    duration: "3 Months",
    originalPrice: "₹25,000",
    price: "₹15,000"
  },
  {
    id: 13,
    title: "VLSI Design",
    branch: "Electronics",
    description: "Digital circuit design and verification using Verilog/VHDL.",
    fullDescription: "Design complex integrated circuits. Learn digital logic design, FPGA programming, and verification methodologies used in the semiconductor industry.",
    duration: "5 Months",
    originalPrice: "₹35,000",
    price: "₹20,000"
  },
  {
    id: 14,
    title: "PCB Design & Fabrication",
    branch: "Electronics",
    description: "Design professional circuit boards using Altium or Eagle.",
    fullDescription: "From schematic to board. Learn to design multi-layer PCBs, generate Gerber files, and understand the fabrication process.",
    duration: "2 Months",
    originalPrice: "₹14,000",
    price: "₹8,000"
  },
  {
    id: 15,
    title: "Power Systems Analysis",
    branch: "Electrical",
    description: "Simulation and analysis of power grids using MATLAB/ETAP.",
    fullDescription: "Analyze electrical power systems. Learn load flow analysis, short circuit studies, and stability analysis using professional simulation software.",
    duration: "3 Months",
    originalPrice: "₹20,000",
    price: "₹12,000"
  },
  {
    id: 16,
    title: "Electric Vehicle Technology",
    branch: "Electrical",
    description: "Battery management systems and EV drive trains.",
    fullDescription: "Join the green revolution. Understand EV architecture, battery chemistry, BMS algorithms, and motor control techniques.",
    duration: "4 Months",
    originalPrice: "₹26,000",
    price: "₹16,000"
  },
  {
    id: 17,
    title: "Matlab for Engineers",
    branch: "Electronics",
    description: "Numerical computing and algorithm development.",
    fullDescription: "Master the language of technical computing. Learn specific toolboxes for signal processing, control systems, and image processing.",
    duration: "2 Months",
    originalPrice: "₹12,000",
    price: "₹7,000"
  },
  {
    id: 18,
    title: "Solar Energy Systems",
    branch: "Electrical",
    description: "Design and installation of PV solar power plants.",
    fullDescription: "Harness solar power. Learn to design off-grid and on-grid solar PV systems, sizing calculations, and installation best practices.",
    duration: "2 Months",
    originalPrice: "₹15,000",
    price: "₹9,000"
  },
  
  // --- Civil Engineering ---
  {
    id: 19,
    title: "AutoCAD 2D & 3D",
    branch: "Civil",
    description: "Drafting and design software for civil engineers.",
    fullDescription: "The foundational tool for engineers. Master 2D drafting and 3D modeling for architectural and structural drawings.",
    duration: "2 Months",
    originalPrice: "₹10,000",
    price: "₹6,000"
  },
  {
    id: 20,
    title: "Revit Architecture",
    branch: "Civil",
    description: "Building Information Modeling (BIM) for architects.",
    fullDescription: "Step into BIM. Learn 3D architectural modeling, rendering, and documentation using Autodesk Revit.",
    duration: "3 Months",
    originalPrice: "₹16,000",
    price: "₹10,000"
  },
  {
    id: 21,
    title: "STAAD.Pro Structural Analysis",
    branch: "Civil",
    description: "Structural analysis and design of concrete/steel structures.",
    fullDescription: "Analyze complex structures. Learn to model, analyze, and design buildings, bridges, and towers according to international codes.",
    duration: "3 Months",
    originalPrice: "₹19,000",
    price: "₹11,000"
  },
  {
    id: 22,
    title: "Civil Site Engineering",
    branch: "Civil",
    description: "Practical site supervision, layout, and estimation.",
    fullDescription: "Get job-ready for the construction site. Learn reading blueprints, site layout, quantity surveying, and bar bending schedules.",
    duration: "3 Months",
    originalPrice: "₹15,000",
    price: "₹9,000"
  },
  {
    id: 23,
    title: "Primavera P6 Project Mgmt",
    branch: "Civil",
    description: "Project planning, scheduling, and control.",
    fullDescription: "Manage mega-projects. Learn extensive project scheduling, resource allocation, and progress tracking used in large construction projects.",
    duration: "2 Months",
    originalPrice: "₹20,000",
    price: "₹12,000"
  },
  {
    id: 24,
    title: "ETABS High Rise Design",
    branch: "Civil",
    description: "Design of multi-story building systems.",
    fullDescription: "Specialize in tall buildings. Learn to model and design high-rise structures involving complex shear walls and seismic analysis.",
    duration: "3 Months",
    originalPrice: "₹19,000",
    price: "₹11,000"
  },

  // --- Mechanical Engineering ---
  {
    id: 25,
    title: "SolidWorks Design",
    branch: "Mechanical",
    description: "3D CAD design and product modeling.",
    fullDescription: "Bring ideas to 3D. Learn part modeling, assembly design, and drafting for mechanical components and consumer products.",
    duration: "3 Months",
    originalPrice: "₹16,000",
    price: "₹10,000"
  },
  {
    id: 26,
    title: "ANSYS Simulation",
    branch: "Mechanical",
    description: "Finite Element Analysis (FEA) for structural/thermal issues.",
    fullDescription: "Validate your designs. Learn to perform static structural, thermal, and dynamic analysis to ensure product reliability.",
    duration: "3 Months",
    originalPrice: "₹22,000",
    price: "₹14,000"
  },
  {
    id: 27,
    title: "CATIA V5",
    branch: "Mechanical",
    description: "Advanced surface modeling for automotive and aerospace.",
    fullDescription: "The industry standard for automotive design. Master distinct surface modeling, sheet metal design, and complex assemblies.",
    duration: "4 Months",
    originalPrice: "₹25,000",
    price: "₹15,000"
  },
  {
    id: 28,
    title: "HVAC System Design",
    branch: "Mechanical",
    description: "Heating, Ventilation, and Air Conditioning systems.",
    fullDescription: "Design comfort. Learn load calculations, duct sizing, and equipment selection for residential and commercial HVAC systems.",
    duration: "3 Months",
    originalPrice: "₹20,000",
    price: "₹12,000"
  },
  {
    id: 29,
    title: "CNC Programming",
    branch: "Mechanical",
    description: "G-Code and M-Code programming for machining.",
    fullDescription: "Master manufacturing. Learn to write programs for CNC turning and milling operations to manufacture precision parts.",
    duration: "2 Months",
    originalPrice: "₹14,000",
    price: "₹8,000"
  },

  // --- Management / Business ---
  {
    id: 30,
    title: "Digital Marketing Specialist",
    branch: "Management",
    description: "SEO, SEM, Social Media, and Content Marketing.",
    fullDescription: "Grow businesses online. Master search engine optimization, paid advertising, social media strategy, and analytics.",
    duration: "3 Months",
    originalPrice: "₹15,000",
    price: "₹9,000"
  },
  {
    id: 31,
    title: "Project Management (PMP)",
    branch: "Management",
    description: "Methodologies to lead successful projects.",
    fullDescription: "Lead with confidence. Learn PMP concepts including agile, waterfall, risk management, and stakeholder communication.",
    duration: "3 Months",
    originalPrice: "₹25,000",
    price: "₹15,000"
  },
  {
    id: 32,
    title: "Business Analytics with Excel",
    branch: "Management",
    description: "Data-driven decision making using advanced Excel.",
    fullDescription: "Turn data into insights. Master lookup functions, pivot tables, dashboard creation, and statistical analysis in Excel.",
    duration: "2 Months",
    originalPrice: "₹10,000",
    price: "₹6,000"
  },
  {
    id: 33,
    title: "Financial Modeling",
    branch: "Management",
    description: "Building financial models for valuation and equity research.",
    fullDescription: "Analyze company performance. Learn to build three-statement models, DCF valuation, and comparable company analysis.",
    duration: "3 Months",
    originalPrice: "₹19,000",
    price: "₹11,000"
  },
  {
    id: 34,
    title: "Human Resource Management",
    branch: "Management",
    description: "Recruitment, payroll, and employee relations.",
    fullDescription: "Manage talent effectively. Learn the complete HR lifecycle from acquisition to exit, including compliance and performance management.",
    duration: "3 Months",
    originalPrice: "₹14,000",
    price: "₹8,000"
  },

  // --- More CS/Tech (Expanding to 50+) ---
  {
    id: 35,
    title: "Game Development with Unity",
    branch: "CS/IT",
    description: "Create 2D/3D games using C# and Unity Engine.",
    fullDescription: "Build your dream game. Learn game physics, scripting, animation, and UI systems in the Unity engine.",
    duration: "4 Months",
    originalPrice: "₹22,000",
    price: "₹14,000"
  },
  {
    id: 36,
    title: "Software Testing (Selenium)",
    branch: "CS/IT",
    description: "Automated testing for web applications.",
    fullDescription: "Ensure software quality. Learn manual testing concepts and master automation with Selenium WebDriver and Java.",
    duration: "3 Months",
    originalPrice: "₹16,000",
    price: "₹10,000"
  },
  {
    id: 37,
    title: "Big Data Hadoop",
    branch: "CS/IT",
    description: "Processing large datasets using Hadoop ecosystem.",
    fullDescription: "Handle massive data. Learn HDFS, MapReduce, Hive, Pig, and Spark for big data processing and analytics.",
    duration: "4 Months",
    originalPrice: "₹26,000",
    price: "₹16,000"
  },
  {
    id: 38,
    title: "RPA (UiPath)",
    branch: "CS/IT",
    description: "Robotic Process Automation for business tasks.",
    fullDescription: "Automate repetitive tasks. Learn to build software robots using UiPath to streamline business processes.",
    duration: "2 Months",
    originalPrice: "₹20,000",
    price: "₹12,000"
  },
  {
    id: 39,
    title: "React Native Mobile Dev",
    branch: "CS/IT",
    description: "Build mobile apps using React and JavaScript.",
    fullDescription: "Cross-platform mobile dev. Use your React skills to build native mobile apps for iOS and Android.",
    duration: "3 Months",
    originalPrice: "₹21,000",
    price: "₹13,000"
  },
  {
    id: 40,
    title: "Angular Framework",
    branch: "CS/IT",
    description: "Build single-page client applications with Angular.",
    fullDescription: "Master the Angular framework. Learn TypeScript, components, services, dependency injection, and RxJS.",
    duration: "3 Months",
    originalPrice: "₹19,000",
    price: "₹11,000"
  },
  {
    id: 41,
    title: "Python Django Web Dev",
    branch: "CS/IT",
    description: "Rapid web development with Python.",
    fullDescription: "The web framework for perfectionists. Learn to build secure and scalable web applications quickly with Django.",
    duration: "3 Months",
    originalPrice: "₹20,000",
    price: "₹12,000"
  },
  {
    id: 42,
    title: "C++ Programming Master",
    branch: "CS/IT",
    description: "Advanced C++ including STL and system programming.",
    fullDescription: "Deep dive into C++. Master pointers, memory management, object-oriented programming, and the Standard Template Library.",
    duration: "3 Months",
    originalPrice: "₹14,000",
    price: "₹8,000"
  },
  {
    id: 43,
    title: "Linux Administration",
    branch: "CS/IT",
    description: "Server management and shell scripting.",
    fullDescription: "Rule the server. Learn Linux file systems, user management, networking services, and bash scripting.",
    duration: "3 Months",
    originalPrice: "₹15,000",
    price: "₹9,000"
  },
  {
    id: 44,
    title: "Network Engineering (CCNA)",
    branch: "CS/IT",
    description: "Networking fundamentals and routing/switching.",
    fullDescription: "Build the internet. Learn network protocols, IP addressing, routing, switching, and troubleshooting Cisco devices.",
    duration: "4 Months",
    originalPrice: "₹22,000",
    price: "₹14,000"
  },
  {
    id: 45,
    title: "Graphic Design Pro",
    branch: "Design",
    description: "Adobe Photoshop, Illustrator, and InDesign.",
    fullDescription: "Visual storytelling. Master the Adobe Creative Cloud suite for branding, social media graphics, and print design.",
    duration: "3 Months",
    originalPrice: "₹15,000",
    price: "₹9,000"
  },
  {
    id: 46,
    title: "Video Editing & VFX",
    branch: "Design",
    description: "Premiere Pro and After Effects.",
    fullDescription: "Create cinematic content. Learn non-linear video editing, motion graphics, and visual effects.",
    duration: "3 Months",
    originalPrice: "₹19,000",
    price: "₹11,000"
  },
  {
    id: 47,
    title: "Construction Management",
    branch: "Civil",
    description: "Managing construction site operations and safety.",
    fullDescription: "Lead construction projects. Learn site logistics, safety protocols, contract management, and building codes.",
    duration: "3 Months",
    originalPrice: "₹16,000",
    price: "₹10,000"
  },
  {
    id: 48,
    title: "Interior Design Visualization",
    branch: "Civil",
    description: "3D Max and V-Ray for interior rendering.",
    fullDescription: "Visualize spaces. Create photorealistic renders of interior designs using 3ds Max and V-Ray engines.",
    duration: "3 Months",
    originalPrice: "₹20,000",
    price: "₹12,000"
  },
  {
    id: 49,
    title: "Automotive Engineering",
    branch: "Mechanical",
    description: "Vehicle dynamics and engine design basics.",
    fullDescription: "Understand cars. Learn about IC engines, transmission systems, suspension dynamics, and automotive safety.",
    duration: "3 Months",
    originalPrice: "₹19,000",
    price: "₹11,000"
  },
  {
    id: 50,
    title: "Supply Chain Management",
    branch: "Management",
    description: "Logistics, inventory, and operations strategy.",
    fullDescription: "Optimize flow. Learn about procurement, inventory control, logistics distribution, and supply chain analytics.",
    duration: "3 Months",
    originalPrice: "₹15,000",
    price: "₹9,000"
  },
  {
    id: 51,
    title: "Public Speaking & Soft Skills",
    branch: "Management",
    description: "Communication confidence and personality development.",
    fullDescription: "Speak to influence. Improve your presentation skills, body language, and interpersonal communication for career growth.",
    duration: "1 Month",
    originalPrice: "₹7,000",
    price: "₹4,000"
  },
  // --- Government & Vocational Certificates ---
  {
    id: 52,
    title: "CCC (Course on Computer Concepts)",
    branch: "Government",
    description: "NIELIT approved basic computer literacy course.",
    fullDescription: "Essential for many government jobs. Learn computer fundamentals, OS, word processing, spreadsheets, and internet usage.",
    duration: "2 Months",
    originalPrice: "₹6,000",
    price: "₹3,500"
  },
  {
    id: 53,
    title: "Tally Prime with GST",
    branch: "Accounting",
    description: "Complete accounting and inventory management.",
    fullDescription: "Master Tally Prime. Learn voucher entry, inventory, payroll, and GST compliance for business accounting.",
    duration: "3 Months",
    originalPrice: "₹10,000",
    price: "₹6,000"
  },
  {
    id: 54,
    title: "Advanced Excel with Dashboard",
    branch: "Management",
    description: "From basic formulas to dynamic dashboards.",
    fullDescription: "Become an Excel wizard. Learn VLOOKUP, pivot tables, macros, and creating professional interactive dashboards.",
    duration: "2 Months",
    originalPrice: "₹8,000",
    price: "₹5,000"
  },
  {
    id: 55,
    title: "GST Practitioner Certification",
    branch: "Accounting",
    description: "Detailed understanding of Goods and Services Tax.",
    fullDescription: "Become a GST expert. Learn registration, filing returns, e-way bills, and compliance under the GST Act.",
    duration: "2 Months",
    originalPrice: "₹12,000",
    price: "₹7,000"
  },
  {
    id: 56,
    title: "O Level Computer Course",
    branch: "Government",
    description: "NIELIT O Level certification equivalent to a diploma.",
    fullDescription: "Comprehensive IT course covering programming (Python), web design, IoT, and IT tools. Recognized for govt jobs.",
    duration: "1 Year",
    originalPrice: "₹25,000",
    price: "₹15,000"
  },
  {
    id: 57,
    title: "Data Entry Operator",
    branch: "Vocational",
    description: "High-speed typing and office automation tools.",
    fullDescription: "Get job-ready. Learn touch typing, MS Office suite (Word, Excel, PowerPoint), and office administration skills.",
    duration: "3 Months",
    originalPrice: "₹7,000",
    price: "₹4,000"
  },
  {
    id: 58,
    title: "Income Tax E-Filing",
    branch: "Accounting",
    description: "Practical training on filing Data and Income Tax Returns.",
    fullDescription: "Learn to file ITR. Understand tax slabs, deductions, and the online procedure for filing income tax returns.",
    duration: "1 Month",
    originalPrice: "₹7,500",
    price: "₹4,500"
  },
  {
    id: 59,
    title: "Diploma in Computer Applications (DCA)",
    branch: "Vocational",
    description: "6-month diploma covering fundamentals and programming.",
    fullDescription: "A popular diploma for beginners. Covers Windows, MS Office, C programming, and internet technologies.",
    duration: "6 Months",
    originalPrice: "₹14,000",
    price: "₹8,000"
  },
  {
    id: 60,
    title: "ADCA (Adv. Diploma in Computer App)",
    branch: "Vocational",
    description: "1-year diploma with advanced IT skills.",
    fullDescription: "Extensive IT training. Includes DTP, Tally, C++, HTML, and hardware maintenance concepts.",
    duration: "12 Months",
    originalPrice: "₹20,000",
    price: "₹12,000"
  }
];

export default coursesData;
