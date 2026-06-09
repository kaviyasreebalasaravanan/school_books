import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AITeacher from './components/AITeacher';
import Lesson1_Numbers from './lessons/Lesson1_Numbers';
import Lesson6_Fractions from './lessons/Lesson6_Fractions';
import { LESSONS } from './data/lessonsData';
import './index.css';

function App() {
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [teacherMsg, setTeacherMsg] = useState('Welcome to MathVerse! Choose a lesson to start learning!');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (teacherMsg && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(teacherMsg);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [teacherMsg]);

  const handleSelectLesson = (id) => {
    setActiveLessonId(id);
    const lesson = LESSONS.find(l => l.id === id);
    setTeacherMsg('Excellent choice! We are now entering ' + lesson.title + '. Let us learn!');
    window.scrollTo(0, 0);
  };

  const handleBackToDashboard = () => {
    setActiveLessonId(null);
    setTeacherMsg('Great job! Choose another lesson whenever you are ready.');
    window.scrollTo(0, 0);
  };

  const activeLessonData = LESSONS.find(l => l.id === activeLessonId);

  return (
    <div>
      {/* Top Navigation */}
      {activeLessonId !== null && (
        <nav style={{
          background: 'white',
          padding: '15px 20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button className="btn btn-secondary" onClick={handleBackToDashboard}>
            ⬅ Back to Dashboard
          </button>
          <h2 style={{ margin: 0, color: activeLessonData ? activeLessonData.color : '#000' }}>
            {activeLessonData ? activeLessonData.icon : ''} {activeLessonData ? activeLessonData.title : ''}
          </h2>
          <div></div>
        </nav>
      )}

      {/* Main Content */}
      <main className={activeLessonId === null ? '' : 'container'}>
        {activeLessonId === null && <Dashboard onSelectLesson={handleSelectLesson} />}
        {activeLessonId === 1 && <Lesson1_Numbers setTeacherMsg={setTeacherMsg} />}
        {activeLessonId === 6 && <Lesson6_Fractions setTeacherMsg={setTeacherMsg} />}
        {activeLessonId !== null && activeLessonId !== 1 && activeLessonId !== 6 && (
          <div className="lesson-section" style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚧 Coming Soon! 🚧</h1>
            <p style={{ fontSize: '18px' }}>This lesson is being built! Try Lesson 1 (Numbers) or Lesson 6 (Fractions) now.</p>
            <button className="btn btn-secondary" style={{ marginTop: '20px' }} onClick={handleBackToDashboard}>
              ⬅ Back to Dashboard
            </button>
          </div>
        )}
      </main>

      {/* AI Teacher */}
      <AITeacher message={teacherMsg} isSpeaking={isSpeaking} />
    </div>
  );
}

export default App;
