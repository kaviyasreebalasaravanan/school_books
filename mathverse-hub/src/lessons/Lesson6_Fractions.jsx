import React, { useState } from 'react';

export default function Lesson6_Fractions({ setTeacherMsg }) {
  const [slices, setSlices] = useState(8);
  const [eaten, setEaten] = useState(0);

  const handleEat = () => {
    if (eaten < slices) {
      const newEaten = eaten + 1;
      setEaten(newEaten);
      setTeacherMsg('Yum! You ate a slice! Now you have eaten ' + newEaten + ' out of ' + slices + ' slices. That is the fraction ' + newEaten + '/' + slices + '!');
    } else {
      setTeacherMsg('The pizza is all gone! ' + slices + '/' + slices + ' equals 1 whole pizza!');
    }
  };

  const handleReset = () => {
    setEaten(0);
    setTeacherMsg('Fresh pizza is here! 0 out of ' + slices + ' slices eaten. Fraction = 0/' + slices);
  };

  return (
    <div>
      {/* Introduction */}
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🍕</span> Introduction to Fractions</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
          A fraction represents a part of a whole! Imagine a pizza cut into 8 equal slices.
          If you eat 3 slices, you have eaten <strong>3/8</strong> of the pizza.
          The top number (numerator) tells how many parts you have. The bottom number (denominator) shows the total equal parts.
        </p>
      </div>

      {/* Topics */}
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics in This Lesson</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {['Proper Fractions', 'Improper Fractions', 'Mixed Numbers', 'Equivalent Fractions', 'Comparing Fractions', 'Adding Fractions'].map(topic => (
            <div key={topic} style={{
              background: '#2EC4B611', border: '2px solid #2EC4B6',
              borderRadius: '12px', padding: '12px', textAlign: 'center', fontWeight: '700', color: '#2F3E46'
            }}>
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Formulas */}
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Formulas and Rules</h2>
        <div className="formula-card" style={{ borderColor: '#2EC4B6' }}>
          <div className="formula-text" style={{ fontSize: '24px' }}>
            Fraction = Numerator / Denominator
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '16px' }}>
          {[
            { label: 'Proper Fraction', example: '3/8 (Numerator < Denominator)', color: '#4ECDC4' },
            { label: 'Improper Fraction', example: '9/8 (Numerator > Denominator)', color: '#FF6B6B' },
            { label: 'Equivalent', example: '1/2 = 2/4 = 4/8', color: '#FFE66D' },
          ].map(item => (
            <div key={item.label} style={{ background: item.color + '22', border: '2px solid ' + item.color, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', color: '#2F3E46', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ fontSize: '14px', color: '#555' }}>{item.example}</div>
            </div>
          ))}
        </div>

        {/* Step by Step */}
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#2EC4B6', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>
            🔍 Step-by-Step: Finding Equivalent Fractions for 1/2
          </h3>
          {[
            { step: 1, text: 'Start with the fraction 1/2' },
            { step: 2, text: 'Multiply numerator by 2: 1 × 2 = 2' },
            { step: 3, text: 'Multiply denominator by 2: 2 × 2 = 4' },
            { step: 4, text: 'New fraction: 2/4. Since we multiplied both by same number, they are equal!' },
          ].map(({ step, text }) => (
            <div key={step} style={{ display: 'flex', gap: '16px', marginBottom: '12px', alignItems: 'flex-start' }}>
              <div style={{
                background: '#2EC4B6', color: 'white', borderRadius: '50%',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', flexShrink: 0
              }}>{step}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{text}</p>
            </div>
          ))}
          <div style={{ background: '#2EC4B6', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', marginTop: '8px' }}>
            <strong style={{ fontSize: '20px' }}>✅ 1/2 = 2/4 = 4/8 = 8/16 — All Equivalent!</strong>
          </div>
        </div>
      </div>

      {/* Real Life */}
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { icon: '🍕', title: 'Pizza Sharing', desc: 'Cut a pizza into 8 slices and share them between friends using fractions!' },
            { icon: '🎂', title: 'Cake Cutting', desc: 'Birthday cake portions like 1/4, 1/6 or 1/8 are fractions in action!' },
            { icon: '🧁', title: 'Baking Recipes', desc: 'Recipes use fractions: "Add 1/2 cup flour and 3/4 cup sugar."' },
            { icon: '🏏', title: 'Cricket Stats', desc: 'A batting average is a fraction: runs scored divided by innings played!' },
          ].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div>
                <h4 style={{ margin: '0 0 4px', color: '#2EC4B6' }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Activity */}
      <div className="lesson-section" style={{ border: '4px solid #FFE66D', background: '#FFFDF0' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Interactive Activity: Pizza Sharing Simulator!</h2>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          You have a fresh pizza cut into {slices} equal slices. Click to eat slices and watch the fraction change!
        </p>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          {/* Pizza display */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6px', margin: '20px 0', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            {Array.from({ length: slices }).map((_, i) => (
              <span key={i} style={{
                fontSize: '52px',
                opacity: i < eaten ? 0.15 : 1,
                filter: i < eaten ? 'grayscale(100%)' : 'none',
                transition: 'all 0.3s'
              }}>🍕</span>
            ))}
          </div>

          {/* Fraction display */}
          <div style={{
            display: 'inline-block',
            background: '#2EC4B6',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '20px',
            margin: '16px 0'
          }}>
            <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Fraction Eaten</div>
            <div style={{ fontSize: '48px', fontFamily: 'Fredoka, sans-serif', lineHeight: 1 }}>
              {eaten}/{slices}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>
              {eaten === 0 ? 'None eaten yet!' : eaten === slices ? 'All done! = 1 whole' : 'Keep going!'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={handleEat} disabled={eaten >= slices}
              style={{ opacity: eaten >= slices ? 0.5 : 1, fontSize: '18px' }}>
              Eat a Slice! 😋
            </button>
            <button className="btn btn-secondary" onClick={handleReset} style={{ fontSize: '18px' }}>
              Bake Fresh Pizza! 👨‍🍳
            </button>
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2>
        <FractionQuiz />
      </div>

      {/* Career */}
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #2EC4B622, #FFE66D22)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Real-World Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>👨‍🍳</div>
          <div>
            <h3 style={{ color: '#2EC4B6', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>
              Executive Chef
            </h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: '0 0 12px' }}>
              Chefs use fractions every single day to scale recipes! If a cake recipe serves 8 but you need to
              make it for 24 people, you multiply every ingredient fraction by 3. A chef who does not understand
              fractions will ruin every dish!
            </p>
            <div style={{ background: '#2EC4B6', color: 'white', display: 'inline-block', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold' }}>
              Average Salary: ₹4-15 LPA 🍽️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FractionQuiz() {
  const questions = [
    { q: 'In the fraction 3/8, what is the denominator?', options: ['3', '8', '11', '5'], answer: 1, explanation: 'The denominator is the BOTTOM number. It tells us the total number of equal parts.' },
    { q: 'Which fraction is a Proper Fraction?', options: ['7/4', '9/3', '3/8', '5/2'], answer: 2, explanation: '3/8 is proper because the numerator (3) is LESS than the denominator (8).' },
    { q: 'What is the equivalent fraction of 1/2?', options: ['1/4', '2/3', '2/4', '3/8'], answer: 2, explanation: '2/4 = 1/2 because we multiplied both numerator and denominator by 2.' },
    { q: 'If a pizza has 8 slices and you eat 4, what fraction did you eat?', options: ['1/8', '4/8', '8/4', '1/4'], answer: 1, explanation: 'You ate 4 out of 8 slices, which is 4/8 (also equal to 1/2!)' },
    { q: 'Which fraction is the LARGEST?', options: ['1/4', '1/2', '1/8', '1/3'], answer: 1, explanation: '1/2 is the largest! When the numerator is the same (1), the SMALLER the denominator, the LARGER the fraction.' },
  ];
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswer = (qi, ai) => { if (score !== null) return; setAnswers(prev => ({ ...prev, [qi]: ai })); };
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
          <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>Q{qi + 1}. {q.q}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {q.options.map((opt, ai) => {
              let bg = '#e9ecef', color = '#2F3E46';
              if (score !== null) {
                if (ai === q.answer) { bg = '#4ECDC4'; color = 'white'; }
                else if (answers[qi] === ai && ai !== q.answer) { bg = '#FF6B6B'; color = 'white'; }
              } else if (answers[qi] === ai) { bg = '#FFE66D'; }
              return (
                <button key={ai} onClick={() => handleAnswer(qi, ai)}
                  style={{ padding: '8px 20px', borderRadius: '20px', border: '2px solid #ddd', background: bg, color, fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {score !== null && <p style={{ marginTop: '8px', fontSize: '13px', color: '#555', fontStyle: 'italic' }}>💡 {q.explanation}</p>}
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
          <div style={{ background: score >= 3 ? '#4ECDC4' : '#FF6B6B', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '48px' }}>{score >= 4 ? '🏆' : score >= 3 ? '⭐' : '💪'}</div>
            <div style={{ fontSize: '28px', fontFamily: 'Fredoka, sans-serif' }}>Score: {score} / {questions.length}</div>
            <div style={{ fontSize: '16px', marginTop: '8px' }}>
              {score === questions.length ? 'Perfect! You are a Fraction Master!' : score >= 3 ? 'Well done! Keep going!' : 'Review the lesson and try again!'}
            </div>
          </div>
          <button className="btn btn-secondary" onClick={handleReset}>Try Again 🔄</button>
        </div>
      )}
    </div>
  );
}
