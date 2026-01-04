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


  // Initialize Worker on Mount
  useEffect(() => {
      const initWorker = async () => {
          console.log("Initializing Tesseract Worker...");
          const worker = await Tesseract.createWorker('eng');
          
          // Pre-configure specific parameters for numbers
          await worker.setParameters({
             // tessedit_char_whitelist: '0123456789+ ', // REMOVED: Bad for accuracy. Let post-processing handle 'S'->'5' etc.
             tessedit_pageseg_mode: '7', // Single line
          });
          
          workerRef.current = worker;
          console.log("Tesseract Worker Ready");
      };
      
      initWorker();
      
      return () => {
          if (workerRef.current) {
              workerRef.current.terminate(); 
          }
      };
  }, []);

  // --- QR Scanner Logic ---

  // Handle Tab Switching & Auto-Start
  useEffect(() => {
    // 1. Cleanup previous scanners
    stopQrScanner();
    stopOcrStream();
    setScanResult(null);
    setCameraError(null);
    setIsProcessing(false);

    // 2. Start new scanner if tab selected
    if (activeTab === 'qr') {
        const timeout = setTimeout(() => {
            startQrScanner();
        }, 300); // Give DOM a moment to render #qr-reader
        return () => clearTimeout(timeout);
    } 
    
    if (activeTab === 'ocr') {
        startOcrCamera();
    }
  }, [activeTab]);

  // --- QR Scanner Logic ---

  const startQrScanner = async () => {
    try {
        const readerElement = document.getElementById("qr-reader");
        if (!readerElement) {
            console.error("QR Reader element not found in DOM");
            setCameraError("Scanner initialization failed (DOM Error). Please try again.");
            return;
        }

        const html5QrCode = new Html5Qrcode("qr-reader");
        qrScannerRef.current = html5QrCode;

        setIsCameraActive(true);

        await html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1
            },
            (decodedText, decodedResult) => {
                handleQrSuccess(decodedText);
                stopQrScanner();
            },
            (errorMessage) => {
                // Ignore parse errors
            }
        );
    } catch (err) {
         console.error("QR Init Error:", err);
         setCameraError("Could not access camera. Please allow permissions.");
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
    let extractedNumber = '';

    // 1. Check for URL-based WhatsApp links
    if (text.includes("wa.me") || text.includes("whatsapp.com")) {
         // Extract numeric part if present
         const digitMatch = text.match(/\d{7,15}/);
         if (digitMatch) {
             extractedNumber = digitMatch[0];
         } else {
             // It's a non-numeric link (e.g., contact card), just redirect
             window.location.href = text;
             return;
         }
    } else {
        // 2. Parsed raw text
        // Try to find a phone number
        const cleaned = text.replace(/[^0-9]/g, '');
        if (cleaned.length >= 10 && cleaned.length <= 15) {
            extractedNumber = cleaned;
        } else {
             // Try strict regex for text with formatting
             const phoneMatch = text.match(/(\+?(\d{1,4})[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,15}/);
             if (phoneMatch) {
                 extractedNumber = phoneMatch[0].replace(/[^0-9]/g, '');
             }
        }
    }
    
    // 3. Final decision
    if (extractedNumber && extractedNumber.length >= 10) {
         setEditableNumber(extractedNumber);
         setScanResult({ type: 'success', value: extractedNumber }); // Unified success type
         stopQrScanner();
    } else {
        // NEW: Check for generic URL
        const urlRegex = /^(https?:\/\/[^\s]+)/;
        if (urlRegex.test(text)) {
            setScanResult({ type: 'url', value: text });
        } else {
            setScanResult({ type: 'text', value: text });
        }
        stopQrScanner();
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

  // CV: Hybrid Filter (Contrast + Thicken in one go)
  // Optimized for speed
  const applyHybridProcessing = (ctx, w, h) => {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      
      // 1. High Contrast Pass
      // Calculate avg brightness
      let sum = 0;
      for (let i = 0; i < data.length; i += 4) {
          sum += (data[i] + data[i+1] + data[i+2]) / 3;
      }
      const avg = sum / (data.length / 4);
      const threshold = avg * 0.75; // Aggressive threshold

      for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i+1] + data[i+2]) / 3;
          const val = (brightness < threshold) ? 0 : 255;
          data[i] = data[i+1] = data[i+2] = val;
      }
      
      // 2. Simple Morphological Erosion (Thickening) - Inline for speed
      // Only horizontal thickening is often enough for digits and faster
      const copy = new Uint8ClampedArray(data);
      for (let y = 0; y < h; y++) {
          for (let x = 1; x < w - 1; x++) {
              const idx = (y * w + x) * 4;
              if (copy[idx] === 255) { // If white
                  // Check neighbors. If neighbor is black (0), become black
                  if (copy[idx - 4] === 0 || copy[idx + 4] === 0) {
                      data[idx] = data[idx+1] = data[idx+2] = 0;
                  }
              }
          }
      }
      
      ctx.putImageData(imgData, 0, 0);
  };

  const captureAndScan = async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      // Check if worker is ready
      if (!workerRef.current) {
          setOcrText("Starting AI Engine...");
          return;
      }
      
      setIsProcessing(true);
      setScanResult(null); 
      setOcrText("Scanning..."); 
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (video.videoWidth === 0) {
          setIsProcessing(false);
          return;
      }

      // --- ROI Calculation ---
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const roiWidth = vw * 0.85; 
      const roiHeight = vh * 0.15;
      const roiX = (vw - roiWidth) / 2;
      const roiY = (vh - roiHeight) / 2;

      // 1. Snapshot for UI
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const feedbackEl = document.getElementById('ocr-snapshot');
      if (feedbackEl) {
          feedbackEl.src = canvas.toDataURL('image/png');
          feedbackEl.style.display = 'block';
          feedbackEl.style.opacity = 0.5;
      }

      let bestNumber = null;

      // ============================================
      // STAGE 1: HIGH SPEED (Optimized for standard text)
      // ============================================
      try {
          // Resize for speed (800px width cap)
          const MAX_WIDTH = 800;
          let targetWidth = roiWidth;
          let targetHeight = roiHeight;
          if (targetWidth > MAX_WIDTH) {
              const ratio = MAX_WIDTH / targetWidth;
              targetWidth = MAX_WIDTH;
              targetHeight = targetHeight * ratio;
          }
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          context.drawImage(video, roiX, roiY, roiWidth, roiHeight, 0, 0, targetWidth, targetHeight);
          
          // Apply Contrast/Hybrid Filter
          applyHybridProcessing(context, targetWidth, targetHeight);
          
          const speedUrl = canvas.toDataURL('image/png');
          const { data: { text, confidence } } = await workerRef.current.recognize(speedUrl);
          
          const num = extractNumber(text);
          if (num && confidence > 70) {
              bestNumber = num;
              console.log("Stage 1 (Speed) Success:", num);
          }
      } catch (e) { console.error("Stage 1 Error", e); }


      // ============================================
      // STAGE 2: FAILSAFE (Raw Accuracy)
      // Only runs if Stage 1 failed.
      // ============================================
      if (!bestNumber) {
          console.log("Stage 1 failed, trying Stage 2 (Raw Accuracy)...");
          try {
              // Use RAW ROI (No resize, or minimal resize for huge cameras)
              // We restart with the raw video data
              canvas.width = roiWidth;
              canvas.height = roiHeight;
              context.drawImage(video, roiX, roiY, roiWidth, roiHeight, 0, 0, roiWidth, roiHeight);
              
              // NO FILTERS - Just raw image (sometimes filters destroy data)
              const rawUrl = canvas.toDataURL('image/png');
              const { data: { text } } = await workerRef.current.recognize(rawUrl);
              
              const num = extractNumber(text);
              if (num) {
                  bestNumber = num;
                  console.log("Stage 2 (Raw) Success:", num);
              }
          } catch (e) { console.error("Stage 2 Error", e); }
      }

      // Result Handling
      if (bestNumber) {
           setEditableNumber(bestNumber);
           setScanResult({ type: 'success', value: bestNumber });
           setOcrText("Success!");
      } else {
           setOcrText("Try again");
           setScanResult({ type: 'ocr_fail', value: null, raw: "Could not read number." });
      }

      setIsProcessing(false);
      if (feedbackEl) feedbackEl.style.display = 'none';
  };
  
  // Helper to extract number (Refined for ROI - cleaner input expected)
  const extractNumber = (text) => {
      let clean = text.replace(/O/g, '0').replace(/o/g, '0').replace(/I/g, '1')
                      .replace(/l/g, '1').replace(/S/g, '5').replace(/B/g, '8').replace(/Z/g, '2');
      const digits = clean.replace(/\D/g, '');
      const match = digits.match(/\d{10,15}/);
      return match ? match[0] : null;
  };

  // State for editable result
  const [editableNumber, setEditableNumber] = useState('');

  // ... (startQrScanner, etc remain same)



  const redirectToWhatsapp = (number) => {
    let finalNumber = number.replace(/[^0-9]/g, '');
    if (finalNumber.length === 10) {
        finalNumber = "91" + finalNumber;
    }
    const url = `https://wa.me/${finalNumber}`;
    // setScanResult not strictly needed here as we redirect
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
                    onClick={() => setActiveTab('qr')}
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
                    onClick={() => setActiveTab('ocr')}
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

                {scanResult && scanResult.type === 'url' && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(0, 243, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(0, 243, 255, 0.3)' }}
                    >
                        <p style={{ marginBottom: '0.5rem', opacity: 0.8 }}>Web Link Found:</p>
                        <p style={{ fontWeight: 'bold', marginBottom: '1rem', wordBreak: 'break-all' }}>{scanResult.value}</p>
                        
                        <a
                            href={scanResult.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                width: '100%', padding: '1rem', background: 'var(--primary-color)', color: '#000',
                                border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', textDecoration: 'none'
                            }}
                        >
                             Open Link ↗
                        </a>
                    </motion.div>
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
                    
                    {/* Visual Focus Grid / Strip */}
                    {isCameraActive && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                            {/* Darkened Overlay */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)' }}></div>
                            
                            {/* Clear Strip (The ROI) */}
                            {/* ROI is approx 80% width, 15% height, Centered */}
                            <div style={{
                                position: 'absolute',
                                top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80%', height: '15%',
                                border: '2px solid #00F3FF',
                                borderRadius: '8px',
                                boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
                                background: 'transparent',
                                zIndex: 5
                            }}>
                                <span style={{ position: 'absolute', top: '-25px', left: '0', width: '100%', textAlign: 'center', color: '#00F3FF', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    PLACE NUMBER IN BOX
                                </span>
                            </div>
                        </div>
                    )}

                    <img id="ocr-snapshot" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'none', border: '4px solid #fff', boxSizing: 'border-box', zIndex: 10 }} />
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
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            zIndex: 20
                        }}>
                            <button
                                onClick={captureAndScan}
                                disabled={isProcessing}
                                style={{
                                    width: '80px', height: '80px', borderRadius: '50%',
                                    background: isProcessing ? 'var(--primary-color)' : 'white', 
                                    border: '4px solid rgba(0,0,0,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: isProcessing ? 'wait' : 'pointer',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {isProcessing ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <FaSpinner className="spin" size={24} color="#000" />
                                        <span style={{ fontSize: '10px', color: '#000', fontWeight: 'bold' }}>AI...</span>
                                    </div>
                                ) : (
                                    <div style={{ width: '60px', height: '60px',  borderRadius: '50%', border: '2px solid #000' }} />
                                )}
                            </button>
                        </div>
                    )}
                </div>

                <p style={{ textAlign: 'center', marginTop: '1rem', opacity: 0.6 }}>Align phone number within the frame and tap capture</p>
                
                 {(scanResult && scanResult.type === 'success') && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(0, 243, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(0, 243, 255, 0.3)' }}
                    >
                        <p style={{ marginBottom: '0.5rem', opacity: 0.8 }}>Confirm Number:</p>
                        
                        <input 
                            type="text" 
                            value={editableNumber}
                            onChange={(e) => setEditableNumber(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid #444',
                                borderRadius: '8px',
                                color: '#fff',
                                textAlign: 'center'
                            }}
                        />
                        
                        <button
                            onClick={() => redirectToWhatsapp(editableNumber)}
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
                        <p style={{ fontWeight: 'bold' }}>No valid number found.</p>
                        {scanResult.raw && (
                             <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#888', background: '#111', padding: '0.5rem', borderRadius: '4px' }}>
                                 <strong>Detected Text:</strong><br/>
                                 "{scanResult.raw}"
                             </div>
                        )}
                        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Try moving closer or ensuring good lighting.</p>
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
