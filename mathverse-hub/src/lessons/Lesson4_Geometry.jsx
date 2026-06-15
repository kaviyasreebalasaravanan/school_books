import React, { useState, useRef, useEffect } from 'react';

export default function Lesson4_Geometry({ setTeacherMsg }) {
  const canvasRef = useRef(null);
  const [shape, setShape] = useState('rectangle');
  const [dim, setDim] = useState({ length: 120, width: 80, radius: 60, base: 120, height: 80, side: 90 });

  const shapes = [
    { id: 'rectangle', label: 'Rectangle', icon: '▬' },
    { id: 'circle', label: 'Circle', icon: '⬤' },
    { id: 'triangle', label: 'Triangle', icon: '▲' },
    { id: 'square', label: 'Square', icon: '■' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#1A535C';
    ctx.fillStyle = 'rgba(78,205,196,0.25)';
    ctx.lineWidth = 3;
    const cx = canvas.width / 2, cy = canvas.height / 2;
    ctx.beginPath();
    if (shape === 'rectangle') {
      const w = dim.length, h = dim.width;
      ctx.rect(cx - w / 2, cy - h / 2, w, h);
    } else if (shape === 'circle') {
      ctx.arc(cx, cy, dim.radius, 0, Math.PI * 2);
    } else if (shape === 'triangle') {
      ctx.moveTo(cx, cy - dim.height / 2);
      ctx.lineTo(cx - dim.base / 2, cy + dim.height / 2);
      ctx.lineTo(cx + dim.base / 2, cy + dim.height / 2);
      ctx.closePath();
    } else if (shape === 'square') {
      ctx.rect(cx - dim.side / 2, cy - dim.side / 2, dim.side, dim.side);
    }
    ctx.fill(); ctx.stroke();
    let label = '';
    if (shape === 'rectangle') label = 'Area = ' + dim.length + ' x ' + dim.width + ' = ' + (dim.length * dim.width) + ' sq units';
    else if (shape === 'circle') label = 'Area = π × ' + dim.radius + '² ≈ ' + (3.14159 * dim.radius * dim.radius).toFixed(0) + ' sq units';
    else if (shape === 'triangle') label = 'Area = ½ × ' + dim.base + ' × ' + dim.height + ' = ' + (0.5 * dim.base * dim.height).toFixed(0) + ' sq units';
    else if (shape === 'square') label = 'Area = ' + dim.side + '² = ' + (dim.side * dim.side) + ' sq units';
    ctx.fillStyle = '#1A535C';
    ctx.font = 'bold 14px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, canvas.height - 12);
    setTeacherMsg('You drew a ' + shape + '! ' + label);
  }, [shape, dim]);

  const questions = [
    { q: 'Area of a rectangle with Length=8, Breadth=5?', options: ['13', '40', '26', '80'], answer: 1, explanation: 'Area = L × B = 8 × 5 = 40 sq units.' },
    { q: 'How many sides does a triangle have?', options: ['2', '4', '3', '5'], answer: 2, explanation: 'A triangle has exactly 3 sides and 3 angles.' },
    { q: 'Perimeter of a square with side 7 cm?', options: ['49 cm', '14 cm', '21 cm', '28 cm'], answer: 3, explanation: 'Perimeter = 4 × side = 4 × 7 = 28 cm.' },
    { q: 'Area of a triangle with base=10, height=6?', options: ['30', '60', '16', '20'], answer: 0, explanation: 'Area = ½ × base × height = ½ × 10 × 6 = 30 sq units.' },
    { q: 'A circle has how many corners?', options: ['1', '2', '0', '4'], answer: 2, explanation: 'A circle has NO corners or edges — it is a perfectly smooth curved shape!' },
  ];

  return (
    <div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📐</span> Introduction to Geometry</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>Geometry is the study of shapes, sizes, and space. From the wheels of your bicycle (circles) to the rooms in your house (rectangles), geometry is everywhere! In Grade 6 we learn to name, draw, and calculate properties of 2D shapes.</p>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {['2D Shapes', '3D Shapes', 'Angles', 'Lines and Rays', 'Perimeter', 'Area'].map(t => (
            <div key={t} style={{ background: '#1A535C11', border: '2px solid #1A535C', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: '700' }}>{t}</div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Formulas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            'Area of Rectangle = Length × Breadth',
            'Area of Triangle = ½ × Base × Height',
            'Area of Circle = π × r²',
            'Perimeter of Rectangle = 2 × (L + B)',
          ].map(f => (
            <div key={f} className="formula-card" style={{ borderColor: '#1A535C', padding: '14px' }}>
              <div style={{ fontSize: '15px', color: '#1A535C', fontWeight: 700 }}>{f}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#1A535C', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>🔍 Step-by-Step: Area of Triangle (base=10, height=8)</h3>
          {['Formula: Area = ½ × Base × Height', 'Step 1: ½ × 10 = 5', 'Step 2: 5 × 8 = 40', '✅ Final Answer: Area = 40 sq cm'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ background: '#1A535C', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ icon: '🏛️', title: 'Architecture', desc: 'Architects use geometry to design buildings, arches, and floor plans.' },
            { icon: '🎨', title: 'Art & Design', desc: 'Artists use shapes, angles, and symmetry to create beautiful works.' },
            { icon: '⚽', title: 'Sports', desc: 'Sports fields are geometric shapes — circles for athletics, rectangles for football.' },
            { icon: '💻', title: 'Computer Graphics', desc: 'Video games and movies are built from millions of triangles and circles.' }].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div><h4 style={{ margin: '0 0 4px', color: '#1A535C' }}>{item.title}</h4><p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section" style={{ border: '4px solid #1A535C', background: '#f0fbfa' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Activity: Shape Construction Studio</h2>
        <p style={{ marginBottom: '16px' }}>Choose a shape and use the sliders to change its dimensions. Watch it redraw in real time!</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {shapes.map(s => (
            <button key={s.id} className="btn" onClick={() => setShape(s.id)}
              style={{ background: shape === s.id ? '#1A535C' : '#e9ecef', color: shape === s.id ? 'white' : '#333', fontSize: '16px' }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            {shape === 'rectangle' && (<>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Length: {dim.length}px</label>
              <input type="range" min="40" max="200" value={dim.length} onChange={e => setDim(d => ({ ...d, length: +e.target.value }))} style={{ width: '100%', marginBottom: '12px' }} />
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Width: {dim.width}px</label>
              <input type="range" min="40" max="160" value={dim.width} onChange={e => setDim(d => ({ ...d, width: +e.target.value }))} style={{ width: '100%' }} />
            </>)}
            {shape === 'circle' && (<>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Radius: {dim.radius}px</label>
              <input type="range" min="20" max="120" value={dim.radius} onChange={e => setDim(d => ({ ...d, radius: +e.target.value }))} style={{ width: '100%' }} />
            </>)}
            {shape === 'triangle' && (<>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Base: {dim.base}px</label>
              <input type="range" min="40" max="200" value={dim.base} onChange={e => setDim(d => ({ ...d, base: +e.target.value }))} style={{ width: '100%', marginBottom: '12px' }} />
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Height: {dim.height}px</label>
              <input type="range" min="40" max="160" value={dim.height} onChange={e => setDim(d => ({ ...d, height: +e.target.value }))} style={{ width: '100%' }} />
            </>)}
            {shape === 'square' && (<>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Side: {dim.side}px</label>
              <input type="range" min="40" max="180" value={dim.side} onChange={e => setDim(d => ({ ...d, side: +e.target.value }))} style={{ width: '100%' }} />
            </>)}
          </div>
          <canvas ref={canvasRef} width={300} height={220} style={{ border: '2px solid #1A535C', borderRadius: '12px', background: 'white', width: '100%' }} />
        </div>
      </div>
      <div className="lesson-section"><h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2><SimpleQuiz questions={questions} color="#1A535C" /></div>
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #1A535C22, #4ECDC422)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>🏛️</div>
          <div>
            <h3 style={{ color: '#1A535C', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>Architect</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: 0 }}>Architects design homes, schools, and skyscrapers. They use geometry every single day — calculating areas, angles, and volumes to make sure structures are safe, functional, and beautiful.</p>
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
