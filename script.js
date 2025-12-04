// script.js
// Shared JavaScript for the Web Browsers site
// Handles: hamburger menu on all pages + quiz logic on quiz.html

document.addEventListener('DOMContentLoaded', () => {
  // ===== Hamburger menu for all pages =====
  const btn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('main-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }

  // ===== Quiz logic (only runs on quiz.html) =====
  const quizForm = document.getElementById('quiz-form');
  const quizResults = document.getElementById('quiz-results');
  const resetBtn = document.getElementById('quiz-reset');
  const scoreOutput = document.getElementById('score-output');
  const passFailOutput = document.getElementById('passfail-output');

  if (quizForm && quizResults && scoreOutput && passFailOutput) {
    quizForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Clear old feedback
      quizResults.className = 'quiz-results';
      scoreOutput.textContent = '';
      passFailOutput.textContent = '';
      passFailOutput.className = '';
      document.querySelectorAll('.question-feedback').forEach(el => {
        el.textContent = '';
        el.className = 'question-feedback';
      });

      let score = 0;
      const totalPoints = 6; // Q1–4: 1 pt each, Q5: 2 pts

      function setFeedback(id, isCorrect, message) {
        const box = document.getElementById(id);
        if (!box) return;
        box.textContent = message;
        box.classList.add(isCorrect ? 'correct' : 'incorrect');
      }

      // Q1: free text
      const q1Input = quizForm.elements['q1'];
      const q1Value = (q1Input.value || '').trim().toLowerCase();
      if (q1Value) {
        if (q1Value.includes('render')) {
          score += 1;
          setFeedback('q1-feedback', true, 'Correct: it is called the rendering engine.');
        } else {
          setFeedback('q1-feedback', false, 'Incorrect. The correct answer is "rendering engine".');
        }
      } else {
        setFeedback('q1-feedback', false, 'Please enter an answer. The correct answer is "rendering engine".');
      }

      // Q2: correct = chrome
      const q2Value = quizForm.elements['q2'].value;
      if (q2Value === 'chrome') {
        score += 1;
        setFeedback('q2-feedback', true, 'Correct: Chrome uses the Blink engine.');
      } else {
        setFeedback('q2-feedback', false, 'Incorrect. Chrome is the browser that uses the Blink engine.');
      }

      // Q3: correct = https
      const q3Value = quizForm.elements['q3'].value;
      if (q3Value === 'https') {
        score += 1;
        setFeedback('q3-feedback', true, 'Correct: HTTPS is the secure, encrypted version of HTTP.');
      } else {
        setFeedback('q3-feedback', false, 'Incorrect. HTTPS is the secure protocol for web traffic.');
      }

      // Q4: correct = docobj
      const q4Value = quizForm.elements['q4'].value;
      if (q4Value === 'docobj') {
        score += 1;
        setFeedback('q4-feedback', true, 'Correct: DOM stands for Document Object Model.');
      } else {
        setFeedback('q4-feedback', false, 'Incorrect. DOM stands for Document Object Model.');
      }

      // Q5: multi-select, correct = private, sandbox, tracking
      const q5Checks = quizForm.querySelectorAll('input[name="q5"]:checked');
      const selected = Array.from(q5Checks).map(input => input.value);
      const correctSet = ['private', 'sandbox', 'tracking'];

      const allCorrect =
        correctSet.every(v => selected.includes(v)) &&
        selected.every(v => correctSet.includes(v));

      if (allCorrect) {
        score += 2;
        setFeedback(
          'q5-feedback',
          true,
          'Correct: private browsing, sandboxing, and blocking tracking cookies all improve privacy or security.'
        );
      } else {
        setFeedback(
          'q5-feedback',
          false,
          'Partially correct or incorrect. The correct choices are: Private/Incognito browsing, Sandboxing web content, and Blocking cross-site tracking cookies.'
        );
      }

      const passed = score >= 4;

      // Show results box
      quizResults.classList.add('visible');
      scoreOutput.innerHTML = `<strong>Score:</strong> ${score} / ${totalPoints}`;
      passFailOutput.textContent = passed ? 'Result: Pass' : 'Result: Try again';
      passFailOutput.className = passed ? 'overall-pass' : 'overall-fail';
    });

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        quizForm.reset();
        quizResults.className = 'quiz-results';
        scoreOutput.textContent = '';
        passFailOutput.textContent = '';
        passFailOutput.className = '';
        document.querySelectorAll('.question-feedback').forEach(el => {
          el.textContent = '';
          el.className = 'question-feedback';
        });
      });
    }
  }
});
