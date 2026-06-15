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

export default function Lesson5_InfoProcessing({ setTeacherMsg }) {
  const [puzzleStep, setPuzzleStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const puzzles = [
    {
      question: 'Look at the pattern: 2, 4, 8, 16, ___. What comes next?',
      options: ['24', '32', '20', '28'],
      answer: 1,
      hint: 'Each number is multiplied by 2!',
      explanation: '2×2=4, 4×2=8, 8×2=16, 16×2=32. The rule is: multiply by 2 each time!'
    },
    {
      question: 'Code: A=1, B=2, C=3 ... What does the word CAB spell in numbers?',
      options: ['1-2-3', '3-1-2', '2-3-1', '1-3-2'],
      answer: 1,
      hint: 'C is the 3rd letter, A is the 1st, B is the 2nd!',
      explanation: 'C=3, A=1, B=2. So CAB = 3-1-2!'
    },
    {
      question: 'If 5 pencils cost ₹20, how much do 8 pencils cost?',
      options: ['₹28', '₹32', '₹40', '₹24'],
      answer: 1,
      hint: 'First find the cost of 1 pencil!',
      explanation: '1 pencil = ₹20 ÷ 5 = ₹4. So 8 pencils = 8 × ₹4 = ₹32!'
    }
  ];

  const questions = [
    { q: 'What is the next number: 3, 6, 12, 24, ___?', options: ['30', '36', '48', '42'], answer: 2, explanation: 'The rule is × 2 each time. 24 × 2 = 48.' },
    { q: 'If all roses are flowers and some flowers fade, then...', options: ['All roses fade', 'No roses fade', 'Some roses might fade', 'Roses are not flowers'], answer: 2, explanation: 'Since only SOME flowers fade, some roses MIGHT fade — but not necessarily all.' },
    { q: 'In Morse Code, A = •−. What type of system is this?', options: ['Number system', 'Coding system', 'Fraction system', 'Geometry'], answer: 1, explanation: 'Morse Code is a CODING system that represents letters as patterns of dots and dashes.' },
    { q: 'What comes next: 🔴🔵🟡🔴🔵🟡🔴🔵___?', options: ['🔴', '🔵', '🟡', '🟢'], answer: 2, explanation: 'The pattern repeats every 3: Red-Blue-Yellow. After Blue comes Yellow!' },
    { q: 'A flowchart is used to...', options: ['Draw shapes', 'Show steps of a process', 'Calculate area', 'Measure distance'], answer: 1, explanation: 'Flowcharts visually show the steps of a process using boxes and arrows.' },
  ];

  const handleAnswer = (ai) => {
    setSelectedAnswer(ai);
    const p = puzzles[puzzleStep];
    if (ai === p.answer) {
      setTeacherMsg('Brilliant! ' + p.explanation + ' Ready for the next puzzle?');
    } else {
      setTeacherMsg('Not quite! Hint: ' + p.hint);
    }
  };

  const nextPuzzle = () => {
    if (puzzleStep < puzzles.length - 1) {
      setPuzzleStep(s => s + 1);
      setSelectedAnswer(null);
    } else {
      setPuzzleStep(0);
      setSelectedAnswer(null);
      setTeacherMsg('Amazing! You completed all puzzles! You are a true Information Processing expert!');
    }
  };

  const puzzle = puzzles[puzzleStep];

  return (
    <div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🧠</span> Introduction to Information Processing</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>Information Processing is about understanding how we collect, organise, and use information to solve problems and make decisions. It includes recognising patterns, following logical steps, coding, and interpreting data in everyday situations.</p>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {['Patterns and Sequences', 'Logical Reasoning', 'Coding and Decoding', 'Flowcharts', 'Venn Diagrams', 'Problem Solving'].map(t => (
            <div key={t} style={{ background: '#FF9F1C22', border: '2px solid #FF9F1C', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: '700' }}>{t}</div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Key Concepts</h2>
        <div className="formula-card" style={{ borderColor: '#FF9F1C' }}>
          <div className="formula-text" style={{ color: '#FF9F1C', fontSize: '22px' }}>Pattern Rule: Find what changes between each step → apply that rule to find the next term.</div>
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#FF9F1C', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>🔍 Step-by-Step: Find the pattern in 5, 10, 20, 40</h3>
          {['Look at pairs: 5→10 (×2), 10→20 (×2), 20→40 (×2)', 'The rule is: multiply by 2 each time', '✅ Next number = 40 × 2 = 80'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ background: '#FF9F1C', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ icon: '💻', title: 'Computer Programs', desc: 'Programs follow logical step-by-step instructions — just like flowcharts we study here.' },
            { icon: '🔐', title: 'Cryptography', desc: 'Encoding and decoding secret messages uses the same logic as coding/decoding in maths.' },
            { icon: '🧩', title: 'Puzzle Solving', desc: 'Sudoku, crosswords, and logic puzzles all require information processing skills.' },
            { icon: '📋', title: 'Planning', desc: 'Making a timetable or daily schedule uses sequential thinking and flowchart logic.' }].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div><h4 style={{ margin: '0 0 4px', color: '#FF9F1C' }}>{item.title}</h4><p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section" style={{ border: '4px solid #FF9F1C', background: '#fffbf0' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Activity: Pattern & Logic Puzzle Challenge!</h2>
        <div style={{ background: 'white', border: '2px solid #FF9F1C', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '18px', color: '#FF9F1C' }}>Puzzle {puzzleStep + 1} of {puzzles.length}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {puzzles.map((_, i) => <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: i === puzzleStep ? '#FF9F1C' : '#e0e0e0' }} />)}
            </div>
          </div>
          <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '20px', color: '#2F3E46' }}>{puzzle.question}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            {puzzle.options.map((opt, ai) => {
              let bg = '#f8f9fa', border = '2px solid #ddd', clr = '#2F3E46';
              if (selectedAnswer !== null) {
                if (ai === puzzle.answer) { bg = '#4ECDC4'; border = '2px solid #4ECDC4'; clr = 'white'; }
                else if (selectedAnswer === ai) { bg = '#FF6B6B'; border = '2px solid #FF6B6B'; clr = 'white'; }
              } else if (selectedAnswer === ai) { bg = '#FFE66D'; }
              return (
                <button key={ai} onClick={() => handleAnswer(ai)} disabled={selectedAnswer !== null}
                  style={{ padding: '12px 24px', borderRadius: '12px', border, background: bg, color: clr, fontWeight: '700', cursor: selectedAnswer !== null ? 'default' : 'pointer', fontSize: '16px', transition: 'all 0.2s' }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {selectedAnswer !== null && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <div style={{ padding: '14px', background: selectedAnswer === puzzle.answer ? '#4ECDC422' : '#FF6B6B22', borderRadius: '12px', marginBottom: '12px', fontSize: '15px' }}>
                {selectedAnswer === puzzle.answer ? '✅ Correct! ' : '❌ Not quite! '}{puzzle.explanation}
              </div>
              <button className="btn btn-primary" onClick={nextPuzzle}>
                {puzzleStep < puzzles.length - 1 ? 'Next Puzzle →' : 'Restart Puzzles 🔄'}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="lesson-section"><h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2><SQ questions={questions} color="#FF9F1C" /></div>
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #FF9F1C22, #FFE66D22)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>💻</div>
          <div>
            <h3 style={{ color: '#FF9F1C', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>Software Engineer / Programmer</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: 0 }}>Software engineers write programs by breaking problems into logical steps — exactly what information processing teaches! Recognising patterns, creating algorithms, and solving problems step-by-step is the heart of all computer programming.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
