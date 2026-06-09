import React, { useState, useEffect } from 'react';

export default function AITeacher({ message, isSpeaking }) {
  const [mouthOpen, setMouthOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (isSpeaking) {
      interval = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 150); // fast talking animation
    } else {
      setMouthOpen(false);
    }
    return () => clearInterval(interval);
  }, [isSpeaking]);

  if (!message) return null;

  return (
    <div className="teacher-container">
      <div className="teacher-bubble">
        {message}
      </div>
      <div className="teacher-avatar">
        {/* Simple SVG Robot Avatar */}
        <svg width="60" height="60" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" rx="10" fill="white" />
          {/* Eyes */}
          <circle cx="35" cy="45" r="8" fill="var(--blue)" />
          <circle cx="65" cy="45" r="8" fill="var(--blue)" />
          {/* Mouth */}
          <rect x="35" y="65" width="30" height={mouthOpen ? "15" : "4"} rx="2" fill="var(--primary)" style={{ transition: 'height 0.1s' }} />
          {/* Antenna */}
          <rect x="48" y="5" width="4" height="15" fill="white" />
          <circle cx="50" cy="5" r="5" fill="var(--accent)" />
        </svg>
      </div>
    </div>
  );
}
