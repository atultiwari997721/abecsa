"use client";

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  {
    title: "Basic Website",
    price: "₹5,000",
    originalPrice: "₹7,000",
    description: "Perfect for personal portfolios and small businesses starting online.",
    features: [
      "Up to 5 Pages",
      "Mobile Responsive Design",
      "Contact Form Integration",
      "Basic SEO Optimization",
      "Social Media Links",
      "1 Month Free Support",
      "Domain & Hosting Setup"
    ],
    popular: false,
    turnaround: "5-7 days"
  },
  {
    title: "Business Pro",
    price: "₹15,000",
    originalPrice: "₹20,000",
    description: "Professional website solution for growing businesses with advanced features.",
    features: [
      "Up to 15 Pages",
      "Premium Custom Design",
      "Content Management System",
      "Advanced SEO & Analytics",
      "Social Media Integration",
      "Blog/News Section",
      "Contact Forms & Leads",
      "3 Months Free Support",
      "Performance Optimization"
    ],
    popular: true,
    turnaround: "10-14 days"
  },
  {
    title: "E-Commerce Store",
    price: "₹25,000",
    originalPrice: "₹35,000",
    description: "Complete online store with payment processing and inventory management.",
    features: [
      "Unlimited Products",
      "Secure Payment Gateway",
      "Shopping Cart & Checkout",
      "User Accounts & Dashboard",
      "Inventory Management",
      "Order Tracking System",
      "Email Marketing Integration",
      "Mobile App Ready",
      "6 Months Free Support",
      "Advanced Analytics"
    ],
    popular: false,
    turnaround: "14-21 days"
  },
  {
    title: "Custom Web Application",
    price: "Custom Pricing",
    description: "Tailored software solutions for complex business requirements.",
    features: [
      "Custom Architecture Design",
      "Scalable Database System",
      "API Integration & Development",
      "Real-time Features",
      "Admin Dashboard",
      "User Authentication",
      "Advanced Security",
      "Performance Monitoring",
      "1 Year Free Support",
      "Ongoing Maintenance"
    ],
    popular: false,
    turnaround: "30-60 days"
  }
];

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-8 pb-20 container">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 gradient-text">Our Services</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          We offer a wide range of software solutions tailored to meet your business needs. Transparent pricing, premium quality, and exceptional results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-panel p-8 flex flex-col hover:border-primary/50 transition-all relative ${
              service.popular ? 'border-primary/50 bg-primary/5' : ''
            }`}
          >
            {service.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-xs font-bold">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{service.price}</span>
                {service.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">{service.originalPrice}</span>
                )}
              </div>
              {service.turnaround && (
                <p className="text-xs text-gray-400 mt-1">Turnaround: {service.turnaround}</p>
              )}
            </div>

            <p className="text-gray-400 text-sm mb-6">{service.description}</p>

            <ul className="space-y-3 mb-8 flex-grow">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`btn w-full ${service.popular ? 'btn-primary' : 'btn-outline'}`}>
              {service.price === "Custom Pricing" ? "Contact Us" : "Get Started"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="mt-20 text-center">
        <div className="glass-panel p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Why Choose Abecsa?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-xl font-bold text-primary mb-3">Quality First</h3>
              <p className="text-gray-400">We don't compromise on quality. Every project undergoes rigorous testing and optimization.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-3">Transparent Pricing</h3>
              <p className="text-gray-400">No hidden fees or surprise costs. What we quote is what you pay.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-3">Ongoing Support</h3>
              <p className="text-gray-400">Free support included with all packages. We're here when you need us.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
