import React, { useState } from 'react';

export default function Lesson2_Measurements({ setTeacherMsg }) {
  const [value, setValue] = useState(100);
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('m');

  const conversions = {
    cm: { m: 0.01, km: 0.00001, mm: 10, inch: 0.3937 },
    m:  { cm: 100, km: 0.001, mm: 1000, inch: 39.37 },
    km: { m: 1000, cm: 100000, mm: 1000000, inch: 39370 },
    mm: { cm: 0.1, m: 0.001, km: 0.000001, inch: 0.03937 },
    inch: { cm: 2.54, m: 0.0254, mm: 25.4, km: 0.0000254 },
  };

  const convert = () => {
    if (fromUnit === toUnit) return value;
    const factor = conversions[fromUnit]?.[toUnit];
    return factor ? (value * factor).toFixed(4) : 'N/A';
  };

  const result = convert();

  const units = ['mm', 'cm', 'm', 'km', 'inch'];

  const questions = [
    { q: '1 meter = how many centimeters?', options: ['10', '100', '1000', '0.1'], answer: 1, explanation: '1 meter = 100 centimeters. The prefix "centi" means 1/100.' },
    { q: '1 kilometer = how many meters?', options: ['100', '10', '1000', '10000'], answer: 2, explanation: '1 kilometer = 1000 meters. "Kilo" means 1000.' },
    { q: 'Which is the LARGEST unit?', options: ['mm', 'cm', 'm', 'km'], answer: 3, explanation: 'km (kilometer) is the largest. 1 km = 1000 m = 100,000 cm = 1,000,000 mm!' },
    { q: '500 cm = how many meters?', options: ['5 m', '50 m', '0.5 m', '5000 m'], answer: 0, explanation: '500 cm ÷ 100 = 5 m. To convert cm to m, divide by 100.' },
    { q: 'A football field is about 100 m long. How many km is that?', options: ['1 km', '0.1 km', '10 km', '0.01 km'], answer: 1, explanation: '100 m ÷ 1000 = 0.1 km. To convert m to km, divide by 1000.' },
  ];

  return (
    <div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📏</span> Introduction to Measurements</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>Measurements help us describe the world! Without measurements, we could not build houses, cook food, or travel. In this lesson we learn how to convert between different units of length, mass, and capacity.</p>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {['Units of Length', 'Units of Mass', 'Units of Capacity', 'Metric System', 'Unit Conversion'].map(t => (
            <div key={t} style={{ background: '#4ECDC411', border: '2px solid #4ECDC4', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: '700' }}>{t}</div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Formula</h2>
        <div className="formula-card" style={{ borderColor: '#4ECDC4' }}>
          <div className="formula-text" style={{ fontSize: '22px', lineHeight: '2' }}>
            1 km = 1000 m &nbsp;|&nbsp; 1 m = 100 cm &nbsp;|&nbsp; 1 cm = 10 mm
          </div>
          <div style={{ fontSize: '18px', color: '#555' }}>1 kg = 1000 g &nbsp;|&nbsp; 1 L = 1000 mL</div>
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#4ECDC4', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>🔍 Step-by-Step: Convert 5.5 km to meters</h3>
          {['Write the conversion rule: 1 km = 1000 m', 'Multiply: 5.5 × 1000', 'Result: 5500 m'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px', alignItems: 'flex-start' }}>
              <div style={{ background: '#4ECDC4', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{t}</p>
            </div>
          ))}
          <div style={{ background: '#4ECDC4', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', marginTop: '8px' }}><strong style={{ fontSize: '20px' }}>✅ 5.5 km = 5500 m</strong></div>
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ icon: '🏗️', title: 'Construction', desc: 'Civil engineers use measurements to build roads, bridges, and buildings accurately.' },
            { icon: '🍳', title: 'Cooking', desc: 'Recipes use grams, litres, and millilitres to measure ingredients precisely.' },
            { icon: '✈️', title: 'Aviation', desc: 'Pilots measure altitude in metres and distance in kilometres every flight.' },
            { icon: '⚕️', title: 'Medicine', desc: 'Doctors measure medicine in milligrams and millilitres for safe doses.' }].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div><h4 style={{ margin: '0 0 4px', color: '#4ECDC4' }}>{item.title}</h4><p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section" style={{ border: '4px solid #FFE66D', background: '#FFFDF0' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Interactive Activity: Virtual Measurement Converter</h2>
        <p style={{ marginBottom: '20px' }}>Enter a value and select units to convert instantly!</p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <input type="number" value={value} onChange={e => { setValue(e.target.value); setTeacherMsg('Converting ' + e.target.value + ' ' + fromUnit + ' to ' + toUnit + '...'); }}
            style={{ padding: '12px', borderRadius: '12px', border: '2px solid #4ECDC4', fontSize: '20px', width: '140px', fontFamily: 'Fredoka, sans-serif' }} />
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}
            style={{ padding: '12px', borderRadius: '12px', border: '2px solid #4ECDC4', fontSize: '18px', fontFamily: 'Fredoka, sans-serif' }}>
            {units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          <span style={{ fontSize: '28px' }}>→</span>
          <select value={toUnit} onChange={e => setToUnit(e.target.value)}
            style={{ padding: '12px', borderRadius: '12px', border: '2px solid #4ECDC4', fontSize: '18px', fontFamily: 'Fredoka, sans-serif' }}>
            {units.filter(u => u !== fromUnit).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div style={{ background: '#4ECDC4', color: 'white', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '16px', opacity: 0.85, marginBottom: '4px' }}>Result</div>
          <div style={{ fontSize: '42px', fontFamily: 'Fredoka, sans-serif' }}>{value} {fromUnit} = <strong>{result} {toUnit}</strong></div>
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2>
        <SimpleQuiz questions={questions} color="#4ECDC4" />
      </div>
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #4ECDC422, #FFE66D22)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>👷</div>
          <div>
            <h3 style={{ color: '#4ECDC4', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>Civil Engineer</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: '0 0 12px' }}>Civil Engineers design and build roads, dams, bridges, and buildings. Every calculation depends on precise measurements. A 1 mm error in a building foundation can cause massive structural problems!</p>

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
