import React, { useState, useRef, useEffect } from 'react';

const MORSE_MAP = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----'
};

const REVERSE_MAP = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

const MobileMorseStudio = () => {
  const [buffer, setBuffer] = useState(""); 
  const [output, setOutput] = useState(""); 
  const [isPressing, setIsPressing] = useState(false);
  const [activeLetter, setActiveLetter] = useState("");

  const startTime = useRef(null);
  const timeout = useRef(null);

  useEffect(() => {
    setActiveLetter(REVERSE_MAP[buffer] || (buffer ? "?" : ""));
  }, [buffer]);

  const handlePressStart = (e) => {
    e.preventDefault(); // Prevents zoom/scrolling on mobile
    setIsPressing(true);
    startTime.current = Date.now();
    if (timeout.current) clearTimeout(timeout.current);
  };

  const handlePressEnd = () => {
    if (!isPressing) return;
    setIsPressing(false);
    
    const duration = Date.now() - startTime.current;
    const newSymbol = duration < 200 ? "." : "-";
    setBuffer(prev => prev + newSymbol);
    
    timeout.current = setTimeout(() => {
      setBuffer(currentBuffer => {
        if (currentBuffer) {
          const finalChar = REVERSE_MAP[currentBuffer] || "";
          setOutput(prev => prev + finalChar);
        }
        return "";
      });
    }, 700);
  };

  const resetAll = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setBuffer("");
    setOutput("");
    setActiveLetter("");
  };

  return (
    <div style={{ 
      maxWidth: '500px', margin: 'auto', padding: '15px', 
      fontFamily: 'monospace', boxSizing: 'border-box' 
    }}>
      
      {/* Display Section */}
      <div style={{ 
        textAlign: 'center', background: '#111', color: '#0f0', 
        padding: '20px', borderRadius: '15px', marginBottom: '20px' 
      }}>
        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>BUFFER: {buffer || "_"}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '5px 0' }}>
          CURRENT: {activeLetter || "---"}
        </div>
        
        <div style={{ 
          fontSize: '2.5rem', background: '#000', padding: '15px', 
          borderRadius: '8px', minHeight: '1.2em', wordBreak: 'break-all',
          border: '1px solid #333', marginTop: '10px'
        }}>
          {output || "START"}
        </div>
      </div>

      {/* BIG MOBILE BUTTON */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          style={{
            width: '100%',
            height: '120px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: isPressing ? '#222' : '#3498db',
            color: 'white',
            boxShadow: isPressing ? 'none' : '0 8px #2980b9',
            transform: isPressing ? 'translateY(4px)' : 'none',
            transition: '0.1s',
            userSelect: 'none',
            touchAction: 'none'
          }}
        >
          {isPressing ? 'RELEASE' : 'TAP / HOLD'}
        </button>
        
        <button onClick={resetAll} style={{
          marginTop: '25px', width: '100%', padding: '12px',
          background: 'transparent', border: '1px solid #ff4444',
          color: '#ff4444', borderRadius: '8px', fontWeight: 'bold'
        }}>
          RESET SYSTEM
        </button>
      </div>

      {/* RESPONSIVE REFERENCE GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '8px',
        fontSize: '0.8rem'
      }}>
        {Object.entries(MORSE_MAP).map(([char, code]) => (
          <div key={char} style={{ 
            background: '#fff', border: '1px solid #eee', 
            padding: '8px 2px', textAlign: 'center', borderRadius: '5px' 
          }}>
            <div style={{ fontWeight: 'bold' }}>{char}</div>
            <div style={{ color: '#3498db', fontSize: '0.7rem' }}>{code}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMorseStudio;