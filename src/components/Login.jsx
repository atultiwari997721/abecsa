import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

import { mockUsers } from '../data/mockUsers';

const AnimatedBackground = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      // Gentle rotation
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[2, 0, -2]}>
          <MeshDistortMaterial
            color="#2b7de9"
            attach="material"
            distort={0.4} // Strength, 0 disables the effect (default=1)
            speed={2} // Speed (default=1)
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <Sphere args={[0.5, 32, 32]} position={[-3, 1.5, -3]}>
           <MeshDistortMaterial
            color="#e93e3a"
            attach="material"
            distort={0.3}
            speed={3}
            roughness={0.2}
            metalness={0.6}
            opacity={0.8}
            transparent
          />
        </Sphere>
      </Float>
      
       <Float speed={2.5} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[0.8, 32, 32]} position={[-2, -2, -1]}>
           <MeshDistortMaterial
            color="#f5b700"
            attach="material"
            distort={0.5}
            speed={1.5}
            roughness={0.2}
            metalness={0.9}
          />
        </Sphere>
      </Float>
    </>
  );
};

const Login = () => {
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Initialize Admins (First run logic)
    const storedAdmins = localStorage.getItem('abecsa_admins');
    let adminsList = [];
    if (!storedAdmins) {
      const defaultAdmin = { userId: 'admin', password: 'admin123', name: 'System Admin', role: 'admin' };
      adminsList = [defaultAdmin];
      localStorage.setItem('abecsa_admins', JSON.stringify(adminsList));
    } else {
      adminsList = JSON.parse(storedAdmins);
    }

    // 2. Check for Admin Login
    const adminUser = adminsList.find(a => a.userId === formData.userId && a.password === formData.password);
    if (adminUser) {
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      navigate('/admin');
      return;
    }
    
    // 3. Check for Marketing Manager Login
    const storedManagers = localStorage.getItem('abecsa_managers');
    let managers = [];
    if (storedManagers) {
        managers = JSON.parse(storedManagers);
        const managerUser = managers.find(m => m.userId === formData.userId && m.password === formData.password);
        if (managerUser) {
            localStorage.setItem('currentUser', JSON.stringify(managerUser));
            navigate('/manager-dashboard');
            return;
        }
    }

    // 4. Check for Manager's Customer Login (Nested Search)
    if (managers.length > 0) {
        for (const manager of managers) {
            if (manager.websitesSold) {
                const foundCustomer = manager.websitesSold.find(site => site.loginId === formData.userId && site.password === formData.password);
                if (foundCustomer) {
                    const customerUser = {
                        ...foundCustomer,
                        name: foundCustomer.customerName || 'Customer',
                        role: 'customer',
                        websites: [foundCustomer] // Format for Dashboard compatibility
                    };
                    localStorage.setItem('currentUser', JSON.stringify(customerUser));
                    navigate('/dashboard');
                    return;
                }
            }
        }
    }

    // 5. Check for Direct Customer (Legacy/Mock)
    let directCustomers = [];
    const storedDirect = localStorage.getItem('abecsa_direct_customers');
    if (storedDirect) {
        directCustomers = JSON.parse(storedDirect);
    } else {
        // Seed from mockUsers if not found
        directCustomers = mockUsers.filter(u => u.role === 'customer');
        localStorage.setItem('abecsa_direct_customers', JSON.stringify(directCustomers));
    }

    const directUser = directCustomers.find(u => u.userId === formData.userId && u.password === formData.password);
    if (directUser) {
        localStorage.setItem('currentUser', JSON.stringify(directUser));
        navigate('/dashboard');
        return;
    }

    // Login Fail
    alert('Invalid User ID or Password');
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* 3D Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#050505' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <AnimatedBackground />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none' // Allow clicking through to 3D orbit controls if needed, but we need form interaction
      }}>
        
        {/* Back Button */}
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate('/')}
            style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '0.8rem 1.2rem',
                borderRadius: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                pointerEvents: 'auto',
                backdropFilter: 'blur(5px)'
            }}
        >
            <FaArrowLeft /> Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '3.5rem',
            borderRadius: '25px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 15px 35px 0 rgba(0, 0, 0, 0.4)',
            pointerEvents: 'auto', // Re-enable pointer events for the form
            margin: '1rem' // For mobile spacing
          }}
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ 
              textAlign: 'center', 
              color: '#fff', 
              marginBottom: '2.5rem',
              fontSize: '2.2rem',
              fontWeight: 700,
              textShadow: '0 0 10px rgba(43, 125, 233, 0.5)'
            }}>
            Welcome Back
          </motion.h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                style={{ position: 'relative' }}
            >
              <FaUser style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '15px', 
                transform: 'translateY(-50%)', 
                color: '#aaa',
                zIndex: 10
              }} />
              <input
                type="text"
                name="userId"
                placeholder="User ID"
                value={formData.userId}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 45px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                style={{ position: 'relative' }}
            >
              <FaLock style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '15px', 
                transform: 'translateY(-50%)', 
                color: '#aaa',
                zIndex: 10
              }} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 45px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </motion.div>

            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(43, 125, 233, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                background: 'linear-gradient(45deg, #2b7de9, #4caf50)',
                color: '#fff',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Sign In
            </motion.button>
          </form>
          
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
             style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888', fontSize: '0.9rem' }}
          >
            Forgot Password? <span style={{ color: '#2b7de9', cursor: 'pointer' }}>Reset here</span>
          </motion.p>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
