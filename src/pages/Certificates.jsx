
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes, FaWhatsapp, FaInfoCircle, FaCheck, FaBookOpen, FaTimesCircle, FaCertificate } from 'react-icons/fa';
import certificatesData from '../data/certificatesData';
import { supabase } from '../supabaseClient';
import CoursesFooter from '../components/CoursesFooter';

// Enrollment Modal Component (Reused logic from Courses, adapted for Certificates)
const EnrollmentForm = ({ course, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            course_name: course.title, // Keeping 'course_name' schema compatibility
            branch: course.branch,
            status: 'Pending',
            type: 'Certificate' // Tagging as Certificate for admin to know
        };

        try {
            // Using same table 'course_applications' to keep it simple for now
            const { error } = await supabase.from('course_applications').insert([payload]);
            if (error) throw error;
            alert("Certificate Application Submitted! We will contact you for the exam/process.");
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error submitting application: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[5000] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-[#111] w-full max-w-2xl rounded-2xl p-6 md:p-10 relative overflow-y-auto max-h-[90vh] border border-green-500/30 shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors text-2xl">
                    <FaTimesCircle />
                </button>
                
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2"><FaCertificate className="text-green-600"/> Certificate Enrollment</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Apply for: <span className="text-green-600 dark:text-green-400 font-bold">{course.title}</span></p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                                className="p-3 rounded-lg bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] outline-none focus:border-green-500 dark:focus:border-green-500 dark:text-white transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Contact Number</label>
                            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} 
                                className="p-3 rounded-lg bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] outline-none focus:border-green-500 dark:focus:border-green-500 dark:text-white transition-colors" />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                            className="p-3 rounded-lg bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] outline-none focus:border-green-500 dark:focus:border-green-500 dark:text-white transition-colors" />
                    </div>

                     <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Message (Optional)</label>
                        <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} 
                            className="p-3 rounded-lg bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] outline-none focus:border-green-500 dark:focus:border-green-500 dark:text-white transition-colors resize-none" placeholder="Any specific queries?" />
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg flex items-start gap-3 border border-green-100 dark:border-green-500/20 mt-2">
                        <FaInfoCircle className="text-green-500 mt-1 shrink-0" />
                        <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                            Complete the exam/assessment to receive your valid certificate. Suitable for job seekers and portfolio building.
                        </p>
                    </div>

                    <button disabled={loading} type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? "Submitting..." : "Proceed to Exam/Payment"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

// Course Details Modal
const CourseDetailsModal = ({ course, onClose, onEnroll }) => {
    if (!course) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-[4000] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 50 }}
                className="bg-white dark:bg-[#1E293B] w-full max-w-lg rounded-2xl p-6 relative shadow-2xl border border-gray-200 dark:border-gray-700"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"><FaTimes /></button>
                
                <h3 className="text-xl font-bold dark:text-white mb-1">{course.title}</h3>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 px-2 py-1 rounded inline-block mb-4">{course.branch}</span>
                
                <div className="mb-6 space-y-4">
                     <div className="bg-gray-50 dark:bg-[#0B1120] p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Description</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{course.fullDescription}</p>
                     </div>
                     <div className="flex gap-4">
                        <div className="flex-1 bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-800/30 text-center">
                            <span className="block text-xs font-bold text-green-600 uppercase">Duration</span>
                            <span className="text-sm font-bold dark:text-green-400">{course.duration}</span>
                        </div>
                        <div className="flex-1 bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-100 dark:border-yellow-800/30 text-center">
                            <span className="block text-xs font-bold text-yellow-600 uppercase">Exam Fee</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-red-500 line-through">{course.originalPrice}</span>
                                <span className="text-sm font-bold dark:text-yellow-400">{course.price}</span>
                            </div>
                        </div>
                     </div>
                </div>

                <button 
                    onClick={() => onEnroll(course)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-[1.02]"
                >
                    Get Certified Now
                </button>
            </motion.div>
        </div>
    );
};

const Certificates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [filteredCourses, setFilteredCourses] = useState(certificatesData);
  const [selectedCourse, setSelectedCourse] = useState(null); // For Details Modal
  const [enrollCourse, setEnrollCourse] = useState(null); // For Enrollment Form

  const branches = ['All', ...new Set(certificatesData.map(c => c.branch))];

  useEffect(() => {
    const results = certificatesData.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBranch = selectedBranch === 'All' || course.branch === selectedBranch;
        return matchesSearch && matchesBranch;
    });
    setFilteredCourses(results);
  }, [searchTerm, selectedBranch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] text-gray-900 dark:text-white pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2"><FaCertificate className="text-green-600"/> Valid Certificates</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Boost your resume with affordable, exam-based certifications starting from ₹49.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                 <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search certificates..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full md:w-64 rounded-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 outline-none focus:border-green-500 transition-colors"
                    />
                 </div>
                 <select 
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="px-4 py-2 rounded-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 outline-none cursor-pointer focus:border-green-500 transition-colors"
                 >
                    {branches.map(b => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                 </select>
            </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
                {filteredCourses.map((course) => (
                    <motion.div 
                        key={course.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all cursor-pointer group flex flex-col h-full hover:border-green-500/30"
                        onClick={() => setSelectedCourse(course)}
                    >
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                                    course.branch === 'CS/IT' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                    course.branch === 'Management' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                                    course.branch === 'Design' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' :
                                    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                                }`}>
                                    {course.branch}
                                </span>
                                <span className="text-gray-400 text-xs font-mono">{course.duration}</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">{course.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-3 mb-4 flex-1">{course.description}</p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-xs text-red-500 line-through">{course.originalPrice}</span>
                                    <span className="font-bold text-green-600 dark:text-green-400 text-lg">{course.price}</span>
                                </div>
                                <button className="text-gray-500 dark:text-gray-400 text-xs font-bold hover:text-green-600 transition-colors">Details</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {filteredCourses.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No certificates found matching your criteria.</p>
                <button 
                    onClick={() => { setSearchTerm(''); setSelectedBranch('All'); }}
                    className="mt-4 text-green-600 hover:underline"
                >
                    Clear Filters
                </button>
            </div>
        )}

      </div>

      <div className="mt-12">
        <CoursesFooter />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedCourse && (
            <CourseDetailsModal 
                course={selectedCourse} 
                onClose={() => setSelectedCourse(null)} 
                onEnroll={(c) => { setSelectedCourse(null); setEnrollCourse(c); }}
            />
        )}
      </AnimatePresence>
         
      <AnimatePresence>
        {enrollCourse && (
            <EnrollmentForm 
                course={enrollCourse} 
                onClose={() => setEnrollCourse(null)} 
            />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Certificates;
