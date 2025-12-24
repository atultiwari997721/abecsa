export const mockUsers = [
  {
    userId: "cust001",
    password: "pass123",
    name: "Rahul Sharma",
    role: "customer",
    websites: [
      { 
        id: 1, 
        name: "Sharma General Store", 
        url: "https://sharmastore.demo.com", 
        status: "Live", 
        plan: "Small Shop / Local Business",
        expiryDate: "2025-12-20"
      }
    ]
  },
  {
    userId: "cust002",
    password: "password123",
    name: "Priya Singh",
    role: "customer",
    websites: [
      { 
        id: 1, 
        name: "Priya's Portfolio", 
        url: "https://priyasingh.dev", 
        status: "Live", 
        plan: "Basic Portfolio",
        expiryDate: "2026-01-15"
      },
       { 
        id: 2, 
        name: "Singh Enterprises", 
        url: "https://singhenterprises.com", 
        status: "In Progress", 
        plan: "Professional Business Website",
        expiryDate: "TBD"
      }
    ]
  },
  {
    userId: "MM001",
    password: "manager123",
    name: "Vikram Malhotra",
    role: "marketing_manager",
    websitesSold: [
      {
        siteName: "Alpha Tech Solutions",
        loginId: "AbecsaMM001User01",
        password: "userPass01",
        dateSold: "2023-11-15",
        status: "Live"
      },
      {
        siteName: "Beta Cafeteria",
        loginId: "AbecsaMM001User02",
        password: "userPass02",
        dateSold: "2023-12-01",
        status: "In Progress"
      }
    ]
  }
];
