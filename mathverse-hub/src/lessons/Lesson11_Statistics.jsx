import React, { useState } from 'react';

const SQ = ({ questions, color }) => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const ha = (qi, ai) => { if (score !== null) return; setAnswers(p => ({ ...p, [qi]: ai })); };
  const hs = () => { let s = 0; questions.forEach((q, i) => { if (answers[i] === q.answer) s++; }); setScore(s); };
  const hr = () => { setAnswers({}); setScore(null); };
  return (
    <div>
      {questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: '18px', padding: '16px', background: '#f8f9fa', borderRadius: '12px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>Q{qi + 1}. {q.q}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {q.options.map((opt, ai) => {
              let bg = '#e9ecef', clr = '#2F3E46';
              if (score !== null) { if (ai === q.answer) { bg = color; clr = 'white'; } else if (answers[qi] === ai) { bg = '#FF6B6B'; clr = 'white'; } } else if (answers[qi] === ai) { bg = '#FFE66D'; }
              return <button key={ai} onClick={() => ha(qi, ai)} style={{ padding: '8px 18px', borderRadius: '20px', border: '2px solid #ddd', background: bg, color: clr, fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>{opt}</button>;
            })}
          </div>
          {score !== null && <p style={{ marginTop: '8px', fontSize: '13px', color: '#555', fontStyle: 'italic' }}>💡 {q.explanation}</p>}
        </div>
      ))}
      {score === null
        ? <button className="btn btn-primary" onClick={hs} disabled={Object.keys(answers).length < questions.length} style={{ opacity: Object.keys(answers).length < questions.length ? 0.5 : 1 }}>Submit Answers ✅</button>
        : <div style={{ textAlign: 'center' }}>
            <div style={{ background: score >= 3 ? color : '#FF6B6B', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '48px' }}>{score >= 4 ? '🏆' : score >= 3 ? '⭐' : '💪'}</div>
              <div style={{ fontSize: '28px', fontFamily: 'Fredoka, sans-serif' }}>Score: {score} / {questions.length}</div>
            </div>
            <button className="btn btn-secondary" onClick={hr}>Try Again 🔄</button>
          </div>}
    </div>
  );
};

export default function Lesson11_Statistics({ setTeacherMsg }) {
  const [survey, setSurvey] = useState({ Cricket: 8, Football: 5, Basketball: 3, Badminton: 6, Swimming: 4 });
  const [newSport, setNewSport] = useState('');
  const [newVal, setNewVal] = useState(5);

  const total = Object.values(survey).reduce((a, b) => a + b, 0);
  const max = Math.max(...Object.values(survey));
  const colors11 = ['#FF6B6B', '#4ECDC4', '#FFD700', '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4'];

  const addSport = () => {
    if (!newSport.trim()) return;
    setSurvey(prev => ({ ...prev, [newSport.trim()]: newVal }));
    setTeacherMsg('Added ' + newSport + ' with ' + newVal + ' votes! The bar chart has updated!');
    setNewSport('');
  };

  const questions = [
    { q: 'What is the MODE in: 3, 5, 5, 7, 9?', options: ['3', '5', '7', '9'], answer: 1, explanation: 'Mode is the number that appears MOST often. 5 appears twice, so mode = 5.' },
    { q: 'What is the MEDIAN of: 2, 4, 6, 8, 10?', options: ['4', '6', '8', '5'], answer: 1, explanation: 'Median is the MIDDLE value when sorted. In 2,4,6,8,10 → middle = 6.' },
    { q: 'Mean of 10, 20, 30 = ?', options: ['30', '20', '60', '10'], answer: 1, explanation: 'Mean = Sum ÷ Count = (10+20+30) ÷ 3 = 60 ÷ 3 = 20.' },
    { q: 'A bar graph is used to?', options: ['Measure angles', 'Compare data', 'Find area', 'Draw shapes'], answer: 1, explanation: 'Bar graphs visually compare different categories of data using rectangular bars.' },
    { q: 'What does RANGE mean in statistics?', options: ['Average of data', 'Most common value', 'Highest − Lowest', 'Middle value'], answer: 2, explanation: 'Range = Highest value − Lowest value. It shows how spread out the data is.' },
  ];

  return (
    <div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📊</span> Introduction to Statistics and Data</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>Statistics is the science of collecting, organising, and understanding data. When scientists, doctors, or businesses need to make decisions, they use statistics to find patterns and trends in information!</p>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {['Data Collection', 'Tally Marks', 'Bar Graphs', 'Pictographs', 'Mean', 'Median', 'Mode', 'Range'].map(t => (
            <div key={t} style={{ background: '#00F5D422', border: '2px solid #00F5D4', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: '700' }}>{t}</div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Formulas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {['Mean = Sum of all values ÷ Number of values', 'Median = Middle value (when sorted)', 'Mode = Most frequently occurring value', 'Range = Highest value − Lowest value'].map(f => (
            <div key={f} className="formula-card" style={{ borderColor: '#00BBF9', padding: '14px' }}>
              <div style={{ fontSize: '14px', color: '#00BBF9', fontWeight: 700 }}>{f}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#00BBF9', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>🔍 Step-by-Step: Find Mean of 5, 10, 15, 20, 25</h3>
          {['Add all values: 5 + 10 + 15 + 20 + 25 = 75', 'Count how many values: 5 values', '✅ Mean = 75 ÷ 5 = 15'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ background: '#00BBF9', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ icon: '📈', title: 'Business', desc: 'Companies analyse sales data to decide what products to make more of.' },
            { icon: '🏥', title: 'Medicine', desc: 'Doctors analyse patient data to find the most effective treatments.' },
            { icon: '🏏', title: 'Sports', desc: 'Batting averages and run rates are all statistical measurements.' },
            { icon: '🌦️', title: 'Weather', desc: 'Meteorologists collect temperature data daily to identify weather patterns.' }].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div><h4 style={{ margin: '0 0 4px', color: '#00BBF9' }}>{item.title}</h4><p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section" style={{ border: '4px solid #00BBF9', background: '#f0fcff' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Activity: Live Survey and Bar Graph Builder!</h2>
        <p style={{ marginBottom: '16px' }}>This is a class survey of favourite sports. Add your own sport and see the bar chart update in real time!</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input value={newSport} onChange={e => setNewSport(e.target.value)} placeholder="Enter sport name..." style={{ padding: '10px 16px', borderRadius: '12px', border: '2px solid #00BBF9', fontSize: '16px', fontFamily: 'Nunito, sans-serif', flex: 1, minWidth: '150px' }} />
          <input type="number" value={newVal} min="1" max="30" onChange={e => setNewVal(+e.target.value)} style={{ padding: '10px', width: '70px', borderRadius: '12px', border: '2px solid #00BBF9', fontSize: '16px', textAlign: 'center' }} />
          <span style={{ fontSize: '14px', color: '#555' }}>votes</span>
          <button className="btn btn-secondary" onClick={addSport} style={{ fontSize: '15px' }}>+ Add to Survey</button>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e0e0e0' }}>
          <h4 style={{ fontFamily: 'Fredoka, sans-serif', marginBottom: '16px', color: '#00BBF9' }}>📊 Favourite Sports Bar Chart</h4>
          {Object.entries(survey).map(([sport, votes], i) => (
            <div key={sport} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '100px', fontWeight: '600', fontSize: '13px', textAlign: 'right', flexShrink: 0 }}>{sport}</div>
              <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '6px', overflow: 'hidden', height: '32px' }}>
                <div style={{ height: '100%', background: colors11[i % colors11.length], borderRadius: '6px', width: ((votes / max) * 100) + '%', transition: 'width 0.5s', display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '13px' }}>{votes}</span>
                </div>
              </div>
              <button onClick={() => { setSurvey(prev => { const n = { ...prev }; delete n[sport]; return n; }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', gap: '20px', background: '#f8f9fa', padding: '14px', borderRadius: '10px' }}>
            <div><span style={{ fontWeight: 'bold' }}>Total Votes:</span> {total}</div>
            <div><span style={{ fontWeight: 'bold' }}>Most Popular:</span> {Object.entries(survey).sort((a, b) => b[1] - a[1])[0]?.[0]}</div>
          </div>
        </div>
      </div>
      <div className="lesson-section"><h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2><SQ questions={questions} color="#00BBF9" /></div>
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #00BBF922, #00F5D422)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>📊</div>
          <div>
            <h3 style={{ color: '#00BBF9', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>Data Analyst / Data Scientist</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: 0 }}>Data Analysts collect and interpret data to help companies make smart decisions. They create graphs, find patterns, and tell stories with numbers — exactly what you are learning to do right here!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
