import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CoursesFooter = () => {
  return (
    <footer className="bg-white dark:bg-[#0B1120] border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 text-gray-600 dark:text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Branding */}
            <div className="col-span-1 md:col-span-1">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">ABECSA<span className="text-blue-600">Courses</span></h2>
                <p className="mb-6 leading-relaxed">
                    Empowering students with industry-relevant skills and certifications. Join our community of learners today.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="text-gray-400 hover:text-blue-600 text-xl transition-colors"><FaFacebook /></a>
                    <a href="#" className="text-gray-400 hover:text-pink-600 text-xl transition-colors"><FaInstagram /></a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 text-xl transition-colors"><FaTwitter /></a>
                    <a href="#" className="text-gray-400 hover:text-blue-700 text-xl transition-colors"><FaLinkedin /></a>
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white uppercase mb-4 tracking-wider text-xs">Explore</h3>
                <ul className="space-y-2">
                    <li><Link to="/courses" className="hover:text-blue-600 transition-colors">All Courses</Link></li>
                    <li><button onClick={() => window.scrollTo(0,0)} className="hover:text-blue-600 transition-colors text-left">Top Rated</button></li>
                    <li><Link to="/internship" className="hover:text-blue-600 transition-colors">Internships</Link></li>
                    <li><Link to="/welfare" className="hover:text-blue-600 transition-colors">Welfare</Link></li>
                </ul>
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white uppercase mb-4 tracking-wider text-xs">Categories</h3>
                <ul className="space-y-2">
                    <li><button className="hover:text-blue-600 transition-colors">Computer Science</button></li>
                    <li><button className="hover:text-blue-600 transition-colors">Management</button></li>
                    <li><button className="hover:text-blue-600 transition-colors">Civil Engineering</button></li>
                    <li><button className="hover:text-blue-600 transition-colors">Electrical</button></li>
                </ul>
            </div>

            {/* Contact */}
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white uppercase mb-4 tracking-wider text-xs">Contact</h3>
                <ul className="space-y-2">
                    <li>Email: <a href="mailto:abecsa.in@gmail.com" className="text-blue-600 hover:underline">abecsa.in@gmail.com</a></li>
                    <li>Helpline: +91 94078 99216</li>
                    <li>Address: ABECSA Headquarters, Vijay Nagar, Indore, Madhya Pradesh, India</li>
                    <li>Address: ABECSA Headquarters, Jabalpur, Madhya Pradesh, India</li>
                    <li>Address: ABECSA Branch, Bhopal , Madhya Pradesh, India</li>
                </ul>
            </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} ABECSA Courses. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default CoursesFooter;

