import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaTrophy, FaFire, FaTimes, FaCode, FaPlay, FaCertificate, FaTerminal, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LernWithAbecsa = () => {
  const [activeProblem, setActiveProblem] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [selectedLang, setSelectedLang] = useState("cpp");
  const [userCode, setUserCode] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState("");

  const languageMap = {
    cpp: { name: "c++", version: "10.2.0", defaultCode: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello from Abecsa C++!\" << std::endl;\n    return 0;\n}" },
    c: { name: "c", version: "10.2.0", defaultCode: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello from Abecsa C!\\n\");\n    return 0;\n}" },
    java: { name: "java", version: "15.0.2", defaultCode: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Abecsa Java!\");\n    }\n}" },
    python: { name: "python", version: "3.10.0", defaultCode: "print(\"Hello from Abecsa Python!\")" }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeProblem) {
      setUserCode(languageMap[selectedLang].defaultCode);
      setOutput("Console cleared. Ready to compile.");
    }
  }, [selectedLang, activeProblem]);

  const handlePlanSelection = (plan) => {
    const phoneNumber = "91XXXXXXXXXX"; // Your WhatsApp number
    const message = `Hello Abecsa Team! I would like to book the Mock Interview plan: ${plan.sessions} Session(s) for ₹${plan.price}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const runCode = async () => {
    setIsCompiling(true);
    setOutput("Compiling and Running...");
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: languageMap[selectedLang].name,
          version: languageMap[selectedLang].version,
          files: [{ content: userCode }],
        }),
      });
      const data = await response.json();
      if (data.run.stderr) {
        setOutput(`Error:\n${data.run.stderr}`);
      } else {
        setOutput(data.run.stdout || "Code executed successfully with no output.");
      }
    } catch (error) {
      setOutput("Execution Error: Could not connect to the compiler server.");
    } finally {
      setIsCompiling(false);
    }
  };

  const problems = [
    { id: 0, title: "Minimize the Heights II", tags: ["Greedy", "Arrays"], difficulty: "Medium", accuracy: "23.4%", desc: "Given an array arr[] denoting heights of N towers and a positive integer K, modify every tower by either increasing or decreasing its height by K only once." },
    { id: 1, title: "Kth Smallest Element", tags: ["Heaps", "Sorting"], difficulty: "Medium", accuracy: "35.1%", desc: "Given an array arr[] and an integer K where K is smaller than size of array, find the Kth smallest element." },
    { id: 2, title: "Trapping Rain Water", tags: ["Two Pointers", "Arrays"], difficulty: "Hard", accuracy: "42.1%", desc: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining." },
    { id: 3, title: "Detect Loop in Linked List", tags: ["Linked List", "Floyd's"], difficulty: "Easy", accuracy: "48.2%", desc: "Given a linked list, check if the linked list has a loop (cycle) or not." },
    { id: 4, title: "Parenthesis Checker", tags: ["Stacks", "Strings"], difficulty: "Easy", accuracy: "62.5%", desc: "Given an expression string, write a program to examine whether the pairs and the orders of '{', '}', '(', ')', '[', ']' are correct." },
    { id: 5, title: "Edit Distance", tags: ["DP", "Strings"], difficulty: "Hard", accuracy: "31.0%", desc: "Given two strings s1 and s2, find the minimum number of operations required to convert s1 to s2." },
    { id: 6, title: "Kadane's Algorithm", tags: ["Arrays", "Optimization"], difficulty: "Medium", accuracy: "12.0%", desc: "Find the contiguous sub-array (containing at least one number) which has the largest sum and return its sum." },
    { id: 7, title: "Mirror Tree", tags: ["Binary Tree"], difficulty: "Easy", accuracy: "55.8%", desc: "Given a Binary Tree, convert it into its mirror image." },
    { id: 8, title: "N-Queen Problem", tags: ["Backtracking"], difficulty: "Hard", accuracy: "15.2%", desc: "Place N queens on an NxN chessboard such that no two queens attack each other." },
    { id: 9, title: "Stock Buy and Sell", tags: ["Greedy", "Arrays"], difficulty: "Easy", accuracy: "39.5%", desc: "Find the maximum profit you can make by buying and selling a stock exactly once." },
    { id: 10, title: "Reverse a Linked List", tags: ["Linked List"], difficulty: "Easy", accuracy: "71.4%", desc: "Given the head of a singly linked list, reverse the list and return its head." }
  ];

  const navigateProblem = (direction) => {
    const nextId = activeProblem.id + direction;
    if (nextId >= 0 && nextId < problems.length) {
      setActiveProblem(problems[nextId]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-[#0B1120] text-slate-900 dark:text-white transition-colors duration-300 font-body">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <main className="flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1E293B] rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg text-white"><FaCode /></div>
                <h1 className="text-xl font-bold">Problem Practice</h1>
             </div>
             <button 
                onClick={() => setShowPricing(true)} 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
             >
                <FaCertificate /> Mock Interview (₹49)
             </button>
          </div>

          <div className="flex flex-col gap-4">
            {problems.map((problem) => (
              <div key={problem.id} className="bg-white dark:bg-[#1E293B] rounded-xl p-5 border border-gray-200 dark:border-gray-800 flex justify-between items-center group hover:border-blue-500 transition-all">
                <div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors">{problem.title}</h3>
                  <div className="flex gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-600' : problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>{problem.difficulty}</span>
                    {problem.tags.slice(0, 2).map(tag => <span key={tag} className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-500">{tag}</span>)}
                  </div>
                </div>
                <button onClick={() => setActiveProblem(problem)} className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">Solve</button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* --- FULL SCREEN COMPILER MODAL --- */}
      {activeProblem && (
        <div className="fixed inset-0 z-[100] bg-[#0B1120] flex flex-col overflow-hidden">
          <div className="bg-[#1E293B] text-white p-3 flex justify-between items-center border-b border-gray-800">
              <div className="flex items-center gap-4">
                  <button onClick={() => setActiveProblem(null)} className="text-gray-400 hover:text-white p-2"><FaTimes /></button>
                  <h2 className="font-bold text-sm">{activeProblem.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                  <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="bg-[#0B1120] text-xs border border-gray-700 rounded px-2 py-1.5 outline-none">
                      <option value="cpp">C++</option>
                      <option value="c">C</option>
                      <option value="java">Java</option>
                      <option value="python">Python</option>
                  </select>
                  <button onClick={runCode} disabled={isCompiling} className="bg-green-600 hover:bg-green-700 px-6 py-1.5 rounded font-bold text-xs flex items-center gap-2 disabled:opacity-50">
                      {isCompiling ? "Running..." : <><FaPlay /> Run Code</>}
                  </button>
              </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="w-full lg:w-[400px] flex flex-col overflow-hidden border-r border-gray-800 bg-gray-50 dark:bg-[#0B1120] relative">
                  <div className="flex-1 p-6 overflow-y-auto pb-24">
                      <h3 className="text-blue-500 font-bold text-xs uppercase mb-4 tracking-widest">Description</h3>
                      <p className="text-sm leading-relaxed mb-6">{activeProblem.desc}</p>
                      <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg">
                          <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Example Case</p>
                          <pre className="text-xs font-mono">Input: Sample Data{"\n"}Output: Expected Result</pre>
                      </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-4 bg-white dark:bg-[#0B1120] border-t border-gray-200 dark:border-gray-800 flex justify-between items-center gap-4">
                      <button disabled={activeProblem.id === 0} onClick={() => navigateProblem(-1)} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-red-500 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all disabled:opacity-30">
                          <FaChevronLeft /> Previous
                      </button>
                      <button disabled={activeProblem.id === problems.length - 1} onClick={() => navigateProblem(1)} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-green-500 text-green-500 text-xs font-bold hover:bg-green-500 hover:text-white transition-all disabled:opacity-30">
                          Next <FaChevronRight />
                      </button>
                  </div>
              </div>

              <div className="flex-1 flex flex-col bg-[#1E1E1E]">
                  <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} spellCheck="false" className="flex-1 w-full bg-[#1e1e1e] text-blue-300 font-mono p-8 outline-none resize-none text-sm leading-relaxed" />
                  <div className="h-48 bg-black border-t border-gray-800 p-0 flex flex-col">
                      <div className="bg-[#2D2D2D] px-4 py-1.5 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                          <FaTerminal className="text-blue-500"/> Console Output
                      </div>
                      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto text-green-400">
                          <pre>{output}</pre>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      )}

      {/* --- PRICING MODAL --- */}
      {showPricing && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white dark:bg-[#1E293B] w-full max-w-lg rounded-3xl p-8 relative shadow-2xl">
              <button onClick={() => setShowPricing(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"><FaTimes /></button>
              <h2 className="text-2xl font-black mb-2">Mock Interview <span className="text-blue-600">Plans</span></h2>
              <p className="text-sm text-gray-500 mb-8 font-medium">Earn a verified certificate after passing your interview.</p>
              <div className="space-y-4">
                 {[
                   { id: 1, sessions: 1, price: 49 },
                   { id: 2, sessions: 2, price: 99, popular: true },
                   { id: 3, sessions: 3, price: 149 }
                 ].map(plan => (
                   <div key={plan.id} onClick={() => handlePlanSelection(plan)} className={`p-5 rounded-2xl border-2 flex justify-between items-center cursor-pointer transition-all hover:scale-[1.02] ${plan.popular ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10' : 'border-gray-100 dark:border-gray-800 hover:border-blue-400'}`}>
                      <div>
                        <p className="font-bold text-lg">{plan.sessions} Session{plan.sessions > 1 ? 's' : ''}</p>
                        <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Includes Certificate</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900 dark:text-white">₹{plan.price}</p>
                        <button className="bg-blue-600 text-white text-[10px] px-5 py-1.5 rounded-full font-bold uppercase mt-1">Select Plan</button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LernWithAbecsa;