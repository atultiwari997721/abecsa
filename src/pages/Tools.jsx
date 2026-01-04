import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import Tesseract from 'tesseract.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQrcode, FaCamera, FaWhatsapp, FaArrowLeft, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const Tools = () => {
  const [activeTab, setActiveTab] = useState(null); // 'qr' or 'ocr' or null
  const [scanResult, setScanResult] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  // Refs
  const qrScannerRef = useRef(null); // Instance of Html5Qrcode
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Cleanup on unmount or tab switch
  useEffect(() => {
    return () => {
      stopQrScanner();
      stopOcrStream();
    };
  }, [activeTab]);

  // --- QR Scanner Logic ---

  const startQrScanner = async () => {
    setScanResult(null);
    setCameraError(null);
    setIsCameraActive(true);

    // Wait for DOM element to exist
    await new Promise(r => setTimeout(r, 100));

    try {
        const html5QrCode = new Html5Qrcode("qr-reader");
        qrScannerRef.current = html5QrCode;

        await html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1
            },
            (decodedText, decodedResult) => {
                // Success callback
                handleQrSuccess(decodedText);
                stopQrScanner(); // Stop automatically on success
            },
            (errorMessage) => {
                // Ignore parse errors, scanning in progress
            }
        ).catch(err => {
            console.error("Error starting QR scanner", err);
            setCameraError("Could not access camera. Please allow permissions.");
            setIsCameraActive(false);
        });
    } catch (err) {
         setCameraError("Camera initialization failed.");
         setIsCameraActive(false);
    }
  };

  const stopQrScanner = async () => {
      if (qrScannerRef.current && qrScannerRef.current.isScanning) {
          try {
              await qrScannerRef.current.stop();
              qrScannerRef.current.clear();
          } catch (err) {
              console.error("Failed to stop QR scanner", err);
          }
      }
      setIsCameraActive(false);
  };

  const handleQrSuccess = (text) => {
    const cleaned = text.replace(/[^0-9+]/g, '');
    
    if (text.includes("wa.me") || text.includes("whatsapp.com")) {
         window.location.href = text;
         return;
    }

    // Try to find a phone number in the text
    const phoneMatch = text.match(/(\+?(\d{1,4})[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,15}/);
    
    if (phoneMatch) {
         let number = phoneMatch[0].replace(/[^0-9]/g, '');
         redirectToWhatsapp(number);
    } else {
        setScanResult({ type: 'text', value: text });
    }
  };

  // --- OCR Scanner Logic ---

  const startOcrCamera = async () => {
      setOcrText('');
      setScanResult(null);
      setCameraError(null);
      setIsProcessing(false);
      setIsCameraActive(true);

      try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
          
          if (videoRef.current) {
              videoRef.current.srcObject = stream;
              // Crucial: wait for video to play
              videoRef.current.onloadedmetadata = () => {
                  videoRef.current.play().catch(e => console.error("Play error", e));
              };
          }
      } catch (err) {
          console.error("OCR Camera Error:", err);
          setCameraError("Camera access denied. Please check permissions and try again.");
          setIsCameraActive(false);
      }
  };

  const stopOcrStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const captureAndScan = async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      setIsProcessing(true);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Ensure dimensions match
      if (video.videoWidth === 0 || video.videoHeight === 0) {
          setCameraError("Camera not ready.");
          setIsProcessing(false);
          return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Pre-process image (grayscale high contrast could help, but kept simple for now)
      const imageMap = canvas.toDataURL('image/png');
      
      try {
          const { data: { text } } = await Tesseract.recognize(imageMap, 'eng', {
            // logger: m => console.log(m) 
          });
          
          setOcrText(text);
          processOcrText(text);
      } catch (err) {
          console.error("Tesseract Error:", err);
          setOcrText("Failed to recognize text.");
      } finally {
          setIsProcessing(false);
      }
  };

  const processOcrText = (text) => {
      // Robust number extraction
      const rawText = text.replace(/[\s-]/g, '');
      // Look for sequences of 7 to 15 digits
      const numberMatches = rawText.match(/\d{7,15}/g);

      if (numberMatches && numberMatches.length > 0) {
          // Take the longest match which is likely the phone number
          const bestMatch = numberMatches.reduce((a, b) => a.length > b.length ? a : b);
          setScanResult({ type: 'ocr_success', value: bestMatch });
      } else {
          setScanResult({ type: 'ocr_fail', value: null });
      }
  };

  const redirectToWhatsapp = (number) => {
    if (number.length === 10) {
        number = "91" + number;
    }
    const url = `https://wa.me/${number}`;
    setScanResult({ type: 'whatsapp', value: url, original: number });
    window.location.href = url;
  };

  return (
    <div style={{ 
        minHeight: '100vh', 
        paddingTop: '80px', 
        background: 'var(--bg-color)', 
        color: 'var(--text-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '2rem'
    }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '1rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
            <span style={{ color: 'var(--primary-color)' }}>Smart</span> Tools
        </h1>

        {!activeTab && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveTab('qr'); setTimeout(startQrScanner, 100); }}
                    style={{
                        padding: '3rem 2rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        color: 'inherit'
                    }}
                >
                    <div style={{ padding: '1.5rem', background: 'rgba(0, 243, 255, 0.1)', borderRadius: '50%', color: '#00F3FF' }}>
                        <FaQrcode size={40} />
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Scan QR Code</span>
                    <span style={{ opacity: 0.7, fontSize: '0.9rem' }}>Redirect to WhatsApp automatically</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveTab('ocr'); startOcrCamera(); }}
                    style={{
                        padding: '3rem 2rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        color: 'inherit'
                    }}
                >
                    <div style={{ padding: '1.5rem', background: 'rgba(188, 19, 254, 0.1)', borderRadius: '50%', color: '#bc13fe' }}>
                        <FaCamera size={40} />
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Scan Printed Number</span>
                    <span style={{ opacity: 0.7, fontSize: '0.9rem' }}>Extract digits (OCR)</span>
                </motion.button>
            </div>
        )}

        {/* --- QR UI --- */}
        {activeTab === 'qr' && (
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <button 
                    onClick={() => setActiveTab(null)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer', marginBottom: '1rem' }}
                >
                    <FaArrowLeft /> Back to Tools
                </button>
                
                <div style={{ background: '#000', padding: '0', borderRadius: '12px', overflow: 'hidden', minHeight: '300px', position: 'relative' }}>
                    <div id="qr-reader" style={{ width: '100%', height: '100%' }}></div>
                    
                    {/* Overlay Guides */}
                    {isCameraActive && !cameraError && (
                        <div style={{ 
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                            pointerEvents: 'none',
                            border: '50px solid rgba(0,0,0,0.5)',
                            boxSizing: 'border-box'
                        }} />
                    )}

                    {cameraError && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#ff4444' }}>
                            <FaExclamationTriangle size={30} style={{ marginBottom: '1rem' }} />
                            <p>{cameraError}</p>
                            <button 
                                onClick={startQrScanner}
                                style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#333', color: 'white', border: 'none', borderRadius: '5px' }}
                            >Retry</button>
                        </div>
                    )}
                </div>

                <p style={{ textAlign: 'center', marginTop: '1rem', opacity: 0.6 }}>Point camera at a WhatsApp QR Code</p>

                {scanResult && scanResult.type === 'text' && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                        <p>Scanned: {scanResult.value}</p>
                    </div>
                )}
            </div>
        )}

        {/* --- OCR UI --- */}
        {activeTab === 'ocr' && (
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <button 
                    onClick={() => setActiveTab(null)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer', marginBottom: '1rem' }}
                >
                    <FaArrowLeft /> Back to Tools
                </button>

                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: '#000', minHeight: '350px' }}>
                     {!isCameraActive && !cameraError && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
                             <FaSpinner className="spin" size={30} />
                        </div>
                     )}

                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        style={{ width: '100%', height: '350px', objectFit: 'cover', display: isCameraActive ? 'block' : 'none' }} 
                    />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    
                    {cameraError && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                            <FaExclamationTriangle size={40} color="#ff4444" style={{ marginBottom: '1rem' }} />
                            <p style={{ marginBottom: '1rem' }}>{cameraError}</p>
                            <button 
                                onClick={startOcrCamera}
                                style={{ padding: '0.8rem 1.5rem', background: 'var(--primary-color)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}
                            >
                                Grant Camera Access
                            </button>
                        </div>
                    )}

                    {!cameraError && isCameraActive && (
                        <div style={{ 
                            position: 'absolute', bottom: '20px', left: '0', width: '100%', 
                            display: 'flex', justifyContent: 'center', alignItems: 'center' 
                        }}>
                            <button
                                onClick={captureAndScan}
                                disabled={isProcessing}
                                style={{
                                    width: '70px', height: '70px', borderRadius: '50%',
                                    background: 'white', border: '4px solid rgba(0,0,0,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                                }}
                            >
                                {isProcessing ? <FaSpinner className="spin" size={24} color="#000" /> : <div style={{ width: '50px', height: '50px',  borderRadius: '50%', border: '2px solid #000' }} />}
                            </button>
                        </div>
                    )}
                </div>

                <p style={{ textAlign: 'center', marginTop: '1rem', opacity: 0.6 }}>Align phone number within the frame and tap capture</p>
                
                {scanResult && scanResult.type === 'ocr_success' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(0, 243, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(0, 243, 255, 0.3)' }}
                    >
                        <p style={{ marginBottom: '0.5rem', opacity: 0.8 }}>Found Number:</p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{scanResult.value}</h2>
                        
                        <button
                            onClick={() => redirectToWhatsapp(scanResult.value)}
                            style={{
                                width: '100%', padding: '1rem', background: '#25D366', color: 'white',
                                border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer'
                            }}
                        >
                            <FaWhatsapp size={24} /> Chat on WhatsApp
                        </button>
                    </motion.div>
                )}

                 {scanResult && scanResult.type === 'ocr_fail' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem', textAlign: 'center', color: '#ff8888', background: 'rgba(255,0,0,0.1)', borderRadius: '8px', marginTop: '1rem' }}>
                        No valid number found in the captured image.
                    </motion.div>
                )}
            </div>
        )}

      </div>
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Tools;
