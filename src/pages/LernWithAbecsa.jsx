import React, { useEffect } from 'react';
import { FaSearch, FaFilter, FaTrophy, FaFire } from 'react-icons/fa';

const LernWithAbecsa = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock Data
  const problems = [
    { title: "Minimize the Heights II", tags: ["Greedy", "Arrays"], difficulty: "Medium", accuracy: "23.4%", users: 180 },
    { title: "Kth Smallest Element", tags: ["Heaps", "Sorting"], difficulty: "Medium", accuracy: "35.1%", users: 210 },
    { title: "Mirror Tree", tags: ["Trees", "Traversal"], difficulty: "Easy", accuracy: "55.8%", users: 340 },
    { title: "Longest Palindrome in a String", tags: ["Strings", "DP"], difficulty: "Medium", accuracy: "19.8%", users: 50 },
    { title: "N-Queen Problem", tags: ["Backtracking", "Recursion"], difficulty: "Hard", accuracy: "15.2%", users: 90 },
    { title: "Detect Loop in Linked List", tags: ["Linked List", "Two Pointers"], difficulty: "Easy", accuracy: "48.2%", users: 400 },
    { title: "Kadane's Algorithm", tags: ["Arrays", "DP"], difficulty: "Medium", accuracy: "12.0%", users: 300 },
    { title: "Median of 2 Sorted Arrays", tags: ["Binary Search", "Arrays"], difficulty: "Hard", accuracy: "25.0%", users: 15 },
    { title: "Parenthesis Checker", tags: ["Stacks", "Strings"], difficulty: "Easy", accuracy: "62.5%", users: 600 },
  ];

  const leaderboard = [
    { name: "Rahul Sharma", points: 1500, rank: 1 },
    { name: "Priya Singh", points: 1450, rank: 2 },
    { name: "Amit Patel", points: 1420, rank: 3 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-[#0B1120] text-slate-900 dark:text-white transition-colors duration-300 font-body">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-6">
        
        {/* Left Sidebar: Filters */}
        <aside className="hidden lg:flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1E293B] rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
            <div className="flex justify-between items-center mb-4">
              <h3 className="tex-lg font-bold font-heading">Filters</h3>
              <FaFilter className="text-gray-400" />
            </div>
            
            {['Status', 'Difficulty', 'Topic'].map((group) => (
              <div key={group} className="mb-4 last:mb-0">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{group}</h4>
                <div className="flex flex-col gap-2">
                   {['Option 1', 'Option 2'].map(opt => (
                       <label key={opt} className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300 cursor-pointer hover:text-blue-600 transition-colors">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> {group} {opt.split(' ')[1]}
                       </label>
                   ))}
                </div>
              </div>
            ))}
          </div>

           <div className="bg-gradient-to-br from-[#1C4980] to-blue-600 rounded-xl p-6 text-white text-center shadow-lg">
            <h3 className="text-lg font-bold mb-2">Mock Interview</h3>
            <p className="text-sm opacity-90 mb-4">Practice with industry experts.</p>
            <button className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-bold w-full hover:bg-gray-100 transition-colors">Book Now</button>
          </div>
        </aside>

        {/* Center: Main Content */}
        <main className="flex flex-col gap-6">
          
          {/* Search Header */}
          <div className="bg-white dark:bg-[#1E293B] rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-4 transition-colors">
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search Problems..." 
                className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body"
              />
            </div>
            <button className="hidden sm:block bg-[#1C4980] dark:bg-electricBlue text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                Pick Random
            </button>
          </div>

          {/* Problem List */}
          <div className="flex flex-col gap-4">
            {problems.map((problem, idx) => (
              <div key={idx} className="bg-white dark:bg-[#1E293B] rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-800 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-electricBlue transition-colors">{problem.title}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">+{problem.users} users</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {problem.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8 border-t md:border-t-0 border-gray-100 dark:border-gray-800 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="text-center">
                    <div className={`font-bold text-sm mb-1 ${
                        problem.difficulty === 'Easy' ? 'text-green-500' : 
                        problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {problem.difficulty}
                    </div>
                    <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Diff</div>
                  </div>

                   <div className="text-center min-w-[60px]">
                    <div className="font-bold text-slate-700 dark:text-gray-300 text-sm mb-1">{problem.accuracy}</div>
                    <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Acc</div>
                  </div>

                  <button className="bg-transparent border border-[#1C4980] dark:border-electricBlue text-[#1C4980] dark:text-electricBlue px-5 py-2 rounded-full text-sm font-bold hover:bg-[#1C4980] hover:text-white dark:hover:bg-electricBlue dark:hover:text-white transition-all">
                    Solve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar: Stats */}
        <aside className="flex flex-col gap-6 order-first lg:order-last">
           {/* Mobile-only Stats Summary (visible on small/med, hidden on lg if needed, but let's keep it stacked for now on mobile) */}
           
           {/* Daily Goal */}
           <div className="bg-white dark:bg-[#1E293B] rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
             <div className="flex items-center gap-3 mb-4">
               <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2.5 rounded-full">
                 <FaFire />
               </div>
               <div>
                 <h3 className="font-bold text-base text-slate-900 dark:text-white">Coding Sprint</h3>
                 <span className="text-xs text-gray-500 dark:text-gray-400">0/1 Problems Solved</span>
               </div>
             </div>
             <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
               <div className="w-0 h-full bg-blue-500 rounded-full"></div>
             </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white dark:bg-[#1E293B] rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-base text-slate-900 dark:text-white">Top Solvers</h3>
               <FaTrophy className="text-yellow-500" />
            </div>

            <div className="flex flex-col gap-4">
              {leaderboard.map((user, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      idx === 0 ? 'bg-yellow-100 text-yellow-700' : 
                      idx === 1 ? 'bg-gray-100 text-gray-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{user.points} pts</div>
                  </div>
                </div>
              ))}
            </div>

             <button className="w-full mt-4 py-2 bg-gray-50 dark:bg-gray-800 text-slate-600 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                 View Leaderboard
             </button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default LernWithAbecsa;
