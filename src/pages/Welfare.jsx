import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaHandsHelping, FaHeart, FaLightbulb, FaUserGraduate, FaChevronDown, FaChevronUp, FaWhatsapp } from 'react-icons/fa';

const Welfare = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const programs = [
    {
      id: 1,
      title: "Scholarship Assistance",
      icon: <FaGraduationCap className="text-3xl text-blue-600 mb-2" />,
      description: "Financial aid and merit-based scholarships for deserving students.",
      details: "We provide guidance on various government and private scholarship programs. Our team assists with application processes, ensuring that eligible students can access funds for tuition, books, and other educational expenses."
    },
    {
      id: 2,
      title: "Mentorship Program",
      icon: <FaUserGraduate className="text-3xl text-green-600 mb-2" />,
      description: "Connecting students with industry professionals and alumni for career guidance.",
      details: "Our mentorship program pairs students with experienced professionals in their field of interest. Mentors provide career advice, resume reviews, and networking opportunities to help students transition smoothly into the workforce."
    },
    {
      id: 3,
      title: "Mental Health Support",
      icon: <FaHeart className="text-3xl text-red-500 mb-2" />,
      description: "Confidential counseling and wellness workshops to promote mental well-being.",
      details: "We offer access to certified counselors and regular workshops on stress management, mindfulness, and emotional resilience. Ensuring a healthy mind is paramount to academic and personal success."
    },
    {
        id: 4,
        title: "Skill Development",
        icon: <FaLightbulb className="text-3xl text-yellow-500 mb-2" />,
        description: "Hands-on workshops to enhance technical and soft skills.",
        details: "From coding bootcamps to communication skills seminars, our workshops are designed to bridge the gap between academic learning and industry requirements."
    }
  ];

  const handleWhatsAppRedirect = (message) => {
    const phoneNumber = "919407899216";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20 pb-8 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 mb-2">
            Student Welfare Initiatives
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            At ABECSA, we are committed to the holistic development and well-being of our coworkers and students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => handleWhatsAppRedirect(`Hi, I am interested in knowing more about the ${program.title} at ABECSA.`)}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:border-blue-500 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {program.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{program.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{program.description}</p>
                
                <div className="flex gap-2">
                     <button 
                        onClick={(e) => { e.stopPropagation(); toggleAccordion(program.id); }}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors focus:outline-none"
                        >
                        {activeAccordion === program.id ? (
                            <>Show Less <FaChevronUp className="ml-1" /></>
                        ) : (
                            <>Learn More <FaChevronDown className="ml-1" /></>
                        )}
                    </button>
                     <button 
                        onClick={(e) => { e.stopPropagation(); handleWhatsAppRedirect(`Hi, I am interested in knowing more about the ${program.title} at ABECSA.`); }}
                        className="flex items-center text-green-600 hover:text-green-800 text-sm font-semibold transition-colors focus:outline-none"
                         title="Inquire on WhatsApp"
                    >
                         <FaWhatsapp className="ml-1 text-lg" />
                    </button>
                </div>
               

                <AnimatePresence>
                  {activeAccordion === program.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden w-full text-left mt-3 border-t border-gray-100 pt-3"
                    >
                      <p className="text-gray-600 text-xs leading-relaxed mb-3">
                        {program.details}
                      </p>
                       <button 
                            onClick={(e) => { e.stopPropagation(); handleWhatsAppRedirect(`Hi, I would like to apply/inquire about the ${program.title}.`); }}
                            className="w-full py-1.5 rounded-lg bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaWhatsapp /> Inquire Now
                        </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center shadow-lg text-white max-w-4xl mx-auto"
        >
            <FaHandsHelping className="text-3xl text-white mx-auto mb-3" />
            <h2 className="text-xl md:text-2xl font-bold mb-3">Need Assistance?</h2>
            <p className="text-blue-50 mb-4 max-w-xl mx-auto text-sm">
                Our welfare team is always here to help. If you have any questions or need personalized support, don't hesitate to reach out.
            </p>
            <button 
                onClick={() => handleWhatsAppRedirect("Hello, I would like to contact the ABECSA Welfare Team regarding specific assistance.")}
                className="bg-white text-blue-700 font-bold py-2 px-6 rounded-full hover:bg-gray-50 transition-transform transform hover:scale-105 shadow-sm text-sm flex items-center gap-2 mx-auto"
            >
                <FaWhatsapp className="text-lg text-green-500" /> Contact Welfare Team
            </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Welfare;
