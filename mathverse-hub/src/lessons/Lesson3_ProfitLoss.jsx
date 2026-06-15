import React, { useState } from 'react';

export default function Lesson3_ProfitLoss({ setTeacherMsg }) {
  const [cp, setCp] = useState(100);
  const [sp, setSp] = useState(130);

  const profit = sp > cp ? sp - cp : 0;
  const loss = cp > sp ? cp - sp : 0;
  const profitPct = cp > 0 ? ((profit / cp) * 100).toFixed(2) : 0;
  const lossPct = cp > 0 ? ((loss / cp) * 100).toFixed(2) : 0;
  const isProfit = sp >= cp;

  const questions = [
    { q: 'CP = ₹200, SP = ₹250. What is the Profit?', options: ['₹50', '₹200', '₹250', '₹450'], answer: 0, explanation: 'Profit = SP - CP = 250 - 200 = ₹50' },
    { q: 'CP = ₹500, SP = ₹400. What is the Loss?', options: ['₹900', '₹100', '₹400', '₹500'], answer: 1, explanation: 'Loss = CP - SP = 500 - 400 = ₹100' },
    { q: 'A toy bought for ₹100 is sold for ₹120. Profit%?', options: ['20%', '10%', '120%', '80%'], answer: 0, explanation: 'Profit = 20, Profit% = (20/100) × 100 = 20%' },
    { q: 'If SP = CP, then it is called?', options: ['Profit', 'Loss', 'No Profit No Loss', 'Discount'], answer: 2, explanation: 'When SP equals CP, there is no profit and no loss — it is a break-even!' },
    { q: 'CP = ₹400, Loss = 25%. What is SP?', options: ['₹300', '₹500', '₹425', '₹375'], answer: 0, explanation: 'Loss = 25% of 400 = ₹100. SP = CP - Loss = 400 - 100 = ₹300' },
  ];

  const [cart, setCart] = useState([]);
  const items = [
    { name: 'Apple', icon: '🍎', cp: 10, sp: 15 },
    { name: 'Notebook', icon: '📓', cp: 50, sp: 70 },
    { name: 'Pencil', icon: '✏️', cp: 5, sp: 4 },
    { name: 'Chocolate', icon: '🍫', cp: 20, sp: 25 },
    { name: 'Water Bottle', icon: '💧', cp: 80, sp: 60 },
  ];

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
    const p = item.sp - item.cp;
    if (p > 0) setTeacherMsg('You sold ' + item.name + ' for ₹' + item.sp + '! Profit = ₹' + p + ' Great business!');
    else setTeacherMsg('Selling ' + item.name + ' at ₹' + item.sp + ' causes a loss of ₹' + Math.abs(p) + '. Careful!');
  };

  const totalProfit = cart.reduce((sum, item) => sum + (item.sp - item.cp), 0);

  return (
    <div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🏪</span> Introduction to Bill, Profit and Loss</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>Every shop owner needs to understand profit and loss. When you buy something (Cost Price) and sell it at a higher price (Selling Price), you make a Profit. If you sell at a lower price, you make a Loss!</p>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {['Cost Price (CP)', 'Selling Price (SP)', 'Profit', 'Loss', 'Profit %', 'Loss %', 'Discount', 'Bill Making'].map(t => (
            <div key={t} style={{ background: '#FFE66D44', border: '2px solid #FFD700', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: '700' }}>{t}</div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Formulas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { f: 'Profit = SP − CP', c: '#4ECDC4' },
            { f: 'Loss = CP − SP', c: '#FF6B6B' },
            { f: 'Profit % = (Profit ÷ CP) × 100', c: '#4ECDC4' },
            { f: 'Loss % = (Loss ÷ CP) × 100', c: '#FF6B6B' },
          ].map(({ f, c }) => (
            <div key={f} className="formula-card" style={{ borderColor: c, padding: '16px' }}>
              <div className="formula-text" style={{ fontSize: '18px', color: c }}>{f}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#FFD700', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>🔍 Step-by-Step: CP = ₹200, SP = ₹260</h3>
          {['Profit = SP - CP = 260 - 200 = ₹60', 'Profit % = (Profit ÷ CP) × 100', 'Profit % = (60 ÷ 200) × 100 = 30%'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div style={{ background: '#FFD700', color: '#333', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: '16px', paddingTop: '4px' }}>{t}</p>
            </div>
          ))}
          <div style={{ background: '#FFD700', color: '#333', padding: '16px', borderRadius: '12px', textAlign: 'center', marginTop: '8px' }}><strong style={{ fontSize: '20px' }}>✅ Profit = ₹60 at 30% profit!</strong></div>
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🌍</span> Real-Life Applications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[{ icon: '🛒', title: 'Shopping Discounts', desc: 'When shops offer 20% off, they calculate loss to attract customers.' },
            { icon: '🏠', title: 'Real Estate', desc: 'Buying and selling land or houses involves profit/loss calculations.' },
            { icon: '📱', title: 'Stock Market', desc: 'Investors buy shares at CP and sell at SP hoping to make profit.' },
            { icon: '🌾', title: 'Farming', desc: 'Farmers calculate profit/loss after selling crops at market.' }].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div><h4 style={{ margin: '0 0 4px', color: '#FFD700' }}>{item.title}</h4><p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section" style={{ border: '4px solid #FFE66D', background: '#FFFDF0' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Activity: Live Profit/Loss Calculator</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Cost Price (CP): ₹{cp}</label>
              <input type="range" min="50" max="500" value={cp} onChange={e => { setCp(+e.target.value); setTeacherMsg('Cost Price is ₹' + e.target.value + '. Now set the Selling Price!'); }} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Selling Price (SP): ₹{sp}</label>
              <input type="range" min="50" max="600" value={sp} onChange={e => { setSp(+e.target.value); }} style={{ width: '100%' }} />
            </div>
          </div>
          <div style={{ background: isProfit ? '#4ECDC4' : '#FF6B6B', color: 'white', borderRadius: '16px', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '40px' }}>{isProfit ? '📈' : '📉'}</div>
            <div style={{ fontSize: '24px', fontFamily: 'Fredoka, sans-serif', margin: '8px 0' }}>{isProfit ? 'PROFIT!' : 'LOSS!'}</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold' }}>₹{isProfit ? profit : loss}</div>
            <div style={{ fontSize: '18px', marginTop: '4px' }}>{isProfit ? profitPct : lossPct}%</div>
          </div>
        </div>
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontFamily: 'Fredoka, sans-serif', marginBottom: '12px' }}>🛒 Supermarket Game — Add items to your shop!</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {items.map(item => (
              <button key={item.name} className="btn" onClick={() => addToCart(item)}
                style={{ background: item.sp > item.cp ? '#4ECDC4' : '#FF6B6B', color: 'white', fontSize: '14px', padding: '10px 16px' }}>
                {item.icon} {item.name} (CP:₹{item.cp} SP:₹{item.sp})
              </button>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ background: totalProfit >= 0 ? '#4ECDC422' : '#FF6B6B22', borderRadius: '12px', padding: '16px', border: '2px solid ' + (totalProfit >= 0 ? '#4ECDC4' : '#FF6B6B') }}>
              <strong>Cart: </strong>{cart.map(i => i.icon).join(' ')}
              <div style={{ marginTop: '8px', fontSize: '18px', fontWeight: 'bold', color: totalProfit >= 0 ? '#4ECDC4' : '#FF6B6B' }}>
                Total {totalProfit >= 0 ? 'Profit' : 'Loss'}: ₹{Math.abs(totalProfit)}
              </div>
              <button className="btn btn-secondary" style={{ marginTop: '8px', fontSize: '14px' }} onClick={() => setCart([])}>Clear Cart 🗑️</button>
            </div>
          )}
        </div>
      </div>
      <div className="lesson-section"><h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2><SimpleQuiz questions={questions} color="#FFD700" /></div>
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #FFE66D22, #4ECDC422)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>🧑‍💼</div>
          <div>
            <h3 style={{ color: '#FFD700', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>Business Owner / Entrepreneur</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: '0 0 12px' }}>Every business owner uses profit and loss daily. From small chai stalls to massive corporations, understanding when you are making or losing money is the foundation of all business success!</p>

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
              if (score !== null) { if (ai === q.answer) { bg = color; clr = color === '#FFD700' ? '#333' : 'white'; } else if (answers[qi] === ai) { bg = '#FF6B6B'; clr = 'white'; } } else if (answers[qi] === ai) { bg = '#FFE66D'; }
              return <button key={ai} onClick={() => handleAnswer(qi, ai)} style={{ padding: '8px 18px', borderRadius: '20px', border: '2px solid #ddd', background: bg, color: clr, fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>{opt}</button>;
            })}
          </div>
          {score !== null && <p style={{ marginTop: '8px', fontSize: '13px', color: '#555', fontStyle: 'italic' }}>💡 {q.explanation}</p>}
        </div>
      ))}
      {score === null
        ? <button className="btn btn-primary" onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length} style={{ opacity: Object.keys(answers).length < questions.length ? 0.5 : 1 }}>Submit Answers ✅</button>
        : <div style={{ textAlign: 'center' }}>
            <div style={{ background: score >= 3 ? color : '#FF6B6B', color: color === '#FFD700' ? '#333' : 'white', padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '48px' }}>{score >= 4 ? '🏆' : score >= 3 ? '⭐' : '💪'}</div>
              <div style={{ fontSize: '28px', fontFamily: 'Fredoka, sans-serif' }}>Score: {score} / {questions.length}</div>
            </div>
            <button className="btn btn-secondary" onClick={handleReset}>Try Again 🔄</button>
          </div>}
    </div>
  );
}
