import React, { useState } from 'react';

export default function Lesson1_Numbers({ setTeacherMsg }) {
  const [primeResult, setPrimeResult] = useState(null);
  const [checkedNum, setCheckedNum] = useState(null);

  const handleDetect = (num) => {
    let isPrime = num > 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) { isPrime = false; break; }
    }
    setPrimeResult(isPrime);
    setCheckedNum(num);
    if (isPrime) {
      setTeacherMsg('Yes! ' + num + ' is a Prime Number! It can only be divided by 1 and itself. Well done, Detective!');
    } else {
      setTeacherMsg('Aha! ' + num + ' is a Composite Number! It has more than two factors.');
    }
  };

  const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  const testNumbers = [7, 12, 19, 21, 37, 49];

  return (
    <div>
      {/* Introduction */}
      <div className="lesson-section">
        <h2 className="lesson-section-title">
          <span>🔢</span> Introduction to Numbers
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
          Welcome, Number Explorer! In Grade 6, we discover that numbers have special personalities.
          Some numbers are like secret agents — they only have TWO factors (Prime Numbers!).
          Others are more social and have MANY factors (Composite Numbers!).
        </p>
      </div>

      {/* Topics */}
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics in This Lesson</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {['Prime Numbers', 'Composite Numbers', 'Factors and Multiples', 'HCF (GCD)', 'LCM'].map(topic => (
            <div key={topic} style={{
              background: '#FF6B6B11', border: '2px solid #FF6B6B',
              borderRadius: '12px', padding: '12px', textAlign: 'center', fontWeight: '700'
            }}>
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Formula and Rule</h2>
        <div className="formula-card">
          <div className="formula-text">Prime Number Rule</div>
          <p style={{ fontSize: '20px', marginTop: '10px', color: '#2F3E46' }}>
            A Prime Number has <strong>EXACTLY 2 factors</strong>: <span style={{ color: '#FF6B6B' }}>1</span> and <span style={{ color: '#4ECDC4' }}>itself</span>.
          </p>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Example: Factors of 7 = {'{1, 7}'} → Only 2 factors → 7 is PRIME!
          </p>
        </div>

        {/* Step by Step */}
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#4ECDC4', marginBottom: '16px', fontFamily: 'Fredoka, sans-serif', fontSize: '22px' }}>
            🔍 Step-by-Step: Is 13 a Prime Number?
          </h3>
          {[
            { step: 1, text: 'Try dividing 13 by 2. → 13 ÷ 2 = 6.5 (Not a whole number! ✗)' },
            { step: 2, text: 'Try dividing 13 by 3. → 13 ÷ 3 = 4.33 (Not a whole number! ✗)' },
            { step: 3, text: 'We only need to try up to √13 ≈ 3.6. So we stop here!' },
            { step: 4, text: 'No divisors found between 2 and 3.6.' },
          ].map(({ step, text }) => (
            <div key={step} style={{ display: 'flex', gap: '16px', marginBottom: '12px', alignItems: 'flex-start' }}>
              <div style={{
                background: '#FF6B6B', color: 'white', borderRadius: '50%',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 'bold', flexShrink: 0
              }}>{step}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{text}</p>
            </div>
          ))}
          <div style={{ background: '#4ECDC4', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', marginTop: '8px' }}>
            <strong style={{ fontSize: '20px' }}>✅ Final Answer: 13 is a PRIME NUMBER!</strong>
          </div>
        </div>
      </div>

      {/* Real Life */}
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { icon: '🔐', title: 'Internet Security', desc: 'Your online passwords and bank accounts are protected by huge Prime Numbers! Websites use them to encrypt data.' },
            { icon: '💳', title: 'Credit Cards', desc: 'The PIN and security codes on credit cards use Prime Number mathematics to keep them safe.' },
            { icon: '📡', title: 'Satellite Signals', desc: 'Prime-based codes help satellites send clear signals without interference from each other.' },
            { icon: '🎮', title: 'Video Games', desc: 'Game developers use Prime Numbers to generate random levels and unpredictable enemy patterns!' },
          ].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div>
                <h4 style={{ margin: '0 0 4px', color: '#FF6B6B' }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Activity */}
      <div className="lesson-section" style={{ border: '4px solid #FFE66D', background: '#FFFDF0' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Interactive Activity: Prime Number Detective!</h2>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          Click on any number below to investigate it! Can you figure out which ones are Prime?
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          {testNumbers.map(num => (
            <button
              key={num}
              className="btn"
              onClick={() => handleDetect(num)}
              style={{
                background: checkedNum === num ? (primeResult ? '#4ECDC4' : '#FF6B6B') : '#FF6B6B',
                color: 'white',
                fontSize: '22px',
                padding: '14px 22px',
                minWidth: '80px'
              }}
            >
              {num}
            </button>
          ))}
        </div>

        {primeResult !== null && checkedNum !== null && (
          <div style={{
            padding: '24px',
            background: primeResult ? '#4ECDC4' : '#FF6B6B',
            color: 'white',
            borderRadius: '16px',
            textAlign: 'center',
            animation: 'pulse 0.5s ease'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>{primeResult ? '🕵️‍♂️✅' : '🧩❌'}</div>
            <div style={{ fontSize: '28px', fontFamily: 'Fredoka, sans-serif', fontWeight: 700 }}>
              {checkedNum} is a {primeResult ? 'PRIME' : 'COMPOSITE'} Number!
            </div>
            <div style={{ fontSize: '16px', marginTop: '8px', opacity: 0.9 }}>
              {primeResult
                ? 'Factors: 1 and ' + checkedNum + ' only. That is exactly 2 factors!'
                : checkedNum + ' has more than 2 factors. It is not prime!'}
            </div>
          </div>
        )}

        <div style={{ marginTop: '24px' }}>
          <h4 style={{ color: '#FF6B6B', marginBottom: '12px' }}>📋 Known Prime Numbers (1 to 40):</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {primeNumbers.filter(p => p <= 40).map(p => (
              <span key={p} style={{
                background: '#4ECDC4', color: 'white',
                padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '16px'
              }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2>
        <QuizBlock questions={[
          { q: 'How many factors does a Prime Number have?', options: ['1', '2', '3', 'Many'], answer: 1, explanation: 'A Prime Number has exactly 2 factors: 1 and itself!' },
          { q: 'Which of these is a Prime Number?', options: ['4', '6', '7', '9'], answer: 2, explanation: '7 is Prime because its only factors are 1 and 7!' },
          { q: 'Is 1 a Prime Number?', options: ['Yes', 'No', 'Sometimes', 'Maybe'], answer: 1, explanation: '1 is NOT prime because it only has ONE factor (itself). Prime numbers need exactly 2 factors!' },
          { q: 'What is the smallest Prime Number?', options: ['1', '2', '3', '5'], answer: 1, explanation: '2 is the smallest and the only EVEN Prime Number!' },
          { q: 'How many Prime Numbers are between 1 and 10?', options: ['2', '3', '4', '5'], answer: 2, explanation: 'The primes are 2, 3, 5, and 7 — that is 4 prime numbers!' },
        ]} />
      </div>

      {/* Career */}
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #FF6B6B22, #4ECDC422)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Real-World Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>🧑‍💻</div>
          <div>
            <h3 style={{ color: '#FF6B6B', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>
              Cyber Security Expert
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: 0 }}>
              Cyber Security Experts use massive Prime Numbers (sometimes 300+ digits long!) to create
              encryption systems that protect billions of people online. When you see the 🔒 in your browser,
              that is Prime Number mathematics keeping you safe!
            </p>
            <div style={{ marginTop: '12px', background: '#FF6B6B', color: 'white', display: 'inline-block', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold' }}>
              Average Salary: ₹8-25 LPA 🎯
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Reusable Quiz Component ---- */
function QuizBlock({ questions }) {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswer = (qi, ai) => {
    if (score !== null) return;
    setAnswers(prev => ({ ...prev, [qi]: ai }));
  };

  const handleSubmit = () => {
    let s = 0;
    questions.forEach((q, i) => { if (answers[i] === q.answer) s++; });
    setScore(s);
  };

  const handleReset = () => { setAnswers({}); setScore(null); };

  return (
    <div>
      {questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '12px' }}>
          <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>
            Q{qi + 1}. {q.q}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {q.options.map((opt, ai) => {
              let bg = '#e9ecef';
              let color = '#2F3E46';
              if (score !== null) {
                if (ai === q.answer) { bg = '#4ECDC4'; color = 'white'; }
                else if (answers[qi] === ai && ai !== q.answer) { bg = '#FF6B6B'; color = 'white'; }
              } else if (answers[qi] === ai) {
                bg = '#FFE66D';
              }
              return (
                <button key={ai} onClick={() => handleAnswer(qi, ai)}
                  style={{
                    padding: '8px 20px', borderRadius: '20px', border: '2px solid #ddd',
                    background: bg, color, fontWeight: '600', cursor: score !== null ? 'default' : 'pointer',
                    fontSize: '14px', transition: 'all 0.2s'
                  }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {score !== null && (
            <p style={{ marginTop: '8px', fontSize: '13px', color: '#555', fontStyle: 'italic' }}>
              💡 {q.explanation}
            </p>
          )}
        </div>
      ))}
      {score === null ? (
        <button className="btn btn-primary" onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          style={{ opacity: Object.keys(answers).length < questions.length ? 0.5 : 1 }}>
          Submit Answers ✅
        </button>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: score >= 3 ? '#4ECDC4' : '#FF6B6B', color: 'white',
            padding: '20px', borderRadius: '16px', marginBottom: '16px'
          }}>
            <div style={{ fontSize: '48px' }}>{score >= 4 ? '🏆' : score >= 3 ? '⭐' : '💪'}</div>
            <div style={{ fontSize: '28px', fontFamily: 'Fredoka, sans-serif' }}>
              Score: {score} / {questions.length}
            </div>
            <div style={{ fontSize: '16px', marginTop: '8px' }}>
              {score === questions.length ? 'Perfect Score! You are a Math Champion!' :
               score >= 3 ? 'Great job! Keep practising!' : 'Good effort! Review the lesson and try again!'}
            </div>
          </div>
          <button className="btn btn-secondary" onClick={handleReset}>Try Again 🔄</button>
        </div>
      )}
    </div>
  );
}
