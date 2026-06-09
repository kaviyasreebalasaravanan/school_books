import React, { useState } from 'react';
import { LESSONS } from '../data/lessonsData';

export default function Dashboard({ onSelectLesson }) {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '40px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌟</div>
        <h1 style={{ fontSize: '48px', color: '#FF6B6B', fontFamily: 'Fredoka, sans-serif', marginBottom: '8px' }}>
          MathVerse Learning Hub
        </h1>
        <p style={{ fontSize: '20px', color: '#2F3E46' }}>
          Choose your next adventure, Explorer! 🚀
        </p>
      </div>

      <div className="lesson-grid">
        {LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => onSelectLesson(lesson.id)}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              cursor: 'pointer',
              border: '4px solid ' + lesson.color,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{
              fontSize: '52px',
              background: lesson.color + '22',
              width: '90px',
              height: '90px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}>
              {lesson.icon}
            </div>
            <h3 style={{ color: lesson.color, margin: 0, fontFamily: 'Fredoka, sans-serif', fontSize: '14px', letterSpacing: '1px' }}>
              LESSON {lesson.id}
            </h3>
            <h2 style={{ margin: 0, fontSize: '20px', fontFamily: 'Fredoka, sans-serif' }}>{lesson.title}</h2>
            <p style={{ color: '#555', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>{lesson.desc}</p>
            <button
              className="btn"
              style={{
                marginTop: 'auto',
                background: lesson.color,
                color: 'white',
                width: '100%',
                padding: '10px 16px',
                fontSize: '16px'
              }}
            >
              Start Mission! 🚀
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
