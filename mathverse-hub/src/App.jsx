import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AITeacher from './components/AITeacher';
import Lesson1_Numbers from './lessons/Lesson1_Numbers';
import Lesson2_Measurements from './lessons/Lesson2_Measurements';
import Lesson3_ProfitLoss from './lessons/Lesson3_ProfitLoss';
import Lesson4_Geometry from './lessons/Lesson4_Geometry';
import Lesson5_InfoProcessing from './lessons/Lesson5_InfoProcessing';
import Lesson6_Fractions from './lessons/Lesson6_Fractions';
import Lesson7_Integers from './lessons/Lesson7_Integers';
import Lesson8_PerimeterArea from './lessons/Lesson8_PerimeterArea';
import Lesson9_Symmetry from './lessons/Lesson9_Symmetry';
import Lesson10_InfoAdvanced from './lessons/Lesson10_InfoAdvanced';
import Lesson11_Statistics from './lessons/Lesson11_Statistics';
import { LESSONS } from './data/lessonsData';
import './index.css';

function App() {
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [teacherMsg, setTeacherMsg] = useState('Welcome to MathVerse Learning Hub! Choose a lesson to begin your adventure!');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (teacherMsg && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(teacherMsg);
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [teacherMsg]);

  const handleSelectLesson = (id) => {
    setActiveLessonId(id);
    const lesson = LESSONS.find(l => l.id === id);
    setTeacherMsg('Great choice! Welcome to Lesson ' + id + ': ' + lesson.title + '. Let us begin!');
    window.scrollTo(0, 0);
  };

  const handleBackToDashboard = () => {
    setActiveLessonId(null);
    setTeacherMsg('Excellent work! Choose another lesson whenever you are ready, Explorer!');
    window.scrollTo(0, 0);
  };

  const activeLessonData = LESSONS.find(l => l.id === activeLessonId);

  const renderLesson = () => {
    const props = { setTeacherMsg };
    switch (activeLessonId) {
      case 1:  return <Lesson1_Numbers {...props} />;
      case 2:  return <Lesson2_Measurements {...props} />;
      case 3:  return <Lesson3_ProfitLoss {...props} />;
      case 4:  return <Lesson4_Geometry {...props} />;
      case 5:  return <Lesson5_InfoProcessing {...props} />;
      case 6:  return <Lesson6_Fractions {...props} />;
      case 7:  return <Lesson7_Integers {...props} />;
      case 8:  return <Lesson8_PerimeterArea {...props} />;
      case 9:  return <Lesson9_Symmetry {...props} />;
      case 10: return <Lesson10_InfoAdvanced {...props} />;
      case 11: return <Lesson11_Statistics {...props} />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F7FFF7' }}>
      {/* Sticky Top Nav (shown inside a lesson) */}
      {activeLessonId !== null && (
        <nav style={{
          background: 'white',
          padding: '14px 24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 200,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button className="btn btn-secondary" onClick={handleBackToDashboard} style={{ fontSize: '15px', padding: '10px 20px' }}>
            ⬅ Dashboard
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>{activeLessonData ? activeLessonData.icon : ''}</span>
            <h2 style={{ margin: 0, color: activeLessonData ? activeLessonData.color : '#333', fontFamily: 'Fredoka, sans-serif', fontSize: '22px' }}>
              Lesson {activeLessonId}: {activeLessonData ? activeLessonData.title : ''}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {activeLessonId > 1 && (
              <button className="btn" onClick={() => handleSelectLesson(activeLessonId - 1)}
                style={{ background: '#e9ecef', color: '#333', fontSize: '13px', padding: '8px 14px' }}>
                ◀ Prev
              </button>
            )}
            {activeLessonId < 11 && (
              <button className="btn" onClick={() => handleSelectLesson(activeLessonId + 1)}
                style={{ background: '#e9ecef', color: '#333', fontSize: '13px', padding: '8px 14px' }}>
                Next ▶
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main style={{ paddingBottom: '120px' }}>
        {activeLessonId === null
          ? <Dashboard onSelectLesson={handleSelectLesson} />
          : <div className="container">{renderLesson()}</div>
        }
      </main>

      {/* AI Teacher floating widget */}
      <AITeacher message={teacherMsg} isSpeaking={isSpeaking} />
    </div>
  );
}

export default App;
