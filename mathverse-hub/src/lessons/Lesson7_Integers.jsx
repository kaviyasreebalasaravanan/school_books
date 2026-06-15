import React, { useState } from 'react';

export default function Lesson7_Integers({ setTeacherMsg }) {
  const [floor, setFloor] = useState(0);
  const floors = Array.from({ length: 11 }, (_, i) => 5 - i);

  const handleFloor = (f) => {
    setFloor(f);
    if (f > 0) setTeacherMsg('Floor ' + f + ' is a Positive Integer. It is above ground level!');
    else if (f < 0) setTeacherMsg('Floor ' + f + ' is a Negative Integer. We are ' + Math.abs(f) + ' floors below ground!');
    else setTeacherMsg('Floor 0 is the Ground Floor! Zero is neither positive nor negative.');
  };

  const questions = [
    { q: 'Which integer is greater: -3 or -7?', options: ['-7', '-3', 'Both equal', 'Cannot say'], answer: 1, explanation: '-3 > -7 because on a number line, -3 is to the RIGHT of -7.' },
    { q: 'What is (-4) + (+7)?', options: ['-11', '+3', '-3', '+11'], answer: 1, explanation: '(-4) + (+7) = +3. The positive number is larger so the result is positive.' },
    { q: 'What is the opposite of -9?', options: ['9', '-9', '0', '1/9'], answer: 0, explanation: 'The opposite (additive inverse) of -9 is +9. They add up to zero!' },
    { q: 'Which is NOT an integer?', options: ['-5', '0', '3', '1/2'], answer: 3, explanation: '1/2 is a fraction, not an integer. Integers are whole numbers: ...-2,-1,0,1,2...' },
    { q: '(-6) - (-2) = ?', options: ['-8', '-4', '+4', '+8'], answer: 1, explanation: 'Subtracting a negative is like adding a positive: (-6) - (-2) = (-6) + 2 = -4.' },
  ];

  return (
    <div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>↕️</span> Introduction to Integers</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>Integers include all whole numbers — positive numbers (1, 2, 3...), negative numbers (-1, -2, -3...), and zero (0). They help us describe things below zero like cold temperatures, underground floors, or money owed!</p>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {['Positive Integers', 'Negative Integers', 'Zero', 'Number Line', 'Comparing Integers', 'Addition & Subtraction'].map(t => (
            <div key={t} style={{ background: '#E7194222', border: '2px solid #E71D36', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: '700' }}>{t}</div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Formula and Rules</h2>
        <div className="formula-card" style={{ borderColor: '#E71D36' }}>
          <div className="formula-text" style={{ color: '#E71D36', fontSize: '22px', lineHeight: 2 }}>
            (+) + (+) = Positive &nbsp;|&nbsp; (−) + (−) = Negative
          </div>
          <div style={{ fontSize: '18px', color: '#555' }}>(+) + (−) = Sign of the LARGER number</div>
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#E71D36', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>🔍 Step-by-Step: (-8) + (+5)</h3>
          {['Find the difference: 8 - 5 = 3', 'Use the sign of the larger absolute value: 8 > 5, so use the negative sign', '✅ Answer: (-8) + (+5) = -3'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ background: '#E71D36', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ icon: '🌡️', title: 'Temperature', desc: 'Winter temperatures go below zero! -5°C means 5 degrees BELOW freezing.' },
            { icon: '🏦', title: 'Bank Accounts', desc: 'A bank balance of -₹500 means you owe the bank money (overdraft).' },
            { icon: '🏔️', title: 'Altitude', desc: 'Sea level = 0. Mountains are positive. The Dead Sea at -430m is negative altitude!' },
            { icon: '⚽', title: 'Sports Scores', desc: 'Goal difference in football can be negative if a team concedes more than they score.' }].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div><h4 style={{ margin: '0 0 4px', color: '#E71D36' }}>{item.title}</h4><p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section" style={{ border: '4px solid #E71D36', background: '#fff5f5' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Activity: Elevator Integer Simulator</h2>
        <p style={{ marginBottom: '16px' }}>Click any floor button to go there! Positive floors are above ground, negative floors are underground.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {floors.map(f => (
              <button key={f} onClick={() => handleFloor(f)}
                style={{
                  padding: '10px 16px', borderRadius: '10px', border: '2px solid ' + (f > 0 ? '#4ECDC4' : f < 0 ? '#E71D36' : '#FFD700'),
                  background: floor === f ? (f > 0 ? '#4ECDC4' : f < 0 ? '#E71D36' : '#FFD700') : 'white',
                  color: floor === f ? (f === 0 ? '#333' : 'white') : '#333',
                  fontFamily: 'Fredoka, sans-serif', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                {f > 0 ? '+' : ''}{f === 0 ? '0 (Ground)' : f}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', background: 'linear-gradient(to bottom, #87CEEB, #8B4513)', borderRadius: '16px', overflow: 'hidden', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '64px', transition: 'all 0.5s' }}>🛗</div>
            <div style={{
              background: floor > 0 ? '#4ECDC4' : floor < 0 ? '#E71D36' : '#FFD700',
              color: floor === 0 ? '#333' : 'white', padding: '12px 24px', borderRadius: '12px',
              fontFamily: 'Fredoka, sans-serif', fontSize: '28px', fontWeight: 'bold', marginTop: '16px'
            }}>
              Floor: {floor > 0 ? '+' : ''}{floor}
            </div>
            <div style={{ fontSize: '14px', color: 'white', marginTop: '8px', textAlign: 'center', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              {floor > 0 ? floor + ' floors ABOVE ground' : floor < 0 ? Math.abs(floor) + ' floors BELOW ground' : 'At ground level!'}
            </div>
          </div>
        </div>
      </div>
      <div className="lesson-section"><h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2><SimpleQuiz questions={questions} color="#E71D36" /></div>
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #E71D3622, #FF6B6B22)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>🌡️</div>
          <div>
            <h3 style={{ color: '#E71D36', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>Meteorologist (Weather Scientist)</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: 0 }}>Meteorologists use integers to measure temperature changes, predict storms, and record weather data. Understanding negative numbers is essential when reading weather charts for polar regions or high altitudes!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimpleQuiz({ questions, color }) {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const handleAnswer = (qi, ai) => { if (score !== null) return; setAnswers(prev => ({ ...prev, [qi]: ai })); };
  const handleSubmit = () => { let s = 0; questions.forEach((q, i) => { if (answers[i] === q.answer) s++; }); setScore(s); };
  const handleReset = () => { setAnswers({}); setScore(null); };
  return (
    <div>
      {questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: '18px', padding: '16px', background: '#f8f9fa', borderRadius: '12px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>Q{qi + 1}. {q.q}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {q.options.map((opt, ai) => {
              let bg = '#e9ecef', clr = '#2F3E46';
              if (score !== null) { if (ai === q.answer) { bg = color; clr = 'white'; } else if (answers[qi] === ai) { bg = '#FF6B6B'; clr = 'white'; } } else if (answers[qi] === ai) { bg = '#FFE66D'; }
              return <button key={ai} onClick={() => handleAnswer(qi, ai)} style={{ padding: '8px 18px', borderRadius: '20px', border: '2px solid #ddd', background: bg, color: clr, fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>{opt}</button>;
            })}
          </div>
          {score !== null && <p style={{ marginTop: '8px', fontSize: '13px', color: '#555', fontStyle: 'italic' }}>💡 {q.explanation}</p>}
        </div>
      ))}
      {score === null
        ? <button className="btn btn-primary" onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length} style={{ opacity: Object.keys(answers).length < questions.length ? 0.5 : 1 }}>Submit Answers ✅</button>
        : <div style={{ textAlign: 'center' }}>
            <div style={{ background: score >= 3 ? color : '#FF6B6B', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '48px' }}>{score >= 4 ? '🏆' : score >= 3 ? '⭐' : '💪'}</div>
              <div style={{ fontSize: '28px', fontFamily: 'Fredoka, sans-serif' }}>Score: {score} / {questions.length}</div>
            </div>
            <button className="btn btn-secondary" onClick={handleReset}>Try Again 🔄</button>
          </div>}
    </div>
  );
}
