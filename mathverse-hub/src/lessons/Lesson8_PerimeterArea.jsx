import React, { useState } from 'react';

export default function Lesson8_PerimeterArea({ setTeacherMsg }) {
  const [room, setRoom] = useState({ length: 10, width: 8 });
  const [furnitureList, setFurnitureList] = useState([]);

  const furniture = [
    { name: 'Bed', icon: '🛏️', area: 6 },
    { name: 'Desk', icon: '🪑', area: 2 },
    { name: 'Wardrobe', icon: '🚪', area: 3 },
    { name: 'TV Unit', icon: '📺', area: 2 },
  ];

  const roomArea = room.length * room.width;
  const roomPerimeter = 2 * (room.length + room.width);
  const usedArea = furnitureList.reduce((sum, f) => sum + f.area, 0);
  const freeArea = roomArea - usedArea;

  const addFurniture = (item) => {
    if (usedArea + item.area > roomArea) {
      setTeacherMsg('No space! The room area is ' + roomArea + ' sq m and only ' + freeArea + ' sq m is free!');
      return;
    }
    setFurnitureList(prev => [...prev, item]);
    setTeacherMsg('Added ' + item.name + '! It takes ' + item.area + ' sq m. Remaining free area: ' + (freeArea - item.area) + ' sq m.');
  };

  const questions = [
    { q: 'Perimeter of rectangle with L=12, B=5?', options: ['60', '34', '17', '120'], answer: 1, explanation: 'Perimeter = 2(L+B) = 2(12+5) = 2×17 = 34 cm.' },
    { q: 'Area of square with side 9 cm?', options: ['36', '81', '18', '72'], answer: 1, explanation: 'Area = side² = 9² = 81 sq cm.' },
    { q: 'A garden is 15m × 10m. What is its area?', options: ['25 sq m', '50 sq m', '150 sq m', '100 sq m'], answer: 2, explanation: 'Area = L × B = 15 × 10 = 150 sq m.' },
    { q: 'If perimeter of a square is 32 cm, what is its side?', options: ['8 cm', '4 cm', '16 cm', '128 cm'], answer: 0, explanation: 'Perimeter = 4×side → side = 32÷4 = 8 cm.' },
    { q: 'Which has a larger area: 6×4 rectangle or 5×5 square?', options: ['Rectangle (24)', 'Square (25)', 'Both equal', 'Cannot say'], answer: 1, explanation: 'Rectangle area=24, Square area=25. Square is larger!' },
  ];

  return (
    <div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🏠</span> Introduction to Perimeter and Area</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>Perimeter is the total length around the outside of a shape (like the fence around a garden). Area is the amount of space INSIDE a shape (like the floor tiles in a room). Both are used in construction, farming, and design every day!</p>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {['Perimeter of Rectangle', 'Perimeter of Square', 'Area of Rectangle', 'Area of Square', 'Area of Triangle', 'Irregular Shapes'].map(t => (
            <div key={t} style={{ background: '#9B5DE522', border: '2px solid #9B5DE5', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: '700' }}>{t}</div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Formulas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {['Area of Rectangle = Length × Breadth', 'Area of Square = Side × Side', 'Perimeter of Rectangle = 2 × (L + B)', 'Perimeter of Square = 4 × Side', 'Area of Triangle = ½ × Base × Height'].map(f => (
            <div key={f} className="formula-card" style={{ borderColor: '#9B5DE5', padding: '14px' }}>
              <div style={{ fontSize: '14px', color: '#9B5DE5', fontWeight: 700 }}>{f}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#9B5DE5', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>🔍 Step-by-Step: Room Measurement (L=10m, B=8m)</h3>
          {['Area = L × B = 10 × 8 = 80 sq m', 'Perimeter = 2 × (L + B) = 2 × (10 + 8) = 2 × 18', '✅ Area = 80 sq m | Perimeter = 36 m'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ background: '#9B5DE5', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ icon: '🌾', title: 'Farming', desc: 'Farmers calculate area to know how many seeds to plant and perimeter to build fences.' },
            { icon: '🏗️', title: 'Construction', desc: 'Builders measure room areas to buy the right amount of flooring and wall paint.' },
            { icon: '🛝', title: 'Playgrounds', desc: 'Playground designers measure area to fit equipment safely inside boundaries.' },
            { icon: '🗺️', title: 'Geography', desc: 'Countries and states are measured in sq km of area. India = 3.29 million sq km!' }].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div><h4 style={{ margin: '0 0 4px', color: '#9B5DE5' }}>{item.title}</h4><p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section" style={{ border: '4px solid #9B5DE5', background: '#faf5ff' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Activity: House Room Designer!</h2>
        <p style={{ marginBottom: '16px' }}>Design your dream room! Set the dimensions then add furniture. Make sure everything fits!</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Room Length: {room.length} m</label>
            <input type="range" min="5" max="20" value={room.length} onChange={e => { setRoom(r => ({ ...r, length: +e.target.value })); setFurnitureList([]); }} style={{ width: '100%', marginBottom: '12px' }} />
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Room Width: {room.width} m</label>
            <input type="range" min="4" max="15" value={room.width} onChange={e => { setRoom(r => ({ ...r, width: +e.target.value })); setFurnitureList([]); }} style={{ width: '100%' }} />
          </div>
          <div style={{ background: '#9B5DE522', border: '2px solid #9B5DE5', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '14px', color: '#555' }}>Room Dimensions: {room.length}m × {room.width}m</div>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '22px', color: '#9B5DE5' }}>Area: {roomArea} sq m</div>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '22px', color: '#4ECDC4' }}>Perimeter: {roomPerimeter} m</div>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '18px', color: freeArea < 5 ? '#FF6B6B' : '#2F3E46' }}>Free Space: {freeArea} sq m</div>
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: 'Fredoka, sans-serif', marginBottom: '10px' }}>Add Furniture:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {furniture.map(item => (
              <button key={item.name} className="btn" onClick={() => addFurniture(item)}
                style={{ background: '#9B5DE5', color: 'white', fontSize: '14px', padding: '10px 16px' }}>
                {item.icon} {item.name} ({item.area} sq m)
              </button>
            ))}
          </div>
          {furnitureList.length > 0 && (
            <div style={{ background: 'white', border: '2px solid #9B5DE5', borderRadius: '12px', padding: '14px' }}>
              <strong>Room Contents: </strong>{furnitureList.map((f, i) => <span key={i}>{f.icon} </span>)}
              <div style={{ marginTop: '6px', fontSize: '14px', color: '#555' }}>Used: {usedArea} sq m | Free: {freeArea} sq m</div>
              <button className="btn btn-secondary" style={{ marginTop: '8px', fontSize: '13px' }} onClick={() => { setFurnitureList([]); }}>Clear Room 🗑️</button>
            </div>
          )}
        </div>
      </div>
      <div className="lesson-section"><h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2><SimpleQuiz questions={questions} color="#9B5DE5" /></div>
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #9B5DE522, #4ECDC422)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>🏛️</div>
          <div>
            <h3 style={{ color: '#9B5DE5', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>Civil Engineer / Interior Designer</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: 0 }}>Engineers and interior designers use perimeter and area calculations daily to design rooms, estimate material costs, and ensure buildings meet safety standards.</p>
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
