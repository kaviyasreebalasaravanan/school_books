import React, { useState, useRef, useEffect } from 'react';

export default function Lesson9_Symmetry({ setTeacherMsg }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [axis, setAxis] = useState('vertical');
  const [color, setColor] = useState('#F15BB5');
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);

  const draw = (ctx, allStrokes, axis, canvasW, canvasH) => {
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = '#fff8fe';
    ctx.fillRect(0, 0, canvasW, canvasH);
    const cx = canvasW / 2, cy = canvasH / 2;
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = '#F15BB5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (axis === 'vertical') { ctx.moveTo(cx, 0); ctx.lineTo(cx, canvasH); }
    else { ctx.moveTo(0, cy); ctx.lineTo(canvasW, cy); }
    ctx.stroke();
    ctx.setLineDash([]);
    allStrokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      [false, true].forEach(mirror => {
        ctx.strokeStyle = mirror ? stroke.color + '99' : stroke.color;
        ctx.beginPath();
        stroke.points.forEach((pt, i) => {
          const x = mirror ? (axis === 'vertical' ? 2 * cx - pt.x : pt.x) : pt.x;
          const y = mirror ? (axis === 'horizontal' ? 2 * cy - pt.y : pt.y) : pt.y;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
      });
    });
  };

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - rect.left) * scaleX, y: (src.clientY - rect.top) * scaleY };
  };

  const onStart = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getPos(e, canvasRef.current);
    setCurrentStroke([pos]);
    setTeacherMsg('Draw on the left side and watch the magic mirror copy your drawing!');
  };

  const onMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const pos = getPos(e, canvasRef.current);
    const updated = [...currentStroke, pos];
    setCurrentStroke(updated);
    const ctx = canvasRef.current.getContext('2d');
    const tempAll = [...strokes, { points: updated, color }];
    draw(ctx, tempAll, axis, canvasRef.current.width, canvasRef.current.height);
  };

  const onEnd = () => {
    if (!isDrawing || currentStroke.length < 2) { setIsDrawing(false); return; }
    setStrokes(prev => [...prev, { points: currentStroke, color }]);
    setCurrentStroke([]);
    setIsDrawing(false);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    draw(ctx, strokes, axis, canvasRef.current.width, canvasRef.current.height);
  }, [strokes, axis]);

  const questions = [
    { q: 'A shape with a line of symmetry has...', options: ['Two equal halves', 'Three sides', 'No angles', 'Equal area only'], answer: 0, explanation: 'A line of symmetry divides a shape into two mirror-image halves that are exactly equal.' },
    { q: 'How many lines of symmetry does a circle have?', options: ['0', '1', '4', 'Infinite'], answer: 3, explanation: 'A circle has infinite lines of symmetry — any line through its center divides it perfectly!' },
    { q: 'Which letter has vertical symmetry?', options: ['G', 'S', 'A', 'Z'], answer: 2, explanation: 'The letter A has a vertical line of symmetry down its middle.' },
    { q: 'A square has how many lines of symmetry?', options: ['1', '2', '3', '4'], answer: 3, explanation: 'A square has 4 lines of symmetry: 2 through midpoints of opposite sides and 2 through opposite corners.' },
    { q: 'What is a mirror image called in maths?', options: ['Rotation', 'Reflection', 'Translation', 'Dilation'], answer: 1, explanation: 'A mirror image is called a REFLECTION. It is a flip over a line of symmetry.' },
  ];

  const colors = ['#F15BB5', '#FF6B6B', '#4ECDC4', '#FFD700', '#9B5DE5', '#1A535C'];

  return (
    <div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🦋</span> Introduction to Symmetry</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>Symmetry means a shape looks the same on both sides of a dividing line (called the axis of symmetry). Butterflies, snowflakes, and human faces are all beautiful examples of symmetry in nature!</p>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {['Line of Symmetry', 'Vertical Symmetry', 'Horizontal Symmetry', 'Reflections', 'Rotational Symmetry', 'Patterns'].map(t => (
            <div key={t} style={{ background: '#F15BB522', border: '2px solid #F15BB5', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: '700' }}>{t}</div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Formula and Concept</h2>
        <div className="formula-card" style={{ borderColor: '#F15BB5' }}>
          <div className="formula-text" style={{ color: '#F15BB5', fontSize: '22px' }}>A shape has symmetry if it can be folded along a line so both halves match exactly.</div>
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#F15BB5', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>🔍 How to Find Lines of Symmetry</h3>
          {['Draw the shape on paper', 'Try folding it in different directions', 'If both halves match perfectly → that fold is a LINE OF SYMMETRY!', 'Count all such fold lines — that is the total number of lines of symmetry.'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ background: '#F15BB5', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ icon: '🦋', title: 'Nature', desc: 'Butterfly wings, leaves, and flowers are symmetric. Symmetry helps animals attract mates!' },
            { icon: '👗', title: 'Fashion Design', desc: 'Clothes are designed symmetrically so they look balanced and beautiful on the body.' },
            { icon: '🏛️', title: 'Architecture', desc: 'Famous buildings like the Taj Mahal are perfectly symmetric — it looks the same from both sides.' },
            { icon: '💎', title: 'Jewellery', desc: 'Jewellery is designed with symmetric patterns to create balanced, attractive pieces.' }].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div><h4 style={{ margin: '0 0 4px', color: '#F15BB5' }}>{item.title}</h4><p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section" style={{ border: '4px solid #F15BB5', background: '#fff5fb' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Activity: Mirror Drawing Lab!</h2>
        <p style={{ marginBottom: '12px' }}>Draw on the canvas below — the mirror will instantly copy your drawing on the other side! Select an axis and colour, then draw.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>Axis:</span>
          {['vertical', 'horizontal'].map(a => (
            <button key={a} className="btn" onClick={() => { setAxis(a); setStrokes([]); }}
              style={{ background: axis === a ? '#F15BB5' : '#e9ecef', color: axis === a ? 'white' : '#333', fontSize: '14px', padding: '8px 16px', textTransform: 'capitalize' }}>
              {a === 'vertical' ? '↕ Vertical' : '↔ Horizontal'}
            </button>
          ))}
          <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>Colour:</span>
          {colors.map(c => (
            <div key={c} onClick={() => setColor(c)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, cursor: 'pointer', border: color === c ? '3px solid #333' : '2px solid #ccc' }} />
          ))}
          <button className="btn btn-secondary" onClick={() => setStrokes([])} style={{ fontSize: '13px', padding: '8px 14px' }}>Clear 🗑️</button>
        </div>
        <canvas ref={canvasRef} width={600} height={300} onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
          onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}
          style={{ border: '2px solid #F15BB5', borderRadius: '12px', width: '100%', cursor: 'crosshair', touchAction: 'none' }} />
      </div>
      <div className="lesson-section"><h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2><SimpleQuiz questions={questions} color="#F15BB5" /></div>
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #F15BB522, #9B5DE522)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>👗</div>
          <div>
            <h3 style={{ color: '#F15BB5', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>Fashion Designer</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: 0 }}>Fashion designers use symmetry and geometric patterns to create clothing that looks balanced and visually appealing. From cutting fabric to arranging embroidery patterns, symmetry is the foundation of beautiful design!</p>
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
