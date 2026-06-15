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

export default function Lesson10_InfoAdvanced({ setTeacherMsg }) {
  const [sorted, setSorted] = useState([]);
  const [bubbleArr, setBubbleArr] = useState([5, 3, 8, 1, 9, 2, 7, 4]);
  const [step, setStep] = useState(0);
  const [highlight, setHighlight] = useState([]);
  const [sortDone, setSortDone] = useState(false);

  const bubbleStep = () => {
    let arr = [...bubbleArr];
    let swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        setHighlight([i, i + 1]);
        let temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp;
        swapped = true;
        setBubbleArr(arr);
        setStep(s => s + 1);
        setTeacherMsg('Swap! ' + arr[i + 1] + ' and ' + arr[i] + ' were in wrong order. Fixed! Step: ' + (step + 1));
        setTimeout(() => setHighlight([]), 600);
        if (!swapped) setSortDone(true);
        return;
      }
    }
    if (!swapped) { setSortDone(true); setTeacherMsg('Array is fully sorted! Bubble sort complete in ' + step + ' swaps!'); }
    else { setTeacherMsg('Pass complete! Checking again...'); }
  };

  const resetBubble = () => { setBubbleArr([5, 3, 8, 1, 9, 2, 7, 4]); setStep(0); setHighlight([]); setSortDone(false); setTeacherMsg('Array reset! Ready to sort again.'); };

  const questions = [
    { q: 'In a Venn Diagram, the overlapping part shows...', options: ['Only A', 'Only B', 'Both A and B', 'Neither A nor B'], answer: 2, explanation: 'The overlapping (intersection) region shows elements that belong to BOTH sets.' },
    { q: 'What does an algorithm do?', options: ['Measures shapes', 'Gives step-by-step instructions', 'Calculates area', 'Draws charts'], answer: 1, explanation: 'An algorithm is a set of clear, step-by-step instructions to solve a problem.' },
    { q: 'Bubble Sort arranges numbers in...', options: ['Random order', 'Ascending/Descending order', 'Alphabetical order', 'No order'], answer: 1, explanation: 'Bubble Sort repeatedly swaps adjacent elements to arrange them in order.' },
    { q: 'In a decision tree, a diamond shape means...', options: ['Start', 'End', 'A decision (Yes/No)', 'A process step'], answer: 2, explanation: 'In flowcharts, diamond shapes represent DECISIONS (Yes or No questions).' },
    { q: 'Set A = {1,2,3}, Set B = {2,3,4}. What is A∩B?', options: ['{1,2,3,4}', '{2,3}', '{1,4}', '{1,2,3,2,3,4}'], answer: 1, explanation: 'A∩B (intersection) = elements in BOTH sets = {2, 3}.' },
  ];

  return (
    <div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>🧩</span> Introduction to Information Processing (Advanced)</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8' }}>In this advanced unit we go deeper into how computers and humans process complex information. We explore sorting algorithms, Venn Diagrams, decision trees, and set theory — the building blocks of modern computer science!</p>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📚</span> Topics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {['Sets and Subsets', 'Venn Diagrams', 'Union and Intersection', 'Decision Trees', 'Sorting Algorithms', 'Binary Representation'].map(t => (
            <div key={t} style={{ background: '#00BBF922', border: '2px solid #00BBF9', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: '700' }}>{t}</div>
          ))}
        </div>
      </div>
      <div className="lesson-section">
        <h2 className="lesson-section-title"><span>📝</span> Key Concepts</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {['Union (A ∪ B) = All elements in A or B', 'Intersection (A ∩ B) = Elements in both A and B', "Complement (A') = Elements NOT in A", 'Subset: A ⊆ B means every element of A is in B'].map(f => (
            <div key={f} className="formula-card" style={{ borderColor: '#00BBF9', padding: '14px' }}>
              <div style={{ fontSize: '14px', color: '#00BBF9', fontWeight: 700 }}>{f}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: '24px', marginTop: '20px' }}>
          <h3 style={{ color: '#00BBF9', fontFamily: 'Fredoka, sans-serif', fontSize: '22px', marginBottom: '16px' }}>🔍 Venn Diagram Example</h3>
          <p style={{ marginBottom: '12px' }}>Set A = Students who play Cricket = {'{Aarav, Rahul, Priya}'}</p>
          <p style={{ marginBottom: '12px' }}>Set B = Students who play Football = {'{Rahul, Sneha, Priya}'}</p>
          {['A ∪ B (Union) = {Aarav, Rahul, Priya, Sneha} (all 4 students)', 'A ∩ B (Intersection) = {Rahul, Priya} (play both sports)'].map((t, i) => (
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
          {[{ icon: '🖥️', title: 'Computer Sorting', desc: 'Databases sort millions of records using algorithms like Bubble Sort and Quick Sort.' },
            { icon: '🏥', title: 'Medical Diagnosis', desc: 'Doctors use decision trees (if-then logic) to diagnose diseases based on symptoms.' },
            { icon: '🔍', title: 'Search Engines', desc: 'Google uses set intersection to find pages that match ALL your search words.' },
            { icon: '📱', title: 'App Development', desc: 'Every app has algorithms — sorting posts, filtering products, suggesting friends.' }].map(item => (
            <div key={item.title} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
              <div style={{ fontSize: '40px' }}>{item.icon}</div>
              <div><h4 style={{ margin: '0 0 4px', color: '#00BBF9' }}>{item.title}</h4><p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lesson-section" style={{ border: '4px solid #00BBF9', background: '#f0fcff' }}>
        <h2 className="lesson-section-title"><span>🎮</span> Activity: Bubble Sort Visualiser!</h2>
        <p style={{ marginBottom: '16px' }}>Watch how computers sort numbers! Click "Next Swap" to perform each step of the Bubble Sort algorithm.</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          {bubbleArr.map((num, i) => (
            <div key={i} style={{
              width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Fredoka, sans-serif', fontSize: '22px', fontWeight: 'bold',
              background: highlight.includes(i) ? '#FF6B6B' : sortDone ? '#4ECDC4' : '#00BBF9',
              color: 'white', transition: 'background 0.3s', boxShadow: highlight.includes(i) ? '0 0 16px #FF6B6B' : 'none'
            }}>{num}</div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '18px', color: '#00BBF9' }}>Swaps performed: {step}</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {!sortDone
            ? <button className="btn btn-secondary" onClick={bubbleStep}>Next Swap ▶</button>
            : <div style={{ background: '#4ECDC4', color: 'white', padding: '12px 24px', borderRadius: '12px', fontFamily: 'Fredoka, sans-serif', fontSize: '18px' }}>✅ Sorted in {step} swaps!</div>}
          <button className="btn" onClick={resetBubble} style={{ background: '#e9ecef', color: '#333' }}>Reset 🔄</button>
        </div>
        <div style={{ marginTop: '20px', background: '#f8f9fa', borderRadius: '12px', padding: '16px' }}>
          <h4 style={{ fontFamily: 'Fredoka, sans-serif', color: '#00BBF9', marginBottom: '8px' }}>🌐 Venn Diagram Visualiser</h4>
          <div style={{ position: 'relative', height: '160px' }}>
            <div style={{ position: 'absolute', left: '80px', top: '20px', width: '160px', height: '120px', borderRadius: '50%', background: 'rgba(255,107,107,0.35)', border: '3px solid #FF6B6B', display: 'flex', alignItems: 'center', paddingLeft: '16px', fontWeight: 'bold', color: '#c0392b' }}>A: {'{1, 2, 3}'}</div>
            <div style={{ position: 'absolute', left: '180px', top: '20px', width: '160px', height: '120px', borderRadius: '50%', background: 'rgba(78,205,196,0.35)', border: '3px solid #4ECDC4', display: 'flex', alignItems: 'center', paddingLeft: '60px', fontWeight: 'bold', color: '#1A535C' }}>B: {'{3, 4, 5}'}</div>
            <div style={{ position: 'absolute', left: '208px', top: '50px', fontFamily: 'Fredoka, sans-serif', fontSize: '18px', color: '#9B5DE5', fontWeight: 'bold' }}>3</div>
            <div style={{ position: 'absolute', bottom: '8px', right: '60px', fontSize: '13px', color: '#555' }}>Intersection: {'{3}'}</div>
          </div>
        </div>
      </div>
      <div className="lesson-section"><h2 className="lesson-section-title"><span>🧠</span> Quick Quiz</h2><SQ questions={questions} color="#00BBF9" /></div>
      <div className="lesson-section" style={{ background: 'linear-gradient(135deg, #00BBF922, #9B5DE522)' }}>
        <h2 className="lesson-section-title"><span>💼</span> Career Connection</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ fontSize: '80px' }}>🤖</div>
          <div>
            <h3 style={{ color: '#00BBF9', fontFamily: 'Fredoka, sans-serif', fontSize: '28px', margin: '0 0 8px' }}>Artificial Intelligence Engineer</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', margin: 0 }}>AI Engineers build intelligent systems that learn patterns from data, make decisions using logic trees, and sort through massive datasets to find insights. Everything you learn in information processing is the foundation of AI!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
